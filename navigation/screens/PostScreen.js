import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Date Picker for selecting dates
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Import Location for user's current location
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker for selecting images
import { storage } from '../../firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage methods
import * as LocationReverseGeocode from 'expo-location'; // Import reverse geocoding

const PostScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState(null); // Store the selected marker coordinate
  const [locationAddress, setLocationAddress] = useState(''); // Store location address if needed
  const [initialRegion, setInitialRegion] = useState(null); // User's current location
  const [imageUri, setImageUri] = useState(null); // State to store selected image URI
  const [uploading, setUploading] = useState(false); // State for tracking image upload

  const GATE_1_COORDINATE = { latitude: 14.901235, longitude: 102.009467 };
  const GATE_4_COORDINATE = { latitude: 14.884229, longitude: 102.024803 };

  // Request permission to access location and set user's location as initial region
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

    getUserLocation(); // Fetch user's location when the component mounts
  }, []);

  // Handle image selection from the gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);  // Set the selected image URI
        uploadImage(result.assets[0].uri);  // Upload image to Firebase Storage
      }
    } catch (error) {
      Alert.alert('Error', 'Image selection failed.');
    }
  };

  // Function to upload image to Firebase
  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `profileshop/${new Date().getTime()}`);
      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      setImageUri(url);
      Alert.alert('Image uploaded successfully!');
    } catch (error) {
      Alert.alert('Upload failed', error.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle taps on the map to drop a marker and fetch the address
  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate); // Set marker to the tapped location

    try {
      let [address] = await LocationReverseGeocode.reverseGeocodeAsync(coordinate);
      setLocationAddress(`${address.street}, ${address.city}, ${address.region}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch address.');
    }
  };

  // Functions to handle date and time pickers
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  // Handle selecting a gate and updating the map
  const selectGate = async (gateCoordinate, gateName) => {
    setMarkerCoordinate(gateCoordinate);
    setLocationAddress(gateName);
    setInitialRegion({
      ...gateCoordinate,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
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
      {/* Upload Profile Shop */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />  // Show the selected image
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Ionicons name="cloud-upload-outline" size={40} color="gray" />
            <Text style={styles.uploadText}>Upload Profile Shop</Text>
          </View>
        )}
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="small" color="#F44948" />}

      {/* Job Title Input */}
      <TextInput style={styles.input} placeholder="ตำแหน่งงาน" />

      {/* Wage Type Input */}
      <TextInput style={styles.input} placeholder="รายชั่วโมง / รายวัน" />

      {/* Wage Amount Input */}
      <TextInput style={styles.input} placeholder="รายได้รวม" keyboardType="numeric" />

      {/* Vacancy Input */}
      <TextInput style={styles.input} placeholder="จำนวนคน" keyboardType="numeric" />

      {/* Work Start Date */}
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputText}>วันที่เริ่มต้นทำงาน</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={onDateChange}
        />
      )}

      {/* Work Time */}
      <View style={styles.timeContainer}>
        <Text style={styles.inputText}>เวลาเข้างาน</Text>
        <TouchableOpacity style={styles.timePicker} onPress={() => setShowTimePicker(true)}>
          <Text>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={onTimeChange}
          />
        )}
      </View>

      {/* Map with selectable location */}
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={initialRegion}  // Use the user's current location as the initial region
        region={initialRegion} // Keep updating the region as the user selects different gates
      >
        {/* Show the marker if a location is selected */}
        {markerCoordinate && (
          <Marker
            coordinate={markerCoordinate}
            title="Selected Location"
            description={locationAddress ? locationAddress : "Fetching address..."}
          />
        )}
      </MapView>

      {/* Gate Selection */}
      <View style={styles.gateSelection}>
        <TouchableOpacity style={styles.gateButton} onPress={() => selectGate(GATE_1_COORDINATE, 'ประตู 1')}>
          <Text style={styles.gateButtonText}>ประตู 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gateButton} onPress={() => selectGate(GATE_4_COORDINATE, 'ประตู 4')}>
          <Text style={styles.gateButtonText}>ประตู 4</Text>
        </TouchableOpacity>
      </View>

      {/* Location Address */}
      <TextInput style={styles.input} placeholder="ที่ตั้ง" value={locationAddress} />

      {/* Extra Details */}
      <TextInput style={styles.input} placeholder="ข้อมูลเพิ่มเติม" />

      {/* Description Text Area */}
      <TextInput style={[styles.input, { height: 100 }]} placeholder="รายละเอียดเพิ่มเติม" multiline={true} />

      {/* Cancel and Post Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
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
