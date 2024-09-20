import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Adjust your Firebase path
import { useNavigation } from '@react-navigation/native';  // Import navigation

export default function DetailScreenShop({ route }) {
    const { post } = route.params;  // Get the passed post data
    const [shopName, setShopName] = useState('');  // State for storing the shop name
    const navigation = useNavigation();  // Get navigation object

    // Fetch the shop name from Firestore
    useEffect(() => {
        const fetchShopName = async () => {
            try {
                const userRef = doc(db, 'users', post.userId);  // Reference to the user document
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setShopName(userDoc.data().nameshop || 'Unknown Shop');
                } else {
                    console.log('No such user document!');
                }
            } catch (error) {
                console.error('Error fetching shop name:', error);
            }
        };

        fetchShopName();
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
                            // ลบโพสต์จาก Firebase Firestore
                            await deleteDoc(doc(db, 'blog', post.id));
                            Alert.alert('ลบโพสต์สำเร็จ');
                            navigation.goBack(); // กลับไปยังหน้าก่อนหน้า
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
                source={{ uri: post.profileShop }}  // Display the shop's image from the post
                style={styles.shopImage}
            />

            {/* Shop Details */}
            <View style={styles.detailContainer}>
                <View style={styles.header}>
                    {/* Display nameshop instead of position */}
                    <Text style={styles.title}>{shopName} {post.gate}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={navigateToEditScreen}>
                        <Text style={styles.editButtonText}>แก้ไขโพสต์</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>📦</Text>
                        <Text>ตำแหน่งงาน: {post.position}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💵</Text>
                        <Text>ค่าจ้าง: {post.perhrs} / ชั่วโมง</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💼</Text>
                        <Text>รวม: {post.sum} บาท</Text>
                    </View>
                </View>
            </View>

            {/* Work Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>รายละเอียด</Text>
                <View style={styles.infoRow}>
                    <Text>จำนวนคน: {post.person} คน</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>เวลาเข้างาน: {post.time} น.</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>งานที่มอบหมาย: {post.textdetail}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#FFC0CB',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
        fontSize: 18,
        fontWeight: 'bold',
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
