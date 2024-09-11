import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Date Picker for selecting dates
import { Ionicons } from '@expo/vector-icons';


const PostScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  
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

  return (
    <ScrollView style={styles.container}>
      {/* Upload Resume */}
      <TouchableOpacity style={styles.uploadResume}>
        <Ionicons name="cloud-upload-outline" size={30} color="gray" />
        <Text style={styles.uploadText}>Upload Resume</Text>
      </TouchableOpacity>

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

      {/* Break Time */}
      <Text style={styles.sectionHeader}>เวลาพัก</Text>
      <View style={styles.breakContainer}>
        <TouchableOpacity style={styles.breakButton}>
          <Text>1 ชม.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.breakButton}>
          <Text>2 ชม.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.breakButton}>
          <Text>3 ชม.</Text>
        </TouchableOpacity>
      </View>

      {/* Location */}
      <TextInput style={styles.input} placeholder="ที่ตั้ง" />
      {/* Google Map (Placeholder Image) */}
      <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.map} />

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
      <View style={{flex:1,backgroundColor:'yellow'}}>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  uploadResume: {
    backgroundColor: '#ffeceb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
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
  sectionHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  breakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  breakButton: {
    backgroundColor: '#ffeceb',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff8a80',
    width: '30%',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
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
