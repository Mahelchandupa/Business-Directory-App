import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function ExploreBusinessCard({ business }) {

  const router = useRouter()
    
  return (
    <TouchableOpacity style={{
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15
    }}
    onPress={() => router.push('/businessdetail/'+business?.id)}
    >
      <Image 
        source={{ uri: business?.imageUrl }}
        style={{
            width: 'full',
            height: 150,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>{business?.name}</Text>
        <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>{business?.address}</Text>
      </View>
    </TouchableOpacity>
  )
}