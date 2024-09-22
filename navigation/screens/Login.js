import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';  // Ensure correct path to firebase.js
import { setDoc, doc, getDoc } from 'firebase/firestore';  // Firestore functions

export default function LoginSignUp({ navigation }) {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between Login and Sign Up
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userType, setUserType] = useState('นักศึกษา', 'ร้านค้า');  // User type selection

    // Handle user login
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

            if (userDoc.exists()) {
                const userType = userDoc.data().userType;
                if (userType === 'นักศึกษา') {
                    Alert.alert('Success', 'Login successful!');
                    navigation.navigate('MainContainer'); // Navigate to MainContainer for นักศึกษา
                } else if (userType === 'ร้านค้า') {
                    Alert.alert('Success', 'Login successful!');
                    navigation.navigate('ShopMainContainer'); // Navigate to ShopMainContainer for ร้านค้า
                } else {
                    Alert.alert('Error', 'Unknown user type!');
                }
            } else {
                console.log('No such document!');
                Alert.alert('Error', 'No user data found!');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            Alert.alert('Error', `Login failed: ${error.message}`);
        }
    };

    // Handle user registration
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        try {
            // Create a new user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save additional user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                email: user.email,
                userType: userType  // Save the selected user type (นักศึกษา/ร้านค้า)
            });

            Alert.alert('Success', 'Registration successful!', [
                { text: 'OK', onPress: () => setIsLogin(true) }  // Go to login after registration
            ]);
        } catch (error) {
            console.error('Registration failed:', error.message);
            Alert.alert('Error', `Registration failed: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoTopContainer}>
                <Image source={require('./img2/newlogo.png')} style={styles.logoTop} />
            </View>

            {/* Form container */}
            <View style={styles.formContainer}>
                {/* Tabs to switch between Login and Sign Up */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, isLogin ? styles.activeTab : null]}
                        onPress={() => setIsLogin(true)}  // Switch to Login form
                    >
                        <Text style={isLogin ? styles.tabText : styles.tabTextInactive}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, !isLogin ? styles.activeTab : null]}
                        onPress={() => setIsLogin(false)}  // Switch to Sign Up form
                    >
                        <Text style={!isLogin ? styles.tabText : styles.tabTextInactive}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Show Login Form if isLogin is true */}
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
                        <TouchableOpacity onPress={() => {
                            console.log('Forgot Password pressed');  // Check if this is triggered
                            navigation.navigate('ForgotScreen');
                        }}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        {/* Show Sign Up Form if isLogin is false */}
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

            {/* Decorative Image */}
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
        width: 320,
        height: 150,
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
        fontSize: 25,
        fontFamily: 'SUT_Bold',
        color: '#fff',
    },
    tabTextInactive: {
        fontSize: 25,
        fontFamily: 'SUT_Bold',
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
        fontSize: 20,
        fontFamily: 'SUT_Bold',
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
        fontSize: 25,
        fontFamily: 'SUT_Bold',
    },
    decorImage: {
        width: '90%',
        height: 320,
        resizeMode: 'contain',
        marginTop: -50,
    },
    userTypeText: {
        fontSize: 25,
        fontFamily: 'SUT_Bold',
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
        fontSize: 25,
        fontFamily: 'SUT_Bold',
    },
    userTypeText: {
        fontSize: 25,
        fontFamily: 'SUT_Bold',
        color: '#aaa',
    },
    activeUserTypeText: {
        color: '#fff',
    },
});
