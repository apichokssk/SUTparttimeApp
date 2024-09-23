import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Adjust the path to your Firebase setup
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBar from '../../component/HeaderBar';

export default function YourWorkScreen({ navigation }) {
    const [appliedPosts, setAppliedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);  // State for refresh control

    // Function to fetch applied posts from 'employee' collection
    const fetchAppliedPosts = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log('No user is logged in');
                setLoading(false);
                return;
            }

            const q = query(collection(db, 'employee'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const appliedPostsData = [];
            querySnapshot.forEach((doc) => {
                appliedPostsData.push({ id: doc.id, ...doc.data() });  // Ensure post.id is the Firestore document ID
            });

            setAppliedPosts(appliedPostsData);
        } catch (error) {
            console.log('Error fetching employee data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    const handleCancelPost = async (postId) => {
        Alert.alert(
            'ยืนยันการลบ', // Confirm deletion
            `คุณแน่ใจหรือว่าต้องการลบงานนี้?\nDocument ID: ${postId}`,  // Show the doc.id in the alert
            [
                {
                    text: 'ยกเลิก',
                    style: 'cancel',
                },
                {
                    text: 'ยืนยัน',
                    onPress: async () => {
                        try {
                            // Reference the specific post document by its Firestore ID (postId)
                            const postRef = doc(db, 'employee', postId);

                            // Delete the specific post
                            await deleteDoc(postRef);

                            console.log('Document successfully deleted:', postId);

                            // Fetch updated posts after deletion
                            fetchAppliedPosts();
                        } catch (error) {
                            console.log('Error deleting post:', error);
                        }
                    },
                },
            ]
        );
    };



    // Use useFocusEffect to refresh data when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchAppliedPosts(); // Fetch applied posts when the screen is focused
        }, [])
    );

    if (loading) {
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

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>งานของฉัน</Text>

                {appliedPosts.length === 0 ? (
                    <Text>คุณยังไม่ได้สมัครงานใด ๆ</Text>
                ) : (
                    appliedPosts.map((post) => (
                        <View key={post.id} style={styles.postContainer}>
                            <Image
                                source={{ uri: post.profileShop ? post.profileShop : 'https://example.com/placeholder.png' }}
                                style={styles.postImage}
                            />
                            <View style={styles.postDetails}>
                                <Text style={styles.postTitle}>{post.nameshop} ({post.gate || 'Unknown Gate'})</Text>
                                <View style={styles.postTime}>
                                    <Ionicons name="time-outline" size={16} color="gray" />
                                    <Text style={styles.postText}>{post.time || 'Unknown Time'}</Text>
                                    <Text style={styles.postText}> | จำนวน {post.person || 0} คน</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => handleCancelPost(post.id)}  // Pass the correct document ID (post.id)
                                >
                                    <Text style={styles.cancelButtonText}>ยกเลิกงาน</Text>
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
    cancelButton: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        alignItems:'center'
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'SUT_Bold',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
