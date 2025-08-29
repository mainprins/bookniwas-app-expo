import { Link, Redirect } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from "../constants/colors.js";
import { useContext, useState } from 'react';
import { AuthContext } from '@/stores/AuthContext.js';

const SignupPage = () => {

  const { isAuthenticated, signup } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "borrower",

  });

  const [profilePic, setProfilePic] = useState(null);



  const handleSignup = () => {
    const data = new FormData()
    data.append('fullname', formData.fullname)
    data.append('email', formData.email)
    data.append('password', formData.password)
    data.append('role', formData.role)
  
    signup(data);
  }

  if (isAuthenticated) {
    return <Redirect href={'/'} />
  }

  return (
    <View
      className="w-full h-full flex-1 flex-col justify-center items-center"
      style={{ backgroundColor: COLORS.darkest, gap: 15 }}
    >
      <Text style={{ color: COLORS.lightest }} className='text-lg font-semibold tracking-widest'>
        Create Your Account
      </Text>

      <TextInput
        placeholder='Enter your full name'
        className='rounded-[60px]'
        onChangeText={(text)=>setFormData((prev)=>({...prev,fullname:text}))}
        style={{
          backgroundColor: COLORS.darker,
          color: COLORS.lighter,
          borderRadius: 2,
          padding: 5,
          outline: 0
        }}
      />

      <TextInput
        placeholder='Enter your email'
        onChangeText={(text)=>setFormData((prev)=>({...prev,email:text}))}
        className='rounded-[60px]'
        style={{
          backgroundColor: COLORS.darker,
          color: COLORS.lighter,
          borderRadius: 2,
          padding: 5,
          outline: 0
        }}
      />

      <TextInput
        placeholder='Enter your password'
        onChangeText={(text)=>setFormData((prev)=>({...prev,password:text}))}
        className='rounded-[60px]'
        style={{
          backgroundColor: COLORS.darker,
          color: COLORS.lighter,
          borderRadius: 2,
          padding: 5,
          outline: 0
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.darker,
          color: COLORS.lightest,
          padding: 5,
          borderRadius: 5
        }}
        onPress={handleSignup}
      >
        <Text style={{ color: COLORS.lightest }}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{ color: COLORS.lightest }}>Already have and account? <Link href={'/login'}>Login</Link></Text>
    </View>
  );
};

export default SignupPage;
