import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../theme'; // Import the theme file

const CustomText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.regular, // Apply regular font by default
  },
});

export default CustomText;
