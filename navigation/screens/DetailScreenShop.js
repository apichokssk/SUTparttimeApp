import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';  // ใช้สำหรับแผนที่

export default function DetailScreenShop() {
    const [animationVisible, setAnimationVisible] = useState(false);  // สถานะสำหรับแสดงอนิเมชั่น
    const [fadeAnim] = useState(new Animated.Value(0));  // สร้างค่า fade เริ่มต้น

    // ฟังก์ชันเพื่อแสดง alert
    const showAlert = () => {
        Alert.alert(
            "ยืนยันการสมัคร",  // หัวข้อ
            "คุณจะยืนยันการสมัครใช่ไหม",  // ข้อความในกล่องแจ้งเตือน
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
                        startAnimation();  // เรียกใช้งานอนิเมชั่นเมื่อกด "ยืนยัน"
                    }
                }
            ]
        );
    };

    // ฟังก์ชันเพื่อเริ่มอนิเมชั่น
    const startAnimation = () => {
        setAnimationVisible(true);  // แสดงอนิเมชั่น
        Animated.timing(fadeAnim, {
            toValue: 1, // ทำให้มองเห็น
            duration: 500, // ระยะเวลาในการแสดงอนิเมชั่น
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0, // ทำให้โปร่งใสหายไป
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    setAnimationVisible(false);  // ซ่อนอนิเมชั่นหลังจาก 2 วินาที
                });
            }, 2000);  // แสดงผล 2 วินาทีแล้วจึงซ่อน
        });
    };

    return (
        <ScrollView style={styles.container}>
            {/* รูปภาพร้าน */}
            <Image
                source={require('./img2/pd.jpg')}  // แทนที่ด้วยรูปภาพร้านของคุณ
                style={styles.shopImage}
            />
            
            {/* รายละเอียดร้าน */}
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

            {/* รายละเอียดอื่น ๆ */}
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

            {/* แผนที่ */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 14.8802,  // ค่า latitude, longitude ของตำแหน่งที่ต้องการ
                    longitude: 102.0154,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{ latitude: 14.8802, longitude: 102.0154 }}  // ตำแหน่งแผนที่
                    title="ร้านอะเเดพแมน สาขา มทส."
                />
            </MapView>

            {/* ข้อมูลเพิ่มเติม */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ข้อมูลเพิ่มเติม</Text>
                <Text>สวัสดิการ: เข้างานไม่เกิน 22.00 คืนวันที่ 3 สิงหาคม</Text>
                <Text>รายละเอียดบลาๆๆ</Text>
            </View>

            {/* อนิเมชั่นยืนยัน */}
            {animationVisible && (
                <Animated.View style={[styles.successOverlay, { opacity: fadeAnim }]}>
                <View style={styles.successContainer}>
                    {/* แสดงรูปภาพ */}
                    <Image source={require('./img2/accept.png')} style={styles.successImage} />
                    {/* แสดงข้อความ */}
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
        alignContent:'center'
    },
    successImage: {
        height:25,
        width:25
    },
    successContainer:{
        flexDirection:'row'
    },
});
