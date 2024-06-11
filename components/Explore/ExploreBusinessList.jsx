import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import ExploreBusinessCard from './ExploreBusinessCard'

export default function ExploreBusinessList({ businessList }) {
  return (
    <ScrollView>
      <FlatList 
       showsVerticalScrollIndicator={false}
       data={businessList}
       renderItem={({ item, index }) => (
            <ExploreBusinessCard key={index} business={item}/>
       )}
      />
      <View style={{ height: 300 }}></View>
    </ScrollView>
  )
}