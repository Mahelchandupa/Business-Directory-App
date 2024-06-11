import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function ActionButton({ business }) {

  const actionButtonMenu = [
    {
        id: 1,
        name: 'Call',
        icon: require('./../../assets/images/call.png'),
        url: `tel:${business?.contact}`
    },
    {
        id: 2,
        name: 'Location',
        icon: require('./../../assets/images/pin.png'),
        url: `https://www.google.com/maps/search/?api=1&query=${business?.address}`
    },
    {
        id: 3,
        name: 'Web',
        icon: require('./../../assets/images/web.png'),
        url: business?.website
    },
    {
        id: 4,
        name: 'Share',
        icon: require('./../../assets/images/share.png'),
        url: `https://wa.me/?text=${business?.name} - ${business?.address}`
    }
  ]

  const onPrssHandler = (item) => {
    if (item?.name === 'share') {
        return ;
    }
    Linking.openURL(item.url)
  }
    
  return (
    <View style={{ backgroundColor: '#fff', padding: 20 }}>
      <FlatList 
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={actionButtonMenu}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPrssHandler(item) }>
            <Image source={item?.icon} style={{ width: 50, height: 50 }}/>
            <Text style={{ fontFamily: 'outfit-medium', textAlign: 'center', marginTop: 3 }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}