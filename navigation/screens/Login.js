import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = () => {
        console.log('Email:', email, 'Password:', password);
        navigation.navigate('MainContainer');  // เปลี่ยนจาก 'Home' เป็น 'MainContainer'
    };

    return (
        <View style={styles.container}>
            {/* ส่วนโลโก้ด้านบน */}
            <View style={styles.logoTopContainer}>
                <Image source={require('./img2/SUT.png')} style={styles.logoTop} />
            </View>

            {/* กล่องสำหรับฟอร์ม Login */}
            <View style={styles.formContainer}>
                {/* ปุ่ม Login และ Sign Up */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
                        <Text style={styles.tabText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabButton}>
                        <Text style={styles.tabTextInactive}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* ฟอร์ม Email */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* ฟอร์ม Password */}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]} // ใช้สไตล์ที่เหมือนกับ input ของ Email
                        placeholder="Password"
                        value={password}
                        secureTextEntry={!passwordVisible}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                        <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>


                {/* ลิงก์ Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* ปุ่ม Login */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* ภาพตกแต่งด้านล่าง */}
            <Image source={require('./img2/p.png')} style={styles.decorImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoTopContainer: {
        width: '100%',
        backgroundColor: '#F44948',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    logoTop: {
        width: 200,
        height: 120,
    },
    formContainer: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        alignItems: 'center',
        marginTop: -20,  // เดิมเป็น -80, ขยับลงมา 30px
    },
    
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tabButton: {
        paddingVertical: 10,
        width: '40%',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#F44948',
        borderRadius: 20,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    tabTextInactive: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#aaa',
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        width: '100%',
      },
      // สไตล์สำหรับ passwordContainer จะเหมือน input ของ Email
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
      },
      // ทำให้ช่อง Password เท่ากับช่อง Email
      passwordInput: {
        flex: 1,  // ขยายเต็มที่ตามช่องที่เหลือ
        paddingVertical: 15,  // ทำให้ช่องมีความสูงเท่ากับช่อง Email
      },
      // สไตล์สำหรับไอคอนตา (eye icon)
      eyeIcon: {
        padding: 10,  // เว้นระยะเพื่อไม่ให้ติดกับข้อความ
      },
    forgotPasswordText: {
        textAlign: 'right',
        marginBottom: 20,
        color: '#F44948',
    },
    loginButton: {
        backgroundColor: '#F44948',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    decorImage: {
        width: '90%',
        height: 320,
        resizeMode: 'contain',
        marginTop: -50, 
    },
    
});
