import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/firebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'

export default function PopularBusiness() {

  const [popularBusinessList, setPopularBusinessList] = useState([])

  useEffect(() => {
    getBusinessList()
  }, [])

  const getBusinessList = async () => {
    setPopularBusinessList([])
    const q = query(collection(db, "BusinessList"), limit(10))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setPopularBusinessList(prev => [...prev, {id: doc.id ,...doc.data()}])
    })
  }

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
          }}>
          Popular Business
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-medium' }}>View All</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={popularBusinessList}
        renderItem={({ item, index }) => (
          <PopularBusinessCard
            business={item}
            key={index}
          />
        )}
      />
    </View>
  )
}