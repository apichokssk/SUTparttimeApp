import * as React from 'react';
import { View, ScrollView, StyleSheet, Image, StatusBar } from 'react-native';
import Box from '../../component/Box';
import ImageSlider from '../../component/ImageSlider';
import BtnDay from '../../component/BtnDay';
import HeaderBarShop from '../../component/HeaderBarShop';
import CustomButton from '../../component/CustomBtn';

export default function HomeScreenShop({ navigation }) {
    return (
        <View style={styles.container}>
            <HeaderBarShop navigation={navigation} />
            <View style={styles.sliderContainer}>
                <ImageSlider />
            </View>
            <View style={{ flex: 1 }}> 
                <BtnDay />
            </View>
            <View style={styles.boxContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <CustomButton navigation={navigation}/>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        flex: 2,
    },
    boxContainer: {
        flex: 4,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    scrollViewContainer: {
        padding: 10,
    },
});
