import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // ฮุกสำหรับการนำทางที่ถูกต้อง

const CustomButton = () => {
  const navigation = useNavigation();  // ฮุกเพื่อเข้าถึงการนำทาง

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('PostScreen')}>
      <Text style={styles.buttonText}>เพิ่มงาน</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 120, 
    height: 120, 
    backgroundColor: '#ffeceb', 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CustomButton;
