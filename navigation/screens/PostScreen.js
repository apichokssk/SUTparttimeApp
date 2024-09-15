import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { storage, db, auth } from '../../firebase'; // Adjust for your firebase setup
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import * as LocationReverseGeocode from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
const PostScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [initialRegion, setInitialRegion] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Input states for Firebase Firestore fields
  const [position, setPosition] = useState('');
  const [perhrs, setPerHrs] = useState('');
  const [person, setPerson] = useState('');
  const [sum, setSum] = useState('');
  const [textDetail, setTextDetail] = useState('');
  const [profileShop, setProfileShop] = useState('');
  const [gate, setGate] = useState('');

  const GATE_1_COORDINATE = { latitude: 14.901235, longitude: 102.009467 };
  const GATE_4_COORDINATE = { latitude: 14.884229, longitude: 102.024803 };

  // Get user location
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Permission to access location was denied.');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        Alert.alert('Error', 'Could not fetch location.');
      }
    };

    getUserLocation();
  }, []);

  // Image Picker
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Image selection failed.');
    }
  };

  // Upload Image to Firebase Storage
  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `profileshop/${new Date().getTime()}`);
      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      setImageUri(url);
      setProfileShop(url); // Set image URL to profileShop field
      Alert.alert('Image uploaded successfully!');
    } catch (error) {
      Alert.alert('Upload failed', error.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle Map Press
 const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    if (coordinate) {
        setMarkerCoordinate(coordinate);

        try {
            let [address] = await LocationReverseGeocode.reverseGeocodeAsync(coordinate);
            setLocationAddress(`${address.street}, ${address.city}, ${address.region}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch address.');
        }
    }
};
  // Select Gate
  const selectGate = (gateCoordinate, gateName) => {
    setMarkerCoordinate(gateCoordinate);
    setLocationAddress(gateName);
    setGate(gateName);
    setInitialRegion({
      ...gateCoordinate,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  // Save Post to Firebase Firestore
  const savePost = async () => {
    try {
      const user = auth.currentUser; // Get the current logged-in user
  
      if (!user) {
        Alert.alert('Error', 'No user logged in.');
        return;
      }
  
      const newPost = {
        position,
        perhrs: parseInt(perhrs),
        person: parseInt(person),
        sum: parseInt(sum),
        profileShop,
        gate,
        textdetail: textDetail,
        latitude: markerCoordinate?.latitude || '',
        longitude: markerCoordinate?.longitude || '',
        starttime: date.toLocaleDateString(),
        time: time.toLocaleTimeString(),
        userId: user.uid, // Store user ID
        userEmail: user.email, // Store user email
      };
  
      await addDoc(collection(db, 'blog'), newPost); // Add to 'blog' collection in Firestore
  
      Alert.alert('Success', 'Post saved successfully!');
  
      // Navigate to WorkScreenShop within ShopMainContainer
      navigation.navigate('ShopMainContainer', { screen: 'WorkShop' });
    } catch (error) {
      Alert.alert('Error', 'Failed to save post.');
      console.error(error);
    }
  };

  if (!initialRegion) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#F44948" />
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Ionicons name="cloud-upload-outline" size={40} color="gray" />
            <Text style={styles.uploadText}>Upload Profile Shop</Text>
          </View>
        )}
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="small" color="#F44948" />}

      <TextInput style={styles.input} placeholder="ตำแหน่งงาน" value={position} onChangeText={setPosition} />
      <TextInput style={styles.input} placeholder="รายชั่วโมง / รายวัน" value={perhrs} onChangeText={setPerHrs} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="รายได้รวม" value={sum} onChangeText={setSum} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="จำนวนคน" value={person} onChangeText={setPerson} keyboardType="numeric" />

      {/* Work Start Date */}
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputText}>{`วันที่เริ่มต้นทำงาน: ${date.toLocaleDateString()}`}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="calendar" onChange={(e, selectedDate) => { setShowDatePicker(false); setDate(selectedDate || date); }} />
      )}

      {/* Work Time */}
      <View style={styles.timeContainer}>
        <Text style={styles.inputText}>{`เวลาเข้างาน: ${time.toLocaleTimeString()}`}</Text>
        <TouchableOpacity style={styles.timePicker} onPress={() => setShowTimePicker(true)}>
          <Text>เลือกเวลา</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker value={time} mode="time" display="spinner" onChange={(e, selectedTime) => { setShowTimePicker(false); setTime(selectedTime || time); }} />
        )}
      </View>

      <MapView style={styles.map} onPress={handleMapPress} initialRegion={initialRegion} region={initialRegion}>
        {markerCoordinate && <Marker coordinate={markerCoordinate} title="Selected Location" description={locationAddress || 'Fetching address...'} />}
      </MapView>

      <View style={styles.gateSelection}>
        <TouchableOpacity style={styles.gateButton} onPress={() => selectGate(GATE_1_COORDINATE, 'ประตู 1')}>
          <Text style={styles.gateButtonText}>ประตู 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gateButton} onPress={() => selectGate(GATE_4_COORDINATE, 'ประตู 4')}>
          <Text style={styles.gateButtonText}>ประตู 4</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="ที่ตั้ง" value={locationAddress} onChangeText={setLocationAddress} />
      <TextInput style={styles.input} placeholder="ข้อมูลเพิ่มเติม" value={textDetail} onChangeText={setTextDetail} multiline={true} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => Alert.alert('Cancelled')}>
          <Text style={styles.buttonText}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={savePost}>
          <Text style={styles.buttonText}>โพสต์งาน</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', height: 60 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileImage: {
    width: '100%',
    height: 250,
    borderRadius: 25,
  },
  uploadPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  uploadText: {
    marginTop: 10,
    color: 'gray',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  datePicker: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timePicker: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  gateSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  gateButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
  },
  gateButtonText: {
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  postButton: {
    backgroundColor: '#F44948',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PostScreen;
