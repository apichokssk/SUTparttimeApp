import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginSignUp({ navigation }) {
    const [isLogin, setIsLogin] = useState(true); // ใช้ state เพื่อสลับระหว่าง Login และ Sign Up
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userType, setUserType] = useState('นักศึกษา');  // ใช้สำหรับเลือกประเภทผู้ใช้

    const handleLogin = () => {
        console.log('Email:', email, 'Password:', password);
        navigation.navigate('MainContainer');
    };

    const handleSignUp = () => {
        console.log('Username:', username, 'Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword, 'User Type:', userType);

        // แสดง Alert เมื่อลงทะเบียนสำเร็จ
        Alert.alert(
            'ลงทะเบียนสำเร็จ',
            'คุณลงทะเบียนสำเร็จ!',
            [
                { text: 'ตกลง', onPress: () => setIsLogin(true) } // เมื่อกด 'ตกลง' กลับไปหน้า Login
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            {/* ส่วนโลโก้ด้านบน */}
            <View style={styles.logoTopContainer}>
                <Image source={require('./img2/SUT.png')} style={styles.logoTop} />
            </View>

            {/* กล่องสำหรับฟอร์ม Login และ Sign Up */}
            <View style={styles.formContainer}>
                {/* ปุ่ม Login และ Sign Up */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, isLogin ? styles.activeTab : null]}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={isLogin ? styles.tabText : styles.tabTextInactive}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, !isLogin ? styles.activeTab : null]}
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={!isLogin ? styles.tabText : styles.tabTextInactive}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* ฟอร์มสำหรับ Login */}
                {isLogin ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, styles.passwordInput]}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={!passwordVisible}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        {/* ปุ่มเลือกประเภทผู้ใช้ */}
                        <View style={styles.userTypeContainer}>
                            <TouchableOpacity
                                style={[styles.userTypeButton, userType === 'นักศึกษา' ? styles.activeUserTypeButton : null]}
                                onPress={() => setUserType('นักศึกษา')}
                            >
                                <Text style={userType === 'นักศึกษา' ? styles.activeUserTypeText : styles.userTypeText}>นักศึกษา</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.userTypeButton, userType === 'ร้านค้า' ? styles.activeUserTypeButton : null]}
                                onPress={() => setUserType('ร้านค้า')}
                            >
                                <Text style={userType === 'ร้านค้า' ? styles.activeUserTypeText : styles.userTypeText}>ร้านค้า</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, styles.passwordInput]}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={!passwordVisible}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            secureTextEntry={!passwordVisible}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                            <Text style={styles.loginButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </>
                )}
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
        marginTop: -20,
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 15,
    },
    eyeIcon: {
        padding: 10,
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
    userTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    userTypeButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },
    activeUserTypeButton: {
        backgroundColor: '#F44948',
    },
    userTypeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#aaa',
    },
    activeUserTypeText: {
        color: '#fff',
    },
});
