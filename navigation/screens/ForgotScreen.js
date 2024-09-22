import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons for the email icon
import { sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase function
import { auth } from '../../firebase'; // Your Firebase auth instance

const ForgotScreen = () => {
  const [email, setEmail] = useState('');

  const forgotPassword = () => {
    // Validate email
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    // Firebase function to send a password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Success', 'Password reset link sent to ' + email);
        Keyboard.dismiss(); // Dismiss the keyboard after the action
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode + ': ' + errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      {/* Top Red Background with Logo */}
      <View style={styles.redBackground}>
        <Image
          source={require('./img2/newlogo.png')} // Replace with your logo file
          style={styles.logo}
        />
      </View>

      {/* White Card with Title, Email Input, and Send Button */}
      <View style={styles.card}>
        <Text style={styles.title}>Reset your password</Text>

        {/* Email Input with Icon */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="gray" style={styles.emailIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.button} onPress={forgotPassword}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Image */}
      <Image
        source={require('./img2/p.png')} // Replace with your footer image
        style={styles.footerImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  redBackground: {
    backgroundColor: '#F94144',
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logo: {
    width: 310,
    height: 150,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
    width: '85%',
  },
  emailIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F94144',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerImage: {
    width: '90%',
    height: 320,
    resizeMode: 'contain',
    marginTop: -50,
  },
});

export default ForgotScreen;
