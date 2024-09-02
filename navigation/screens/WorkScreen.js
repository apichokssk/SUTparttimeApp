import * as React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ navigation }) {  // Corrected function name
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigation('Home')}  // Changed curly braces to parentheses
                style={{ fontSize: 26, fontWeight: 'bold' }}> 
                Work Screen
            </Text>
        </View>
    );
}
