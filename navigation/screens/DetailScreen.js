import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function DetailScreen() {
    const [animationVisible, setAnimationVisible] = useState(false);  // State for animation visibility
    const [fadeAnim] = useState(new Animated.Value(0));  // Starting value for fade animation

    // Function to show an alert
    const showAlert = () => {
        Alert.alert(
            "ยืนยันการสมัคร",  // Alert title
            "คุณจะยืนยันการสมัครใช่ไหม",  // Alert message
            [
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("การสมัครถูกยกเลิก"),
                    style: "cancel"
                },
                {
                    text: "ยืนยัน",
                    onPress: () => {
                        console.log("การสมัครสำเร็จ");
                        startAnimation();  // Start animation when "ยืนยัน" (Confirm) is pressed
                    }
                }
            ]
        );
    };

    // Function to start the success animation
    const startAnimation = () => {
        setAnimationVisible(true);  // Show animation
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade in
            duration: 500, // Animation duration
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0, // Fade out
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    setAnimationVisible(false);  // Hide animation after 2 seconds
                });
            }, 2000);  // Animation will be visible for 2 seconds
        });
    };

    return (
        <ScrollView style={styles.container}>
            {/* Shop Image */}
            <Image
                source={require('./img2/pd.jpg')}  // Replace with your shop's image
                style={styles.shopImage}
            />
            
            {/* Shop Details */}
            <View style={styles.detailContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>ร้านอะเเดพแมน สาขา มทส.</Text>
                    <TouchableOpacity style={styles.applyButton} onPress={showAlert}>
                        <Text style={styles.applyButtonText}>สมัคร</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>📦</Text>
                        <Text>พนักงานคลังสินค้า</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💵</Text>
                        <Text>รายได้: ...... / ชั่วโมง</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💼</Text>
                        <Text>รายได้รวม: ......</Text>
                    </View>
                </View>
            </View>

            {/* Other Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>รายละเอียด</Text>
                <View style={styles.infoRow}>
                    <Text>วัน</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>เวลา</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>ขอบเขตการทำงาน</Text>
                </View>
            </View>

            {/* Map Section */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 14.8802,  // Latitude and longitude of the location
                    longitude: 102.0154,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{ latitude: 14.8802, longitude: 102.0154 }}  // Marker position
                    title="ร้านอะเเดพแมน สาขา มทส."
                />
            </MapView>

            {/* Additional Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ข้อมูลเพิ่มเติม</Text>
                <Text>สวัสดิการ: เข้างานไม่เกิน 22.00 คืนวันที่ 3 สิงหาคม</Text>
                <Text>รายละเอียดบลาๆๆ</Text>
            </View>

            {/* Success Animation */}
            {animationVisible && (
                <Animated.View style={[styles.successOverlay, { opacity: fadeAnim }]}>
                <View style={styles.successContainer}>
                    {/* Success Image */}
                    <Image source={require('./img2/accept.png')} style={styles.successImage} />
                    {/* Success Text */}
                    <Text style={styles.successText}>การสมัครสำเร็จ!</Text>
                </View>
            </Animated.View>
            )}
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
    applyButton: {
        backgroundColor: '#FFC0CB',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    applyButtonText: {
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
        width: '100%',
        height: 300,
        marginVertical: 10,
    },
    successOverlay: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        right: '10%',
        backgroundColor: '#6ce600',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    successImage: {
        height: 25,
        width: 25,
    },
    successContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
