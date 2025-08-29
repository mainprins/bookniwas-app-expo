import React from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import COLORS from '@/constants/colors'
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from 'expo-router'

const CustomHeader = ({ title, onProfilePress,hidden }) => {

  const router = useRouter();
 return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={()=>{router.back()}} style={styles.iconWrapper}>
        <Ionicons name="arrow-back" size={24} color={COLORS.lightest} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Profile Image Button */}
      {!hidden &&  <TouchableOpacity onPress={onProfilePress}>
        <Image 
          source={require('../assets/images/profile.jpg')} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>}
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darker,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    paddingRight: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.lightest,
    fontSize: 18,
    fontWeight: '600',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  }
})

export default CustomHeader
