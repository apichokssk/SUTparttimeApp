import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';  
import { doc, getDoc, onSnapshot } from 'firebase/firestore';  // ใช้ getDoc และ onSnapshot

const HeaderBar = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({ profile: '' });
  const [loading, setLoading] = useState(true);
  const [realTimeListener, setRealTimeListener] = useState(null); // สำหรับเก็บตัวลบ listener

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // ทำการดึงข้อมูลเริ่มต้นครั้งแรก
      const fetchInitialData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setProfileData(userDoc.data());
          } else {
            console.log('No such document!');
          }
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };

      fetchInitialData();
    }
  }, []);

  // ฟังก์ชันรีเฟรชข้อมูลเพียงครั้งเดียว
  const onRefresh = async () => {
    setLoading(true); 
    const user = auth.currentUser;

    if (user) {
      try {
        // ดึงข้อมูลใหม่ 1 ครั้ง
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }

        // กำหนดให้ทำการอัปเดตข้อมูลแบบเรียลไทม์หลังจากรีเฟรช
        if (!realTimeListener) {
          const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnapshot) => {
            if (docSnapshot.exists()) {
              setProfileData(docSnapshot.data());
            }
          });
          setRealTimeListener(() => unsubscribe); // เก็บตัวลบ listener
        }

        setLoading(false);
      } catch (error) {
        console.error('Error refreshing user data:', error);
        setLoading(false);
      }
    }
  };

  // ไปยังหน้าโปรไฟล์
  const goToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  // Cleanup real-time listener when component unmounts
  useEffect(() => {
    return () => {
      if (realTimeListener) {
        realTimeListener(); // ลบ listener เมื่อ component ถูกทำลาย
      }
    };
  }, [realTimeListener]);

  if (loading) {
    return null; 
  }

  return (
    <View style={styles.container}>
      {/* โลโก้ */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={require('./img/newlogo.png')} style={{height:60, width:150}}/>
      </View>

      {/* ปุ่มรีเฟรช */}
      <View style={{ flex: 0.13 }}>
        
      </View>

      {/* เว้นระยะห่าง */}
      <View style={{ flex: 0.05 }} />

      {/* รูปโปรไฟล์ */}
      <View style={{ flex: 0.25 }}>
        <TouchableOpacity onPress={goToProfile}>
          {profileData.profile ? (
            <Image
              source={{ uri: profileData.profile }}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
          ) : (
            <Ionicons name="person-circle" size={60} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F44948',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.17,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default HeaderBar;
