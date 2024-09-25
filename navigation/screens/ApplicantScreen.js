import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc, getDoc, arrayRemove, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path to your Firebase setup
import HeaderBarShop from '../../component/HeaderBarShop';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ApplicantScreen({ route, navigation }) {
    const { postId } = route.params;

    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch applicants for the given postId
    const fetchApplicants = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'applicant'), where('postId', '==', postId));
            const querySnapshot = await getDocs(q);

            const fetchedApplicants = [];
            querySnapshot.forEach((doc) => {
                fetchedApplicants.push({ id: doc.id, ...doc.data() });
            });

            setApplicants(fetchedApplicants);
        } catch (error) {
            console.log('Error fetching applicants:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    const handleApplicantDecision = async (applicantId, applicantData, decision) => {
        try {
            const applicantRef = doc(db, 'applicant', applicantId);

            // If approved, move the applicant data and post data to `employee`
            if (decision === 'approve') {
                // Get the post data
                const postRef = doc(db, 'blog', postId);  // Assuming postId refers to a post in 'blog' collection
                const postDoc = await getDoc(postRef);
                const postData = postDoc.exists() ? postDoc.data() : null;

                if (postData) {
                    // Create a new document in `employee` with the same `id` as the `applicantId`
                    const employeeRef = doc(db, 'employee', applicantId); // Manually setting the ID to match applicantId

                    // Set the data in `employee` collection with the same ID as applicantId
                    await setDoc(employeeRef, {
                        ...applicantData,  // Applicant data
                        ...postData,       // Post data
                        status: 'ผ่าน',     // Status as 'approved'
                        approvedAt: new Date().toISOString(), // Track approval time
                    });

                    // Remove the applicant from the applicant collection after moving
                    await deleteDoc(applicantRef);

                    // Remove the postId from the appliedPosts array in the user's document
                    const userRef = doc(db, 'users', applicantData.uid);
                    await updateDoc(userRef, {
                        appliedPosts: arrayRemove(postId)
                    });
                }
            } else {
                // For rejected applicants, just remove them
                await deleteDoc(applicantRef);
            }

            Alert.alert(
                "อนุมัติแล้ว",
                `ผู้สมัคร ${applicantData.firstName} ${applicantData.lastName} สถานะ ${decision === 'approve' ? 'ผ่าน' : 'ไม่ผ่าน'}.`
            );

            fetchApplicants(); // Refresh the data after action
        } catch (error) {
            console.error('Error updating applicant status:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#F44948" />
                <Text>กำลังโหลดข้อมูลผู้สมัคร...</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <HeaderBarShop navigation={navigation} />
            <Text style={styles.title}>รายชื่อผู้สมัคร</Text>

            <ScrollView contentContainerStyle={styles.centeredContainer}>
                {applicants.length === 0 ? (
                    <Text style={styles.noApplicantsText}>ไม่มีผู้สมัครสำหรับโพสต์นี้</Text>
                ) : (
                    applicants.map((applicant) => (
                        <View key={applicant.id} style={styles.applicantContainer}>
                            {/* Display applicant profile image */}
                            <Image
                                source={{ uri: applicant.profile || 'https://example.com/placeholder.png' }} // Show placeholder if no profile
                                style={styles.applicantImage}
                            />

                            {/* Applicant Info */}
                            <View style={styles.applicantInfoContainer}>
                                <Text style={styles.applicantName}>{applicant.firstName} {applicant.lastName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name="at-circle" size={20} color="gray" />
                                    <Text style={styles.applicantInfo}> {applicant.email}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <Ionicons name="call" size={16} color="gray" />
                                    <Text style={styles.applicantInfo}> {applicant.phone}</Text>
                                </View>
                                {/* Approve/Reject Buttons */}
                                <TouchableOpacity
                                    style={[styles.approveButton, applicant.status === 'ผ่าน' && styles.passedButton]}
                                    onPress={() => handleApplicantDecision(applicant.id, applicant, 'approve')}
                                    disabled={applicant.status === 'ผ่าน'}
                                >
                                    <Text style={[styles.approveButtonText, applicant.status === 'ผ่าน' && styles.passedButtonText]}>
                                        {applicant.status === 'ผ่าน' ? 'ผ่าน' : 'อนุมัติ'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.rejectButton, applicant.status === 'ไม่ผ่าน' && styles.rejectedButton]}
                                    onPress={() => handleApplicantDecision(applicant.id, applicant, 'reject')}
                                    disabled={applicant.status === 'ไม่ผ่าน'}
                                >
                                    <Text style={[styles.rejectButtonText, applicant.status === 'ไม่ผ่าน' && styles.rejectedButtonText]}>
                                        {applicant.status === 'ไม่ผ่าน' ? 'ไม่ผ่าน' : 'ปฏิเสธ'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: 'SUT_Bold',
        marginTop: 10,
        textAlign: 'center',
    },
    applicantContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFE2E2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    applicantInfoContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    applicantName: {
        fontSize: 18,
        fontFamily: 'SUT_Bold',
        marginBottom: 5,
    },
    applicantInfo: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'SUT_Bold',
    },
    noApplicantsText: {
        fontSize: 18,
        color: '#555',
        fontFamily: 'SUT_Bold',
        textAlign: 'center',
        marginTop: 20,
    },
    applicantImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    approveButton: {
        backgroundColor: '#FFA5A5',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    passedButton: {
        backgroundColor: 'green',
    },
    approveButtonText: {
        fontFamily: 'SUT_Bold',
        fontSize: 20,
        color: '#fff',
    },
    passedButtonText: {
        color: '#fff',
    },
    rejectButton: {
        backgroundColor: '#ff5c5c',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    rejectedButtonText: {
        fontFamily: 'SUT_Bold',
        fontSize: 20,
        color: '#fff',
    },
    rejectedButton: {
        backgroundColor: '#B22222',
    },
});
