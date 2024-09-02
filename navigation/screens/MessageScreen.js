import * as React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen({ navigation }) {  // Corrected function name
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigation('Message')}  // Changed curly braces to parentheses
                style={{ fontSize: 26, fontWeight: 'bold' }}> 
                Message Screen
            </Text>
        </View>
    );
}