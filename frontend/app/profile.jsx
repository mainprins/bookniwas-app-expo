import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../constants/colors'
import { useContext } from 'react'
import axios from "axios"
import { AuthContext } from '@/stores/AuthContext.js';
import { Redirect } from 'expo-router';

const profile = () => {

    const {isAuthenticated,authUser,logout} = useContext(AuthContext);

    const handleLogout = async ()=>{
       logout();
    }
    
    if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
    }

    return (
        <View style={{ backgroundColor: COLORS.darkest, flex: 1, justifyContent: 'center',gap: 30,paddingLeft: 75 }}>
            <Image source={require('../assets/images/profile.jpg')} style={{
                width: 50,
                height: 50,
                borderRadius: 18,
                marginLeft: 70
            }} />
    
            <Text style={{color:COLORS.lightest,letterSpacing: 2}}>Name :    {authUser.fullname}</Text>
            <Text style={{color:COLORS.lightest,letterSpacing: 2}}>Role :    {authUser.role}</Text>
            <Text style={{color:COLORS.lightest,letterSpacing: 2}}>Email :    {authUser.email}</Text>
            <TouchableOpacity style={{marginLeft: 70,backgroundColor:COLORS.darker,width:60,alignItems:'center',padding:5,borderRadius:5}} onPress={handleLogout}>
                <Text style={{color:COLORS.lightest}}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default profile