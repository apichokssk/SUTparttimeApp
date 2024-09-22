import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DetailScreen = ({ route }) => {
    const { imgSource, textSource, time, gate, person, nameshop, position, sum, textdetail, latitude, longitude } = route.params;

    const [showConfirmation, setShowConfirmation] = useState(false); // State to control the confirmation text
    const [isPendingApproval, setIsPendingApproval] = useState(false); // State to control button status
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for animation

    const handleApplyJob = () => {
        Alert.alert(
            "ยืนยันการสมัคร",
            "คุณต้องการสมัครงานนี้หรือไม่?",
            [
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("การสมัครถูกยกเลิก"),
                    style: "cancel"
                },
                {
                    text: "ยืนยัน",
                    onPress: () => {
                        setIsPendingApproval(true); // Set the button to pending status
                        setShowConfirmation(true);
                        // Animation to fade in the confirmation text
                        Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true
                        }).start();

                        // Hide the confirmation text after 1.5 seconds
                        setTimeout(() => {
                            Animated.timing(fadeAnim, {
                                toValue: 0,
                                duration: 500,
                                useNativeDriver: true
                            }).start(() => setShowConfirmation(false));
                        }, 1500);
                    }
                }
            ]
        );
    };

    const handleCancelJob = () => {
        setIsPendingApproval(false); // Revert back to 'สมัครงาน'
    };

    return (
        <ScrollView style={styles.container}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image source={imgSource} style={styles.image} />
            </View>

            {/* Details Section */}
            <View style={styles.detailContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={styles.title}>{nameshop} {gate}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.applyButton, isPendingApproval && styles.pendingButton]} // Change button style
                            onPress={handleApplyJob}
                            disabled={isPendingApproval} // Disable the button if pending
                        >
                            <Text style={styles.applyButtonText}>
                                {isPendingApproval ? 'รออนุมัติ' : 'สมัครงาน'} {/* Change button text */}
                            </Text>
                        </TouchableOpacity>

                        {/* ปุ่มยกเลิก (แสดงเมื่อสถานะเป็นรออนุมัติ) */}
                        {isPendingApproval && (
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelJob}>
                                <Text style={styles.cancelButtonText}>ยกเลิก</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.icon}>📦</Text>
                    <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>ตำแหน่งงาน: {position}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.icon}>💵</Text>
                    <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>ค่าจ้าง: {textSource}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.icon}>💼</Text>
                    <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>รวม: {sum} บาท</Text>
                </View>
            </View>

            {/* Confirmation Message */}
            {showConfirmation && (
                <Animated.View style={[styles.confirmationBox, { opacity: fadeAnim }]}>
                    <Text style={styles.confirmationText}>คุณสมัครงานเรียบร้อยแล้ว</Text>
                </Animated.View>
            )}

            <View style={styles.detailsSection2}>
                <Text style={styles.title2}>รายละเอียด</Text>
                <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>จำนวนคน: {person} คน</Text>
                <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>เวลา: {time} น.</Text>
                <Text style={{ fontFamily: 'SUT_Regular', fontSize: 18 }}>งานที่มอบหมาย: {textdetail}</Text>
            </View>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: latitude || 14.8811,
                        longitude: longitude || 102.0155,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: latitude || 14.8811, longitude: longitude || 102.0155 }}
                        title={nameshop}
                    />
                </MapView>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 5,
    },
    detailsSection: {
        padding: 20,
        backgroundColor: '#FDD2D2',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    detailContainer: {
        padding: 20,
        backgroundColor: '#FDD2D2',
        borderRadius: 10,
        margin: 10,
    },
    detailsSection2: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    title: {
        marginBottom: 10,
        fontFamily: 'SUT_Bold',
        fontSize: 30,
    },
    title2: {
        marginBottom: 10,
        fontFamily: 'SUT_Bold',
        fontSize: 24,
    },
    mapContainer: {
        height: 200,
        marginHorizontal: 15,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row', // จัดปุ่มให้อยู่ในแนวนอน
        alignItems: 'center', // จัดให้อยู่ตรงกลางแนวตั้ง
    },
    applyButton: {
        backgroundColor: '#F18180', // สีของปุ่มสำหรับสมัครงาน
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10, // เพิ่มระยะห่างระหว่างปุ่มสมัครงานกับปุ่มยกเลิก
    },
    pendingButton: {
        backgroundColor: '#FFA500', // สีส้มสำหรับสถานะรออนุมัติ
    },
    applyButtonText: {
        fontFamily: 'SUT_Bold',
        color: '#fff',
        fontSize: 20,
    },
    cancelButton: {
        backgroundColor: '#ff5c5c', // สีแดงสำหรับปุ่มยกเลิก
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    cancelButtonText: {
        fontFamily: 'SUT_Bold',
        color: '#fff',
        fontSize: 18,
    },
    confirmationBox: {
        backgroundColor: '#D4EDDA',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    confirmationText: {
        fontFamily: 'SUT_Bold',
        color: '#155724',
        fontSize: 18,
    },
});

export default DetailScreen;
