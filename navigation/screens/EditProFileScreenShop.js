import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';  // Firestore functions
import { auth, db } from '../../firebase';  // Ensure correct path to firebase.js

const EditProFileScreenShop = ({ navigation }) => {
  // State for the form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);  // Add a loading state

  const user = auth.currentUser;  // Get the current logged-in user

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          // Get the user's document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
            setPhone(userData.phone || '');
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Could not load profile data.');
        } finally {
          setLoading(false);  // Set loading to false after fetching data
        }
      }
    };

    fetchUserProfile();  // Fetch user data when the component mounts
  }, [user]);

  const handleCancel = () => {
    // Go back to the ProfileScreen when cancel is clicked
    navigation.goBack();
  };

  const handleSave = async () => {
    if (user) {
      try {
        // Save the data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: user.email  // You can store the email as well
        }, { merge: true });  // Merge true so it doesn't overwrite the whole document

        Alert.alert('Success', 'Profile saved successfully!');
        navigation.goBack();  // Navigate back after saving
      } catch (error) {
        console.error('Error saving profile:', error);
        Alert.alert('Error', 'Failed to save profile.');
      }
    } else {
      Alert.alert('Error', 'No user logged in.');
    }
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
      <Image
        source={require('./img2/tiw.png')}  // Replace with your profile image
        style={styles.profileImage}
      />

      {/* Form for editing profile */}
      <View style={styles.form}>
        <Text style={styles.label}>FirstName:</Text>
        <TextInput
          style={styles.input}
          placeholder="FirstName"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>LastName:</Text>
        <TextInput
          style={styles.input}
          placeholder="LastName"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>tel:</Text>
        <TextInput
          style={styles.input}
          placeholder="0XX-XXX-XXXX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Cancel and Save buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>บันทึก</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileID: {
    fontSize: 16,
    color: '#ff5252',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#ff5252',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderColor: '#ff5252',
    borderWidth: 1,
  },
  cancelButtonText: {
    color: '#ff5252',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#ff8a80',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProFileScreenShop;
