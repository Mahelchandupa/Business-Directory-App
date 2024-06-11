import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function BusinessListCard({ business }) {

  const { item } = business;
  const router = useRouter()

  return (
    <TouchableOpacity 
      style={{
        padding: 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        gap: 10
      }}
      onPress={() => router.push(`/businessdetail/${item?.id}`)}
    >
      <Image
        source={{ uri: item?.imageUrl }}
        style={{ width: 120, height: 120, borderRadius: 15 }}
      />
      <View style={{ flex: 1, gap: 7 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>{item?.name}</Text>
        <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 14  }}>{item?.address}</Text>
        <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                        marginTop: 5
                    }}>
                        <Image
                            source={require('./../../assets/images/star.png')}
                            style={{
                                width: 15,
                                height: 15,
                            }}
                        />
                        <Text style={{ fontFamily: 'outfit' }}>4.5</Text>
                    </View>
      </View>
    </TouchableOpacity>
  )
}