import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { doc, getDoc, updateDoc, arrayRemove, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Adjust the path to your Firebase setup
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBar from '../../component/HeaderBar';

export default function WorkScreen({ navigation }) {
    const [appliedPosts, setAppliedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);  // State for refresh control
    const [hasRefreshed, setHasRefreshed] = useState(false);  // State to track if refresh has been done once

    // Function to fetch applied posts
    const fetchAppliedPosts = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log('No user is logged in');
                setLoading(false);
                return;
            }

            // Fetch user's applied posts
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                console.log('User document does not exist');
                setLoading(false);
                return;
            }

            const userAppliedPosts = userDoc.data().appliedPosts || [];
            console.log('User applied posts:', userAppliedPosts); // Debugging applied posts

            if (userAppliedPosts.length === 0) {
                console.log('No applied posts');
                setLoading(false);
                return;
            }

            // Fetch details of applied posts from the 'blog' collection
            const appliedPostsData = [];
            for (const postId of userAppliedPosts) {
                const postDoc = await getDoc(doc(db, 'blog', postId));
                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    const ownerId = postData.userId; // Assuming the post data has userId of the owner of the shop

                    // Fetch the nameshop from the user's document
                    const ownerDoc = await getDoc(doc(db, 'users', ownerId));
                    const ownerData = ownerDoc.exists() ? ownerDoc.data() : {};

                    console.log('Post data:', postData); // Debugging post data
                    console.log('Owner data:', ownerData); // Debugging owner data

                    // Ensure nameshop is part of postData
                    appliedPostsData.push({ id: postId, nameshop: ownerData.nameshop || 'Unnamed Shop', ...postData });
                } else {
                    console.log(`Post with ID ${postId} does not exist`);
                }
            }

            setAppliedPosts(appliedPostsData);
        } catch (error) {
            console.log('Error fetching applied posts:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);  // Stop refreshing after data is loaded
        }
    };

    // Function to remove a post from appliedPosts or cancel the application
    const handleDeletePost = async (postId, status) => {
        const message = status === 'ผ่าน' ? 'คุณต้องการยกเลิกการสมัครนี้หรือไม่?' : 'คุณแน่ใจหรือว่าต้องการลบโพสต์นี้?';
        Alert.alert(
            status === 'ผ่าน' ? "ยืนยันการยกเลิก" : "ยืนยันการลบ",
            message,
            [
                {
                    text: "ยกเลิก",
                    style: "cancel"
                },
                {
                    text: "ยืนยัน",
                    onPress: async () => {
                        try {
                            const user = auth.currentUser;
                            if (!user) {
                                console.log('No user is logged in');
                                return;
                            }

                            // Remove the post from the user's appliedPosts array in Firestore
                            const userRef = doc(db, 'users', user.uid);
                            await updateDoc(userRef, {
                                appliedPosts: arrayRemove(postId)  // Remove postId from array
                            });

                            // Query the 'applicant' collection to find matching documents and delete them
                            const q = query(collection(db, 'applicant'), where('postId', '==', postId));
                            const querySnapshot = await getDocs(q);
                            querySnapshot.forEach(async (docSnapshot) => {
                                await deleteDoc(doc(db, 'applicant', docSnapshot.id));  // Delete the applicant document
                            });

                            // Fetch updated applied posts after deletion to refresh the screen
                            await fetchAppliedPosts();
                            setHasRefreshed(false);  // Allow future pull-to-refresh
                        } catch (error) {
                            console.error("Error removing post from appliedPosts and applicant: ", error);
                        }
                    }
                }
            ]
        );
    };
    // Use useFocusEffect to refresh data when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchAppliedPosts(); // Fetch applied posts when the screen is focused
        }, [])
    );

    // Function to handle pull-to-refresh, which will only refresh once
    const onRefresh = useCallback(() => {
        if (!hasRefreshed) {  // Only refresh if it hasn't been done before
            setRefreshing(true);  // Start the refreshing state
            fetchAppliedPosts();  // Fetch the data again
            setHasRefreshed(true);  // Set the flag to true so it only refreshes once
        }
    }, [hasRefreshed]);

    if (loading && !refreshing) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#F44948" />
                <Text>Loading applied posts...</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <HeaderBar />

            {/* Applied posts content */}
            <ScrollView 
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >   
                <Text style={styles.title}>งานที่คุณสมัคร</Text>

                {appliedPosts.length === 0 ? (
                    <Text>คุณยังไม่ได้สมัครงานใด ๆ</Text>
                ) : (
                    appliedPosts.map((post) => (
                        <View key={post.id} style={styles.postContainer}>
                            {/* Image */}
                            <Image
                                source={{ uri: post.profileShop ? post.profileShop : 'https://example.com/placeholder.png' }}
                                style={styles.postImage}
                            />

                            {/* Post Information */}
                            <View style={styles.postDetails}>
                                <Text style={styles.postTitle}>{post.nameshop} ({post.gate || 'Unknown Gate'})</Text>
                                <View style={styles.postTime}>
                                    <Ionicons name="time-outline" size={16} color="gray" />
                                    <Text style={styles.postText}>{post.time || 'Unknown Time'}</Text>
                                    <Text style={styles.postText}> | จำนวน {post.person || 0} คน</Text>
                                </View>

                                {/* Action buttons */}
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={[styles.approveButton, post.status === 'ผ่าน' && styles.passedButton, post.status === 'ไม่ผ่าน' && styles.rejectedButton]}
                                        onPress={() => {}}
                                        disabled
                                    >
                                        <Text style={[styles.approveButtonText, post.status === 'ผ่าน' && styles.passedButtonText, post.status === 'ไม่ผ่าน' && styles.rejectedButtonText]}>
                                            {post.status === 'ผ่าน' ? 'ผ่าน' : post.status === 'ไม่ผ่าน' ? 'ไม่ผ่าน' : 'รออนุมัติ'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => handleDeletePost(post.id, post.status)} // Call handleDeletePost function with post status
                                    >
                                        <Text style={styles.cancelButtonText}>
                                            {post.status === 'ผ่าน' ? 'ยกเลิก' : 'ลบ'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
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
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'SUT_Bold',
        marginTop: 20,
    },
    postContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFE2E2',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
    },
    postDetails: {
        flex: 1,
        marginLeft: 10,
    },
    postTitle: {
        fontSize: 25,
        fontFamily: 'SUT_Bold',
        marginBottom: 5,
    },
    postTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    postText: {
        color: '#555',
        marginLeft: 5,
        fontSize: 20,
        fontFamily: 'SUT_Bold',
    },
    postImage: {
        width: 120,
        height: 100,
        borderRadius: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    approveButton: {
        backgroundColor: '#FFA500',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginRight: 10,
    },
    approveButtonText: {
        fontSize: 16,
        fontFamily: 'SUT_Bold',
        color: '#fff',
    },
    passedButton: {
        backgroundColor: 'green',
    },
    passedButtonText: {
        color: '#fff',
    },
    rejectedButton: {
        backgroundColor: '#ff5c5c',
    },
    rejectedButtonText: {
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#ff5c5c',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    cancelButtonText: {
        fontSize: 16,
        fontFamily: 'SUT_Bold',
        color: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    myWorkButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 20,
    },
    myWorkButtonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'SUT_Bold',
    }
});
