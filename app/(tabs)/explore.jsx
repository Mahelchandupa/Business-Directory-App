import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import Category from '../../components/Home/Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/firebaseConfig'
import { set } from 'firebase/database'
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList'

export default function explore() {

  const [businessList, setBusinessList] = useState([])

  const getBusinessByCategory = async (category) => {
    setBusinessList([]) 
    const q = query(collection(db, "BusinessList"), where("category", "==", category))
     const querySnapshot = await getDocs(q)

     querySnapshot.forEach((doc) => {
        setBusinessList(prev => [...prev, {id: doc.id, ...doc.data()}])
      })
  }

  return (
    <View style={{
      padding: 20,
      paddingTop: 40
    }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>Explore More</Text>
      {/* Search Bar */}
      <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                <TextInput placeholder='Search...' style={{ fontFamily: 'outfit', fontSize: 16 }}></TextInput>
      </View>
      {/* Category */}
      <Category explore={true} onCategorySelect={(category) => getBusinessByCategory(category) }/>
      {/* Business List */}
      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
     display: 'flex',
     flexDirection: 'row',
     gap: 10,
     alignItems: 'center',
     backgroundColor: '#fff',
     padding: 10,
     marginVertical: 10,
     marginTop: 15,
     borderRadius: 8,
     borderWidth: 1,
     borderColor: Colors.PRIMARY
  }
})