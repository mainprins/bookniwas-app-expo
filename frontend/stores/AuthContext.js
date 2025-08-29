import { createContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [authUser, setAuthUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {

            setLoading(true);

            try {
              const storedToken = await AsyncStorage.getItem('token');
              if(storedToken){
                setIsAuthenticated(true);
                setToken(storedToken);
                const res = await axios.get("https://bookniwas-app-expo-backend.onrender.com/api/check",{
                    headers:{
                        Authorization:`Bearer ${storedToken}`
                    }
                });
                setAuthUser(res.data?.authUser);
              } else {
                setIsAuthenticated(false);
                setToken(null);
              }
            } catch (error) {
                setAuthUser(null);
                setIsAuthenticated(false);
                setToken(null);
            } finally {
                setLoading(false);
            }
        }

        verifyAuth();
    }, [])


    const login = async (credentials) => {
        try {
            const res = await axios.post(
                "https://bookniwas-app-expo-backend.onrender.com/api/auth/login",
                credentials
            );
            setToken(res.data?.token);
            setIsAuthenticated(true);
            setAuthUser(res.data?.authUser);
            await AsyncStorage.setItem('token', res.data?.token);
            Toast.show({
                type: "success",
                text1: res.data?.message,
                text2: "Welcome back!",
            });
        } catch (error) {
            setIsAuthenticated(false);
            Toast.show({
                type: "error", // "success" | "error" | "info"
                text1: error.response?.data?.message,
                text2: "Try Again!",
            });
            console.log(error.response?.data?.message);

        }
    };

    const signup = async (credentials) => {
        try {
            const res = await axios.post(
                "https://bookniwas-app-expo-backend.onrender.com/api/auth/register",
                credentials,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setIsAuthenticated(true);
            setAuthUser(res.data.authUser);
            await AsyncStorage.setItem('token', res.data?.token);
            setToken(res.data?.token)
            Toast.show({
                type: "success", // "success" | "error" | "info"
                text1: res.data?.message,
                text2: "Good luck!",
            });
        } catch (error) {
            setIsAuthenticated(false);
            Toast.show({
                type: "error", // "success" | "error" | "info"
                text1: error.response?.data?.message,
                text2: "Try Again!",
            });
            console.log(error.response?.data?.message);

        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setIsAuthenticated(false);
            Toast.show({
                type: "success", // "success" | "error" | "info"
                text1: "Logged out successfully",
                text2: "See you again!",
            })
        } catch (error) {
            Toast.show({
                type: "error", // "success" | "error" | "info"
                text1: "Error occured while logging in.",
                text2: "Try Again!",
            });
        }

    }

    return <AuthContext.Provider value={{ isAuthenticated, authUser, login, logout, signup, loading, token }}>
        {children}
    </AuthContext.Provider>
}