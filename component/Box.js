import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Box({ imgSource, textSource, navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailScreen')}>
            <View style={styles.container}>
                {/* ภาพอาหาร */}
                <Image source={imgSource} style={styles.image} />

                {/* ข้อมูลร้านอาหาร */}
                <View style={styles.infoSection}>
                    <Text style={styles.title}>
                        ร้านผัดไทย ประตู 4
                    </Text>
                    <View style={styles.infoContainer}>
                        <Ionicons name="time-outline" size={16} color="#fff" />
                        <Text style={styles.infoText}>
                            16:00-21:00 | ทำ 1 วัน
                        </Text>
                    </View>

                    {/* ราคาต่อชั่วโมง */}
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
        backgroundColor: '#F18180',  // สีพื้นหลังชมพู
        borderRadius: 20,
        height: 120,
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    infoSection: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 14,
    },
    priceContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    priceText: {
        color: '#F18180',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
