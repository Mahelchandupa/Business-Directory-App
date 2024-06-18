import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from './../../configs/firebaseConfig'
import { useUser } from '@clerk/clerk-expo'

export default function Intro({ business }) {

    const router = useRouter()
    const { user } = useUser()

    const onDelete = () => {
        Alert.alert('Do you want to delete this business?', 'This action cannot be undone', [
            {
                text: 'Cancel',
                style: 'cancel'
            }, 
            {
                text: 'Delete',
                onPress: () => deleteBusiness()
            }
        ])
    }

    const deleteBusiness = async () => {
        await deleteDoc(doc(db, 'BusinessList', business.id))
        router.back()
        ToastAndroid.show('Business deleted successfully', ToastAndroid.LONG)
    }

    return (
        <View>
            <View style={{ position: 'absolute', zIndex: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', padding: 20 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: business?.imageUrl }} style={{ width: '100%', height: 340 }} />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 20,
                marginTop: -20,
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                justifyContent: 'space-between'
            }}>
                <View
                    style={{
                        padding: 20,
                        marginTop: -20,
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                    }}>
                    <Text style={{ fontSize: 26, fontFamily: 'outfit-bold' }}>{business?.name}</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>{business?.address}</Text>
                </View>
                {
                user?.primaryEmailAddress?.emailAddress === business?.userEmail &&
                <TouchableOpacity onPress={() => onDelete()}>
                    <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}