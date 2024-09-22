import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Ionicons from '@expo/vector-icons/Ionicons';

const EditProFileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false); // State for tracking image upload
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const user = auth.currentUser; // Get the current authenticated user

  // Function to pick an image from the device's gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your photo library');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image URI
      setModalVisible(false); // Close modal after selecting image
    }
  };

  // Function to take a photo using the device's camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your camera');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the captured image URI
      setModalVisible(false); // Close modal after taking photo
    }
  };

  // Fetch the user profile data from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
            setPhone(userData.phone || '');
            setProfile(userData.profile || '');
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Could not load profile data.');
        } finally {
          setLoading(false); // Set loading state to false once data is fetched
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  // Upload the selected image to Firebase Storage and return the download URL
  const uploadImageToStorage = async (uri) => {
    setUploading(true); // Set uploading state to true during upload process
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `profile/${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL; // Return the image download URL
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image.');
      return null;
    } finally {
      setUploading(false); // Reset uploading state after process completion
    }
  };

  // Function to handle profile update and save data to Firestore
  const handleSave = async () => {
    if (user) {
      try {
        let profileImageUrl = profile; // Keep old image if no new one is uploaded
        if (image) {
          profileImageUrl = await uploadImageToStorage(image); // Upload new image if selected
        }

        await setDoc(doc(db, 'users', user.uid), {
          profile: profileImageUrl,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: user.email,
        }, { merge: true });

        Alert.alert('Success', 'Profile saved successfully!');
        navigation.goBack(); // Navigate back after saving
      } catch (error) {
        console.error('Error saving profile:', error);
        Alert.alert('Error', 'Failed to save profile.');
      }
    } else {
      Alert.alert('Error', 'No user logged in.');
    }
  };

  // Cancel and navigate back without saving changes
  const handleCancel = () => {
    navigation.goBack();
  };

  // Display loading indicator while profile data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff5252" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Touchable image to open modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {image || profile ? (
          <Image
            source={{ uri: image || profile }} // Show either the selected image or the current profile image
            style={styles.image}
          />
        ) : (
          <Ionicons name="person-circle" size={200} color="#e0e0e0" />
        )}
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="small" color="#ff5252" />}

      {/* Modal for selecting image options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
              <Text style={styles.optionText}>ภาพในเครื่อง</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
              <Text style={styles.optionText}>ถ่ายรูป</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Form for editing profile */}
      <View style={styles.form}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Phone:</Text>
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={uploading}>
          <Text style={styles.saveButtonText}>บันทึก</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the component UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  optionButton: {
    backgroundColor: '#ff8a80',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'SUT_Regular',
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 25,
    fontFamily: 'SUT_Regular',
    color: '#ff5252',
    marginBottom: 5,
  },
  input: {
    fontFamily: 'SUT_Regular',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 25,
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
    fontSize: 25,
    fontFamily: 'SUT_Regular',
  },
  saveButton: {
    backgroundColor: '#ff8a80',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'SUT_Regular',
  },
});

export default EditProFileScreen;
