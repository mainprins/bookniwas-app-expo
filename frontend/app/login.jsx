import { Link, Redirect } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from "../constants/colors.js";
import { AuthContext } from '@/stores/AuthContext.js';

const LoginPage = () => {

  const [formData,setFormData] = useState({
    email: "",
    password: "",
  })

  const {login,isAuthenticated} = useContext(AuthContext);

  if(isAuthenticated) {
    return <Redirect href={'/'}/>
  }

  return (
    <View
      className="w-full h-full flex-1 flex-col justify-center items-center"
      style={{ backgroundColor: COLORS.darkest, gap: 15 }}
    >
      <Text style={{ color: COLORS.lightest }} className='text-lg font-semibold tracking-widest'>Welcome Back</Text>
      <TextInput placeholder='Enter your email' className='rounded-[60px]' onChangeText={(text)=>setFormData((prev)=>({...prev,email:text}))} style={{ backgroundColor: COLORS.darker, color: COLORS.lighter, borderRadius: 2, padding: 5, outline: 0 }} />
      <TextInput placeholder='Enter your password' className='rounded-[60px]' onChangeText={(text)=>setFormData((prev)=>({...prev,password:text}))} style={{ backgroundColor: COLORS.darker, color: COLORS.lighter, borderRadius: 2, padding: 5, outline: 0 }} />
      <TouchableOpacity style={{ backgroundColor: COLORS.darker, color: COLORS.lightest, padding: 5, borderRadius: 5 }} onPress={()=>{login(formData)}}><Text style={{color: COLORS.lightest}}>Login</Text></TouchableOpacity>
     <Text style={{ color: COLORS.lightest }}>Don't have an account? <Link href={'/signup'}>Signup</Link></Text>

    </View>
  );
};

export default LoginPage;
