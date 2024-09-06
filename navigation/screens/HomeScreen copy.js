import * as React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import Box from '../../component/Box';

export default function HomeScreen({ navigation }) {
    return (
        



        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../../img/proF2.png')} style={styles.headerImage}/>
            <View style={styles.boxContainer}>
                <Box imgSource={require('./img/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                <Box imgSource={require('./img/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                <Box imgSource={require('./img/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                <Box imgSource={require('./img/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                <Box imgSource={require('./img/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 230,
    },
    boxContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        width: '100%',
        padding: 10,
    },
});
