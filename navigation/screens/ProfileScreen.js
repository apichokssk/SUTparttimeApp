import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { doc, onSnapshot } from 'firebase/firestore';  // Import Firestore functions for real-time updates
import { auth, db } from '../../firebase';  // Make sure to import Firebase setup
import Ionicons from '@expo/vector-icons/Ionicons';
const ProfileScreen = () => {
  const navigation = useNavigation();  // Use navigation to navigate to other screens
  const [profileData, setProfileData] = useState({});  // State to store profile data
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // Use onSnapshot to listen to real-time updates from Firestore
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnapshot) => {
        if (docSnapshot.exists()) {
          setProfileData(docSnapshot.data());  // Update the state when the profile data changes
        } else {
          console.log('No such document!');
        }
        setLoading(false);  // Set loading to false once data is fetched
      }, (error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });

      // Cleanup the listener on unmount to avoid memory leaks
      return () => unsubscribe();
    }
  }, []);

  const goToEditProfile = () => {
    navigation.navigate('EditProFileScreen');  // Navigate to EditProFileScreen
  };

  const handleLogout = () => {
    // Show confirmation Alert before logging out
    Alert.alert(
      'ยืนยันออกจากระบบ',  // Alert title
      'คุณต้องการออกจากระบบใช่ไหม?',  // Alert message
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('ยกเลิกการออกจากระบบ'),
          style: 'cancel',  // Cancel button style
        },
        {
          text: 'ยืนยัน',
          onPress: () => {
            // When confirmed, navigate to Login
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {/* Profile Image */}
        <TouchableOpacity onPress={goToEditProfile}>
          {profileData.profile ? (
            <Image
              source={{ uri: profileData.profile }}
              style={styles.profileImage}
            />
          ) : (
            <Ionicons name="person-circle" size={100} color="#fff" />
          )}
        </TouchableOpacity>

        {/* Profile Details */}
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>Hi : {profileData.username || 'N/A'}</Text>
          <Text style={styles.profileName}>firstname: {profileData.firstName || 'N/A'}</Text>
          <Text style={styles.profileLastName}>lastname: {profileData.lastName || 'N/A'}</Text>
          <Text style={styles.profilePhone}>phone: {profileData.phone || 'N/A'}</Text>
          <Text style={styles.profileEmail}>email: {auth.currentUser ? auth.currentUser.email : 'N/A'}</Text>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={goToEditProfile}>
            <Text style={styles.editButtonText}>แก้ไขโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    backgroundColor: '#ff8a80', 
    borderRadius: 20,
    padding: 20,
    width: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileDetails: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  profileID: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'SUT_Regular',
  },
  userName:{
    fontSize: 30,
    fontFamily: 'SUT_Bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'SUT_Regular',
  },
  profileLastName: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'SUT_Regular',
  },
  profilePhone: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'SUT_Regular',
  },
  profileEmail: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'SUT_Regular',
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#ff5252',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'SUT_Regular',
  },
  logoutButton: {
    marginTop: 50,
    backgroundColor: '#F44948',  // Red color for the button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,  // Rounded corners for the button
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'SUT_Bold',
  },
});

export default ProfileScreen;
