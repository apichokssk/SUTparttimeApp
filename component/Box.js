import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Box({ imgSource, textSource, navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailScreen')}>
            <View style={styles.container}>
                <View>
                    <Image source={imgSource} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.title}>
                        ร้านผัดไทย ประตู 4
                    </Text>
                    <View style={styles.infoContainer}>
                        <Ionicons name="time-outline" size={24} color="#fff" />
                        <Text style={styles.infoText}>
                            16:00-21:00 | ทำ 1 วัน
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>
                            {textSource}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F18180',
        borderRadius: 20,
        height: 150,
        width: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        
    },
    image: {
        width: 150,
        height: 130,
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'SUT_Regular', // ใช้ฟอนต์ที่ถูกโหลด
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        color: '#fff',
        marginLeft: 5,
    },
    priceContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#fff',
        padding: 5,
        marginTop: 5,
    },
    priceText: {
        color: '#F18180',
        fontWeight: 'bold',
    },
});
