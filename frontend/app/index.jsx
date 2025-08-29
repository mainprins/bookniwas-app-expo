import COLORS from "@/constants/colors";
import { Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import "../global.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PieChart from 'react-native-pie-chart'
import { Redirect } from "expo-router";
import { AuthContext } from "@/stores/AuthContext";
import Toast from "react-native-toast-message";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrows, setTotalBorrows] = useState(0);
  const [totalAvailableBooks, setTotalAvailableBooks] = useState(0);
  const [series, setSeries] = useState([]);

  const widthAndHeight = 250;

  const { isAuthenticated, authUser } = useContext(AuthContext);



  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get("https://bookniwas-app-expo-backend.onrender.com/api/books/books", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTotalBooks(res.data?.allBooks?.length);
      } catch (error) {
        console.log("Error while fetching books");

      }


    }

    const fetchAvailableBooks = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get("https://bookniwas-app-expo-backend.onrender.com/api/books/availableBooks", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTotalAvailableBooks(res.data?.availableBooks?.length);
      } catch (error) {
        console.log("Error while fetching books");

      }


    }

    const fetchBorrows = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const res = await axios.get("https://bookniwas-app-expo-backend.onrender.com/api/books/getBorrows", {
          params: {
            userId: authUser.id
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTotalBorrows(res.data?.allBorrows?.length);
      } catch (error) {
        console.log("Error while fetching borrows");

      }


    }
    fetchBooks();
    fetchAvailableBooks();
    if (authUser?.id) {
      console.log(authUser?.id);
      fetchBorrows();
    }
  }, [authUser]);

  useEffect(() => {
    if (totalBooks || totalBorrows || totalAvailableBooks) {
      setSeries(
        [
          { value: totalBooks, color: '#3C3D37' },
          { value: totalBorrows, color: '#697565' },
          { value: totalAvailableBooks, color: '#ECDFCC' },
        ]
      );
    }
  }, [totalBooks, totalBorrows, totalAvailableBooks]);


  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return (

    <View style={{ backgroundColor: "#181C14", flex: 1, padding: 10, gap: 20 }}>
      <Text style={{ color: "#697565", fontSize: '20px', letterSpacing: 1 }}>Hello, <Text style={{ color: '#ECDFCC' }}>{authUser.fullname.split(' ')[0]}</Text></Text>
      <View style={{ backgroundColor: '#3C3D37', padding: 10, borderRadius: 10, flexDirection: 'row', width: 300, gap: 20, alignItems: 'center' }}>
        <AntDesign name="book" size={34} color="#ECDFCC" />
        <View style={{ backgroundColor: '#ECDFCC', borderRadius: 5, width: 200, padding: 10 }}>
          <Text style={{ color: '#181C14', fontSize: 'large', letterSpacing: 1 }}>Total Books</Text>
          <Text>{totalBooks}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#3C3D37', padding: 10, borderRadius: 10, flexDirection: 'row', width: 300, gap: 20, alignItems: 'center' }}>
        <MaterialIcons name="event-available" size={34} color="#ECDFCC" />
        <View style={{ backgroundColor: '#ECDFCC', borderRadius: 5, width: 200, padding: 10 }}>
          <Text style={{ color: '#181C14', fontSize: 'large', letterSpacing: 1 }}>Available Books</Text>
          <Text>{totalAvailableBooks}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#3C3D37', padding: 10, borderRadius: 10, flexDirection: 'row', width: 300, gap: 20, alignItems: 'center' }}>

        <Ionicons name="file-tray-stacked-sharp" size={34} color="#ECDFCC" />
        <View style={{ backgroundColor: '#ECDFCC', borderRadius: 5, width: 200, padding: 10 }}>
          <Text style={{ color: '#181C14', fontSize: 'large', letterSpacing: 1 }}>Total Borrows</Text>
          <Text>{totalBorrows}</Text>
        </View>
      </View>
      {series.length > 0 && <View style={{ display: 'flex', justifyContent: "center", alignItems: 'center', gap: 20 }}>

        <PieChart widthAndHeight={widthAndHeight} series={series} />
        <Text style={{ fontSize: '15px', color: '#ECDFCC', letterSpacing: 1 }}>Graphical Representation</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
          <View style={{ gap: 10, justifyContent: "center", alignItems: 'center' }}>
            <View style={{ backgroundColor: "#3C3D37", width: 20, height: 20 }}>
            </View>
            <Text style={{ color: '#ECDFCC' }}>Total Books</Text>
          </View>
          <View style={{ gap: 10, justifyContent: "center", alignItems: 'center' }}>
            <View style={{ backgroundColor: "#697565", width: 20, height: 20 }}>
            </View>
            <Text style={{ color: '#ECDFCC' }}>Total Borrows</Text>
          </View>
          <View style={{ gap: 10, justifyContent: "center", alignItems: 'center' }}>
            <View style={{ backgroundColor: "#ECDFCC", width: 20, height: 20 }}>
            </View>
            <Text style={{ color: '#ECDFCC' }}>Available Books</Text>
          </View>
        </View>


      </View>}

    </View>
  );
}


