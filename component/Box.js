import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, getDoc, sum } from 'firebase/firestore';
import { db } from '../firebase'; // แน่ใจว่า path Firebase setup ถูกต้อง

export default function Box({ imgSource, textSource, time, gate, person, navigation, userId, position, postId,textdetail,sum }) {
    const [nameshop, setNameshop] = useState('Unknown Shop'); // Default to 'Unknown Shop'
    const [userData, setUserData] = useState(null); // ใช้เก็บข้อมูลผู้ใช้ทั้งหมด

    // ดึงชื่อร้านจาก collection 'users' ตาม userId
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
                imgSource, // ส่งข้อมูลรูปภาพ
                textSource, // ส่งข้อมูลค่าจ้างต่อชั่วโมง
                time, // ส่งข้อมูลเวลาเข้างาน
                gate, // ส่งข้อมูลประตู
                person, // ส่งจำนวนวันทำงาน
                nameshop, // ส่งชื่อร้าน
                position, // ส่งตำแหน่งงาน
                postId, // ส่ง postId เพื่อดึงข้อมูลโพสต์เพิ่มเติม
                textdetail, // Ensure this is passed correctly
                sum,
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
                            {time} | ทำ {person} วัน
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
