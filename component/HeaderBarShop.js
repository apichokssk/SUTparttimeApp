import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';  // Make sure to import Firebase setup
import { doc, onSnapshot } from 'firebase/firestore';  // Import onSnapshot for real-time updates

const HeaderBarShop = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({ profile: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // Use onSnapshot for real-time updates
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          setProfileData(doc.data());
        } else {
          console.log('No such document!');
        }
        setLoading(false); // Stop loading once profile is fetched
      }, (error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });

      // Cleanup the listener on unmount
      return () => unsubscribe();
    }
  }, []);

  const goToProfile = () => {
    navigation.navigate('ProfileScreenShop');
  };

  if (loading) {
    return null; // Optionally render a loading spinner here
  }

  return (
    <View style={styles.container}>
      {/* โลโก้หรือชื่อด้านซ้าย */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <Image source={require('./img/newlogo.png')} style={{height:60,width:150}}/>
      </View>

      {/* ปุ่มค้นหา */}
      <View style={{ flex: 0.13 }}>
      </View>

      {/* เว้นระยะห่าง */}
      <View style={{ flex: 0.05 }} />

      {/* รูปภาพโปรไฟล์ */}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default HeaderBarShop;
