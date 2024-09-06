import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // ใช้ useNavigation เพื่อเข้าถึง navigation

const HeaderBar = () => {
  const navigation = useNavigation(); // ใช้ useNavigation เพื่อให้เข้าถึง navigation ในทุกหน้าจอที่ใช้ HeaderBar

  const goToProfile = () => {
    navigation.navigate('ProfileScreen'); // นำทางไปยัง ProfileScreen
  };

  return (
    <View style={styles.container}>
      {/* โลโก้หรือชื่อด้านซ้าย */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={require('./img/SUT.png')} />
      </View>

      {/* ปุ่มค้นหา */}
      <View style={{ flex: 0.13 }}>
        <View style={styles.searchContainer}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Ionicons name="search" size={30} color="#fff" />
          </View>
        </View>
      </View>

      {/* เว้นระยะห่าง */}
      <View style={{ flex: 0.05 }} />

      {/* รูปภาพโปรไฟล์ */}
      <View style={{ flex: 0.25 }}>
        <TouchableOpacity onPress={goToProfile}>
          <Image
            source={require('./img/tiw.png')}
            style={{ width: 60, height: 60, borderRadius: 100 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F44948',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.17,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default HeaderBar;
