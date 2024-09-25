import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { doc, updateDoc } from 'firebase/firestore';  // Import Firestore functions
import { auth, db } from '../../firebase';  // Make sure to import Firebase setup
import { onSnapshot } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileScreenShop = () => {
  const navigation = useNavigation();  // ใช้ navigation เพื่อนำทาง
  const [profileData, setProfileData] = useState({});  // State to store profile data
  const [loading, setLoading] = useState(true);  // Loading state
  const [shopName, setShopName] = useState('');  // State for shop name input

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // Use onSnapshot to listen to real-time updates from Firestore
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnapshot) => {
        if (docSnapshot.exists()) {
          setProfileData(docSnapshot.data());  // Update the state when the profile data changes
          setShopName(docSnapshot.data().nameshop || ''); // Set the initial shop name if it exists
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

  const handleSaveShopName = async () => {
    const user = auth.currentUser;

    if (!shopName) {
      Alert.alert('Error', 'Shop name cannot be empty!');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        nameshop: shopName,
      });
      Alert.alert('Success', 'Shop name updated successfully!');
    } catch (error) {
      console.error('Error updating shop name:', error);
      Alert.alert('Error', 'Failed to update shop name. Please try again.');
    }
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfileScreenShop');  // Correct the name to match the registered screen name
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
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="person" size={25} color="#fff" />
            <Text style={styles.userName}>: {profileData.username || 'N/A'}</Text>
          </View>
          <Text style={styles.profilePhone}>ShopName: {profileData.nameshop || 'N/A'}</Text>
          <Text style={styles.profilePhone}>phone: {profileData.shopPhone || 'N/A'}</Text>
          <Text style={styles.profileEmail}>email: {auth.currentUser ? auth.currentUser.email : 'N/A'}</Text>


          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={goToEditProfile}>
            <Text style={styles.editButtonText}>แก้ไขโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="exit" size={30} color="#fff" />
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
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 18,
    color: '#fff',
  },
  profileLastName: {
    fontSize: 18,
    color: '#fff',
  },
  profilePhone: {
    fontSize: 16,
    color: '#fff',
  },
  profileEmail: {
    fontSize: 16,
    color: '#fff',
  },
  shopInput: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  saveShopButton: {
    marginTop: 15,
    backgroundColor: '#F44948',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveShopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 50,
    backgroundColor: '#F44948',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    flexDirection: 'row',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreenShop;
