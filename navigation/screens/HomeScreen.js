import * as React from 'react';
import { View, Text, Image } from 'react-native';



export default function HomeScreen({ navigation }) {  // Corrected function name
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./img/padthai.png')}/>
        </View>
    );
}