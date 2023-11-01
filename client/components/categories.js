import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCategories } from '../api'
import { urlFor } from '../sanity';
import { themeColors } from '../theme';

export default function Categories() {

  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then(data=>{
      // console.log('got data', data[0].name);
      setCategories(data);
    })
  }, [])
  return (
    <View className="mt-4">
      <ScrollView
          // className="p-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          className="overflow-visible"
          contentContainerStyle={{
            paddingHorizontal: 15
          }}
      >
          {
            categories?.map(category=>{
              let isActive = category._id==activeCategory;
              let btnClass = isActive? ' bg-gray-300': ' bg-gray-200';
              let textClass = isActive? ' font-semibold text-green-800': ' text-gray-500';
              return(
                <View key={category._id} className="flex justify-center items-center mr-3">
                  <TouchableOpacity
                    onPress={()=> setActiveCategory(category._id)}
                    className={"px-2 py-1 rounded-md shadow"+ btnClass}>
                 {/* {category.image && (<Image style={{width: 65, height: 20, borderRadius:6}} source={{ uri: urlFor(category.image).url()}}
                    />)
              } */}
                <Text className={"text-sm "+textClass}>{category.name}</Text>
                  </TouchableOpacity>
                  {/* <Text>{category.image.asset[_ref]}</Text> */}
                
                </View>
              )
            })
          }
      </ScrollView>
    </View>
  )
}                                                                                                                                                                                                                                                                                                                                                                                                                     
