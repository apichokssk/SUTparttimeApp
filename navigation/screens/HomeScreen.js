import * as React from 'react';
import { View, ScrollView, StyleSheet, Image, StatusBar } from 'react-native';
import Box from '../../component/Box';
import ImageSlider from '../../component/ImageSlider';
import BtnDay from '../../component/BtnDay';
import HeaderBar from '../../component/HeaderBar'; // Import the HeaderBar

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Add HeaderBar at the top */}
            <HeaderBar navigation={navigation} />

            <View style={styles.sliderContainer}>
                <ImageSlider />
            </View>
            <View style={{flex: 1,}}> 
                <BtnDay />
            </View>
            <View style={styles.boxContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <Box imgSource={require('./img2/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                    <Box imgSource={require('./img2/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                    <Box imgSource={require('./img2/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                    <Box imgSource={require('./img2/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                    <Box imgSource={require('./img2/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    sliderContainer: {
        flex: 2,
    },
    boxContainer: {
        flex: 4,
    },
    scrollViewContainer: {
        padding: 10,
    },
});