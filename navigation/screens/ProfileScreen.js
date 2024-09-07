import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ProfileScreen = () => {
  const navigation = useNavigation();  // ใช้ navigation เพื่อนำทาง

  const goToEditProfile = () => {
    navigation.navigate('EditProFileScreen');  // นำทางไปยังหน้า EditProFileScreen
  };

  const handleLogout = () => {
    // แสดง Alert ยืนยันการออกจากระบบ
    Alert.alert(
      'ยืนยันออกจากระบบ',  // หัวข้อ Alert
      'คุณต้องการออกจากระบบใช่ไหม?',  // ข้อความใน Alert
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('ยกเลิกการออกจากระบบ'),
          style: 'cancel',  // สไตล์ปุ่มยกเลิก
        },
        {
          text: 'ยืนยัน',
          onPress: () => {
            // เมื่อกดยืนยัน ให้นำทางไปหน้า Login
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }  // ทำให้ Alert ยกเลิกได้ด้วยการกดนอกกรอบ
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {/* ภาพโปรไฟล์ */}
        <Image
          source={require('./img2/tiw.png')}  // ใช้ภาพโปรไฟล์ที่คุณมี
          style={styles.profileImage}
        />
        {/* ข้อมูลโปรไฟล์ */}
        <View style={styles.profileDetails}>
          <Text style={styles.profileID}>ID: 00001</Text>
          <Text style={styles.profileName}>FirstName</Text>
          <Text style={styles.profileLastName}>LastName</Text>
          <Text style={styles.profilePhone}>tel: 0XX-XXX-XXXX</Text>

          {/* ปุ่มแก้ไข */}
          <TouchableOpacity style={styles.editButton} onPress={goToEditProfile}>
            <Text style={styles.editButtonText}>แก้ไข</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ปุ่ม Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>LogOut</Text>
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
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileLastName: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  profilePhone: {
    fontSize: 16,
    color: '#fff',
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
    backgroundColor: '#F44948',  // ใช้สีแดงตามภาพ
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,  // ทำให้ปุ่มมีลักษณะโค้งมนตามภาพ
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
