import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../configs/firebaseConfig'
import { Colors } from '../../constants/Colors'
import Intro from '../../components/BusinessDetail/Intro'
import ActionButton from '../../components/BusinessDetail/ActionButton'
import About from '../../components/BusinessDetail/About'
import Reviews from '../../components/BusinessDetail/Review'
import { Rating } from 'react-native-ratings'

export default function BusinessDetail() {

    const { businessid } = useLocalSearchParams()

    const [businessDetail, setBusinessDetail] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getBusinessDetailById()
    }, [])

    const getBusinessDetailById = async () => {
        setLoading(true)
        const docRef = doc(db, 'BusinessList', businessid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log(docSnap.data())
            setBusinessDetail({ id:docSnap?.id, ...docSnap.data()})
            setLoading(false)
        } else {
            console.log('No such document!')
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            {
                loading ?
                    <ActivityIndicator style={{ marginTop: '60%' }} size={'large'} color={Colors.PRIMARY} /> :
                    <View>
                        {/* Intro */}
                        <Intro business={businessDetail} />
                        {/* Action Button */}
                        <ActionButton business={businessDetail} />
                        {/* About Section */}
                        <About business={businessDetail} />
                        {/* Review Section */}
                        <Reviews business={businessDetail} />
                    </View>
            }
        </ScrollView>
    )
}