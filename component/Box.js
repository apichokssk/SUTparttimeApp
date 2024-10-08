import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, getDoc, sum } from 'firebase/firestore';
import { db } from '../firebase'; // แน่ใจว่า path Firebase setup ถูกต้อง

export default function Box({ imgSource, textSource, time, gate, person, navigation, userId, position, postId, textdetail, sum, latitude, longitude }) {
    const [nameshop, setNameshop] = useState('Unknown Shop'); // Default to 'Unknown Shop'
    const [userData, setUserData] = useState(null); // ใช้เก็บข้อมูลผู้ใช้ทั้งหมด

    useEffect(() => {
        const fetchNameshop = async () => {
            if (!userId) return;

            try {
                const userDoc = doc(db, 'users', userId); // ดึงจาก 'users' collection
                const docSnapshot = await getDoc(userDoc);
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    setNameshop(userData.nameshop || 'Unknown Shop');
                    setUserData(userData); // เก็บข้อมูลผู้ใช้ทั้งหมด
                } else {
                    console.log('No such user!');
                }
            } catch (error) {
                console.error('Error fetching shop name:', error);
            }
        };

        fetchNameshop();
    }, [userId]);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', {
                imgSource,
                textSource,
                time,
                gate, 
                person, 
                nameshop, 
                position, 
                postId, 
                textdetail, 
                sum,
                latitude: latitude || 14.8811, 
                longitude: longitude || 102.0155, 
            })}

        >
            <View style={styles.container}>
                {/* ภาพสินค้า */}
                <Image source={imgSource} style={styles.image} />

                {/* ข้อมูลสินค้า */}
                <View style={styles.infoSection}>
                    <Text style={styles.title}>
                        {nameshop} {gate ? `(${gate})` : ''}
                    </Text>
                    <View style={styles.infoContainer}>
                        <Ionicons name="time-outline" size={16} color="#fff" />
                        <Text style={styles.infoText}>
                            {time} | จำนวน {person} คน
                        </Text>
                    </View>

                    {/* ค่าจ้างต่อชั่วโมง */}
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
        height: 120,
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        elevation: 5,
        fontFamily: 'SUT_Regular',
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10,
    },
    infoSection: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        fontFamily: 'SUT_Regular',
    },
    title: {
        fontSize: 25,
        fontFamily: 'SUT_Bold',
        color: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: -5,
        fontFamily: 'SUT_Regular',
    },
    infoText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 20,
        fontFamily: 'SUT_Regular',
    },
    priceContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontFamily: 'SUT_Regular',
    },
    priceText: {
        color: '#F18180',
        fontSize: 23,
        fontFamily: 'SUT_Bold',
    },
});
