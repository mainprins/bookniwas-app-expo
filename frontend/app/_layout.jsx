import { Redirect, Stack, useRouter } from 'expo-router';
import { AuthProvider, AuthContext } from "../stores/AuthContext.js";
import Toast from "react-native-toast-message";
import CustomHeader from "../components/CustomHeader.jsx";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import COLORS from "@/constants/colors";

function Navigator() {
  const router = useRouter();
  const { loading } = useContext(AuthContext); 

  const onProfilePress = () => {
    router.push('/profile');
  };

  if (loading) {

    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: COLORS.darker }}>
        <ActivityIndicator size="large" color={COLORS.lightest} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          header: (props) => (
            <CustomHeader 
              title="Home" 
              onProfilePress={onProfilePress} 
              hidden={false} 
              {...props} 
            />
          ),
        }}
      />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen 
        name="profile" 
        options={{
          header: (props) => (
            <CustomHeader 
              title="Profile" 
              onProfilePress={onProfilePress} 
              hidden={true} 
              {...props} 
            />
          ),
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigator />
      <Toast />
    </AuthProvider>
  );
}
