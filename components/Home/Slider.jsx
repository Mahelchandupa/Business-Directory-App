import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/firebaseConfig'

export default function Slider() {

  const [sliderList, setSliderList] = useState([])

  useEffect(() => {
     getSliderList()
  }, [])

  const getSliderList = async () => {
    setSliderList([])
     const q = query(collection(db, "Slider"))
     const querySnapshot = await getDocs(q) 

     querySnapshot.forEach((doc) => {
       setSliderList(prev => [...prev, doc.data()])
     })
  }

  return (
    <View>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, padding: 20, paddingLeft: 20, paddingTop: 20, paddingBottom: 5 }}>
         #Special for you
      </Text>
      <FlatList 
        horizontal={true}
        style={{
            padding: 10
        }}
        showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({ item, index}) => (
            <Image 
            source={{ uri: item.imageUrl }} 
            style={{ width: 300, height: 150, borderRadius: 15, marginRight: 15 }}
            />
        )}
      />
    </View>
  )
}