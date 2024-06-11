import { View, FlatList, Text, ActivityIndicator } from 'react-native'
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
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        })
        getBussinessList()
    }, [])

    const getBussinessList = async () => {
        setLoading(true)
        const q = query(collection(db, 'BusinessList'), where('category', '==', category))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            setBussinessList(prev => [...prev, {id: doc?.id, ...doc.data()}])
        })
        setLoading(false)
    }

    return (
        <View>
            {
                bussinessList.length > 0 && loading === false ?

                    <FlatList
                        data={bussinessList}
                        onRefresh={getBussinessList}
                        refreshing={loading}
                        renderItem={(item, index) => (
                            <BusinessListCard business={item} key={index} />
                        )}
                    /> : loading ? <ActivityIndicator style={{ marginTop: '60%' }} size={'large'} color={Colors.PRIMARY} /> :
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