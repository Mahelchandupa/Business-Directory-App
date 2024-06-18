import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { query } from 'firebase/database';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from './../../configs/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {

  const navigation = useNavigation()

  const [image, setImage] = useState(null)
  const [categoryList, setCategoryList] = useState([])

  const { user } = useUser()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [website, setWebsite] = useState('')
  const [about, setAbout] = useState('')
  const [category, setCategory] = useState()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerTitleAlign: 'center',
      headerShown: true
    })
    getCategroyList()
  }, [])

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri)
  }

  const getCategroyList = async () => {
    setCategoryList([])
    const q = query(collection(db, 'Category'))
    const snapShot = await getDocs(q)

    snapShot.forEach(doc => {
      console.log(doc.data())
      setCategoryList(prev => [
        ...prev,
        {
          label: (doc.data()).name,
          value: (doc.data()).name
        }
      ])
    })
  }

  const onAddNewBusiness = async () => {
    setLoading(true)
    const fileName = Date.now().toString()+".jpg"
    const response = await fetch(image)
    const blob = await response.blob()

    const storageRef = ref(storage, `business-app/${fileName}`)

    uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("file uploaded successfully")
    }).then(res => {
      getDownloadURL(storageRef).then(async (url) => {
        saveBusinessDetails(url)
      })
    })
    setLoading(false)
  }

  const saveBusinessDetails = async (imgUrl) => {
    await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
        name: name,
        address: address,
        contact: contact,
        website: website,
        about: about,
        category: category,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        imageUrl: imgUrl
    })
    
    setLoading(false)
    ToastAndroid.show('Business added successfully', ToastAndroid.LONG)
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
      }}>Add New Business</Text>
      <Text style={{
        fontFamily: 'outfit',
        color: Colors.GRAY
      }}
      >Fill all details in order to add new business</Text>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onImagePick()}>
        {
          !image ?
            <Image source={require('./../../assets/images/placeholder.png')} style={{
              width: 100,
              height: 100
            }} /> : <Image source={{ uri: image }} style={{
              width: 100,
              height: 100,
              borderRadius: 15
            }} />}
      </TouchableOpacity>

      <View>
        <TextInput onChangeText={(v) => setName(v)} placeholder='Name' style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 16,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
          fontFamily: 'outfit'
        }} />
        <TextInput onChangeText={(v) => setAddress(v)} placeholder='Address' style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 16,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
          fontFamily: 'outfit'
        }} />
        <TextInput onChangeText={(v) => setContact(v)} placeholder='Contact' style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 16,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
          fontFamily: 'outfit'
        }} />
        <TextInput onChangeText={(v) => setWebsite(v)} placeholder='Website' style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 16,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
          fontFamily: 'outfit'
        }} />
        <TextInput onChangeText={(v) => setAbout(v)} multiline numberOfLines={5} placeholder='About' style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 16,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
          fontFamily: 'outfit',
          height: 100
        }} />
      </View>
      <View style={{
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 16,
          backgroundColor: '#fff',
          marginTop: 10,
          borderColor: Colors.PRIMARY,
          fontFamily: 'outfit'
      }}>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={categoryList}
        />
      </View>
      <TouchableOpacity disabled={loading} onPress={() => onAddNewBusiness()} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 5, marginTop: 20, marginBottom: 50 }}>
        {
          loading ?
          <ActivityIndicator size={'large'} color={'#fff'}/> 
          :
          <Text style={{ textAlign: 'center', fontFamily: 'outfit-medium', color: '#fff' }}>Add New Business</Text>
        }  
      </TouchableOpacity>
    </ScrollView>
  )
}