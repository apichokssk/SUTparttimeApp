import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const DetailScreen = ({ route }) => {
    const { imgSource, textSource, time, gate, person, nameshop, position, sum, textdetail, latitude, longitude, postId ,firstname,lastname} = route.params;

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isPendingApproval, setIsPendingApproval] = useState(false);
    const [profile, setProfilePic] = useState(null); // State สำหรับเก็บภาพโปรไฟล์ผู้ใช้
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Check if the user already applied for the post
    const checkIfAlreadyApplied = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const appliedPosts = userDoc.data().appliedPosts || [];
                    if (appliedPosts.includes(postId)) {
                        setIsPendingApproval(true);
                    }

                    // ดึงข้อมูลผู้ใช้ที่เกี่ยวข้อง เช่น profile, firstname, lastname
                    const profilePicture = userDoc.data().profile || null;
                    setProfilePic(profilePicture); // ตั้งค่ารูปโปรไฟล์ใน state
                }
            }
        } catch (error) {
            console.error("Error checking applied posts: ", error);
        }
    };

    useEffect(() => {
        checkIfAlreadyApplied();
    }, []);

    const handleApplyJob = async () => {
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
                    onPress: async () => {
                        try {
                            const user = auth.currentUser;
                            if (!user) {
                                Alert.alert('Error', 'User not logged in');
                                return;
                            }
    
                            // Fetch user data from Firestore
                            const userDoc = await getDoc(doc(db, 'users', user.uid));
                            if (!userDoc.exists()) {
                                Alert.alert('Error', 'User data not found');
                                return;
                            }
    
                            const userData = userDoc.data();
    
                            // Add applicant data to Firestore, use the correct field names from Firestore
                            await addDoc(collection(db, 'applicant'), {
                                uid: user.uid,
                                email: user.email,
                                firstName: userData.firstName || 'Unknown',  // Correct field name
                                lastName: userData.lastName || 'Unknown',    // Correct field name
                                phone: userData.phone || 'Unknown',
                                profile: userData.profile || '', // User profile picture
                                status: 'รออนุมัติ',
                                postId: postId,
                                nameshop: nameshop, // Shop name
                            });
    
                            // Add postId to the user's appliedPosts array
                            const userRef = doc(db, 'users', user.uid);
                            await updateDoc(userRef, {
                                appliedPosts: arrayUnion(postId)
                            });
    
                            setIsPendingApproval(true); // Set the button status to pending approval
    
                            setShowConfirmation(true);
                            Animated.timing(fadeAnim, {
                                toValue: 1,
                                duration: 500,
                                useNativeDriver: true
                            }).start();
    
                            setTimeout(() => {
                                Animated.timing(fadeAnim, {
                                    toValue: 0,
                                    duration: 500,
                                    useNativeDriver: true
                                }).start(() => setShowConfirmation(false));
                            }, 1500);
                        } catch (error) {
                            console.error("Error applying for the job: ", error);
                        }
                    }
                }
            ]
        );
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
                            style={[styles.applyButton, isPendingApproval && styles.pendingButton]}
                            onPress={handleApplyJob}
                            disabled={isPendingApproval}
                        >
                            <Text style={styles.applyButtonText}>
                                {isPendingApproval ? 'รออนุมัติ' : 'สมัครงาน'}
                            </Text>
                        </TouchableOpacity>

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
    profilePicContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#F18180',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10,
    },
    pendingButton: {
        backgroundColor: '#FFA500',
    },
    applyButtonText: {
        fontFamily: 'SUT_Bold',
        color: '#fff',
        fontSize: 20,
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
