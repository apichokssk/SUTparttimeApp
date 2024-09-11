import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, db } from './firebase';  // Import Firebase authentication and Firestore
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, query, where, collection } from 'firebase/firestore'; // For querying Firestore

export default function LoginSignUp({ navigation }) {
    const [isLogin, setIsLogin] = useState(true);  // Default to Login mode
    const [username, setUsername] = useState('');  // Store the username (for login)
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Login with Username and Password
    const handleLogin = async () => {
        try {
            // Query Firestore to find the email associated with the provided username
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Alert.alert('Error', 'Username does not exist!');
                return;
            }

            // Extract the user's email from the query result
            let email = '';
            querySnapshot.forEach((doc) => {
                email = doc.data().email;
            });

            // Use the email to log the user in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);

            // Navigate to the main container
            navigation.navigate('MainContainer');
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Error', 'Login failed. Please check your credentials.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoTopContainer}>
                <Image source={require('./img2/SUT.png')} style={styles.logoTop} />
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                {/* Login Form */}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
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
                        <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
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
});
