import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { db } from '../../configs/firebaseConfig'
import { Colors } from '../../constants/Colors'

export default function BusinessListByCategory() {

    const navigation = useNavigation()
    const { category } = useLocalSearchParams()

    const [bussinessList, setBussinessList] = useState([])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        })
        getBussinessList()
    }, [])

    const getBussinessList = async () => {
        const q = query(collection(db, 'BusinessList'), where('category', '==', category))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setBussinessList(prev => [...prev, doc.data()])
        })
    }

    return (
        <View>
            {
                bussinessList.length > 0 ?

                    <FlatList
                        data={bussinessList}
                        renderItem={(item, index) => (
                            <BusinessListCard business={item} key={index} />
                        )}
                    /> :
                    <Text style={{ 
                        textAlign: 'center',
                        marginTop: '50%',
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        color: Colors.GRAY
                     }}>No Business Found</Text>
            }

        </View>
    )
}