import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './../../configs/firebaseConfig'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { Colors } from '../../constants/Colors'

export default function MyBusiness() {

    const navigation = useNavigation()
    const { user } = useUser()

    const [businessList, setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Business',
            headerTitleAlign: 'center',
            headerShown: true,
            headerStyle: {
                backgroundColor: Colors.PRIMARY,
            }
          })
        user && getUserBusiness()
      }, [user])

   const getUserBusiness = async () => {
        setLoading(true)
      setBusinessList([])
      const q = query(collection(db, 'BusinessList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        setBusinessList(prev => [...prev, {id: doc.id, ...doc.data()}])
      })
      setLoading(false)
    }   
    
  return (
    <View style={{
        padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
      }}>My Business</Text>

      <FlatList 
        data={businessList}
        onRefresh={getUserBusiness}
        refreshing={loading}
        renderItem={( item, index ) => (
            <BusinessListCard business={item} index={index} />
        )}
      />
    </View>
  )
}