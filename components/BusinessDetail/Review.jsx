import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../configs/firebaseConfig'
import { useUser } from '@clerk/clerk-expo'

export default function Reviews({ business }) {

    const [rating, setRating] = useState(4)
    const [userInput, setUserInput] = useState()
    const { user } = useUser()

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business.id)
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })
        })

        ToastAndroid.show('Comment Added Successfully', ToastAndroid.BOTTOM)
    }

    return (
        <View style={{ padding: 20, backgroundColor: '#fff', height: '100%' }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Reviews</Text>
            <View>
                <Rating
                    showRating={false}
                    onFinishRating={rating => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                    imageSize={20}
                />
                <TextInput
                    placeholder='Write your comment'
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top'
                    }}
                    onChangeText={(value) => setUserInput(value)}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={() => onSubmit()}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ fontFamily: 'outfit', color: '#fff', textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>
            {/* Display Previous Reviews    */}
            <View>
                {
                    business?.reviews?.map((review, index) => (
                        <View style={{
                            display: 'flex',  
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',  
                            padding: 10,
                            borderWidth: 1,
                            borderColor: Colors.GRAY,
                            borderRadius: 15,
                            marginTop: 10                 
                        }}>
                            <Image source={{ uri: review.userImage }} style={{ width: 50, height: 50, borderRadius: 99 }} />
                            <View style={{ 
                                display: 'flex',
                                gap: 5,
                            }}>
                                <Rating 
                                  imageSize={20}
                                  ratingCount={review.rating}
                                  style={{ alignItems: 'flex-start'}}
                                />
                                <Text style={{ fontFamily: 'outfit-medium' }}>{review.userName}</Text>
                                <Text>{review.comment}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}
