import * as React from 'react';
import { View, ScrollView, StyleSheet, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import Box from '../../component/Box';
import ImageSlider from '../../component/ImageSlider';
import BtnDay from '../../component/BtnDay';
import HeaderBarShop from '../../component/HeaderBarShop';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function HomeScreenShop({ navigation }) {
    return (
        <View style={styles.container}>
            <HeaderBarShop navigation={navigation} />
            <View style={styles.sliderContainer}>
                <ImageSlider />
            </View>
            <View style={styles.boxContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('PostScreen')}>
                        <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.addButtonText}>เพิ่มงาน</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sliderContainer: {
        flex: 2,
    },
    boxContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    scrollViewContainer: {
        padding: 10,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#F18180',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontFamily: 'SUT_Bold', 
        fontSize: 25,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});
