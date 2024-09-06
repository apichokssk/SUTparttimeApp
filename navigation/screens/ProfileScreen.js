import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ProfileScreen = () => {
  const navigation = useNavigation();  // ใช้ navigation เพื่อนำทาง

  const goToEditProfile = () => {
    navigation.navigate('EditProFileScreen');  // นำทางไปยังหน้า EditProFileScreen
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
});

export default ProfileScreen;
