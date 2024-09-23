import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Adjust your Firebase path
import { useNavigation } from '@react-navigation/native';  // Import navigation

export default function DetailScreenShop({ route }) {
    const { post } = route.params;  // Get the passed post data
    const [shopName, setShopName] = useState('');  // State for storing the shop name
    const [shopPhone, setShopPhone] = useState('');  // State for storing the shop phone number
    const navigation = useNavigation();  // Get navigation object

    // Fetch the shop name and phone from Firestore
    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const userRef = doc(db, 'users', post.userId);  // Reference to the user document
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setShopName(userData.nameshop || 'Unknown Shop');
                    setShopPhone(userData.shopPhone || 'No Phone Number');
                } else {
                    console.log('No such user document!');
                }
            } catch (error) {
                console.error('Error fetching shop data:', error);
            }
        };

        fetchShopData();
    }, [post.userId]);

    const navigateToEditScreen = () => {
        // Navigate to the EditPostScreen, passing the post data
        navigation.navigate('EditPostScreen', { post });
    };

    // Function to delete the post
    const handleDeletePost = () => {
        Alert.alert(
            "ยืนยันการลบโพสต์",
            "คุณต้องการลบโพสต์นี้ใช่ไหม?",
            [
                {
                    text: "ยกเลิก",
                    style: "cancel"
                },
                {
                    text: "ยืนยัน",
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'blog', post.id));
                            Alert.alert('ลบโพสต์สำเร็จ');
                            navigation.goBack(); 
                        } catch (error) {
                            console.error('Error deleting post: ', error);
                            Alert.alert('เกิดข้อผิดพลาดในการลบโพสต์');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Shop Image */}
            <Image
                source={{ uri: post.profileShop }}
                style={styles.shopImage}
            />

            {/* Shop Details */}
            <View style={styles.detailContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{shopName} {post.gate}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={navigateToEditScreen}>
                        <Text style={styles.editButtonText}>แก้ไขโพสต์</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>📦</Text>
                        <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>ตำแหน่งงาน: {post.position}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💵</Text>
                        <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>ค่าจ้าง: {post.perhrs} / ชั่วโมง</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💼</Text>
                        <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>รวม: {post.sum} บาท</Text>
                    </View>
                </View>
            </View>

            {/* Work Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>รายละเอียด</Text>
                <View style={styles.infoRow}>
                    <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>จำนวนคน: {post.person} คน</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>เวลาเข้างาน: {post.time} น.</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>งานที่มอบหมาย: {post.textdetail}</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>เบอร์โทรร้านค้า: {shopPhone}</Text>
                </View>
            </View>

            {/* Map */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: post.latitude,
                    longitude: post.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{ latitude: post.latitude, longitude: post.longitude }}
                    title={post.position}
                />
            </MapView>

            {/* Delete Post Button */}
            <View style={styles.deleteButtonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePost}>
                    <Text style={styles.deleteButtonText}>ลบโพสต์</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    shopImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    detailContainer: {
        padding: 20,
        backgroundColor: '#FDD2D2',
        borderRadius: 10,
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: 'SUT_Bold',
    },
    editButton: {
        backgroundColor: '#FFC0CB',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#fff',
        fontFamily: 'SUT_Bold',
        fontSize: 20,
    },
    infoContainer: {
        marginTop: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'SUT_Bold',
        marginBottom: 10,
    },
    map: {
        width: '90%',
        height: 200,
        marginVertical: 10,
        alignSelf: 'center',
    },
    deleteButtonContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
