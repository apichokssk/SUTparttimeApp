import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const EditProFileScreen = ({ navigation }) => {
  // กำหนดสถานะสำหรับการแก้ไขฟอร์ม
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleCancel = () => {
    // กลับไปหน้า ProfileScreen เมื่อกดยกเลิก
    navigation.goBack();
  };

  const handleSave = () => {
    // การบันทึกข้อมูล (เชื่อมต่อกับ backend หรือบันทึกใน state)
    console.log('Saved', { firstName, lastName, phone });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./img2/tiw.png')}  // ใช้ภาพโปรไฟล์ที่คุณมี
        style={styles.profileImage}
      />
      <Text style={styles.profileID}>ID: 00001</Text>

      {/* ฟอร์มสำหรับกรอกข้อมูล */}
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

      {/* ปุ่มยกเลิกและบันทึก */}
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

export default EditProFileScreen;
