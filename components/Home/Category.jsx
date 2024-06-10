import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import CategoryItem from './CategoryItem'

export default function() {

    const [categoryList, setCategoryList] = useState([])
    
    useEffect(() => {
        getCategoryList()
    },[])

    const getCategoryList = async () => {
       setCategoryList([])
       const q = query(collection(db, "Category"))
       const querySnapshot = await getDocs(q)

       querySnapshot.forEach((doc) => {
        console.log(doc.data())
         setCategoryList(prev => [...prev, doc.data()])
       })
    }

    return (
        <View>
            <View
             style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
             }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'outfit-bold',
                    }}>
                    Category
                </Text>
                <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-medium' }}>View All</Text>
            </View>
            <FlatList 
                  data={categoryList}
                  horizontal={true}
                  style={{ marginLeft: 20 }}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index}) => (
                    <CategoryItem category={item} key={index} onCategoryPress={() => console.log(category)}/>
                )}
                />
        </View>
    )
}