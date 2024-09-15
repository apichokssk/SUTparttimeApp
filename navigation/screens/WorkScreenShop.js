import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Adjust the path to your Firebase setup
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBarShop from '../../component/HeaderBarShop';
import { useFocusEffect } from '@react-navigation/native';

export default function WorkScreenShop({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch posts from Firestore
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser; // Get the current logged-in user
            if (!user) {
                console.log('No user is logged in');
                setLoading(false);
                return;
            }

            const q = query(collection(db, 'blog'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            
            const fetchedPosts = [];
            for (const docSnapshot of querySnapshot.docs) {
                const postData = docSnapshot.data();
                
                // ตรวจสอบว่ามี userId ก่อนที่จะดึงข้อมูล
                if (postData.userId) {
                    const userDocRef = doc(db, 'users', postData.userId);  // Fetch user details
                    const userDoc = await getDoc(userDocRef);
                    const nameshop = userDoc.exists() ? userDoc.data().nameshop : 'Unknown Shop';
                    fetchedPosts.push({ id: docSnapshot.id, ...postData, nameshop });
                } else {
                    fetchedPosts.push({ id: docSnapshot.id, ...postData, nameshop: 'Unknown Shop' });
                }
            }

            setPosts(fetchedPosts);
        } catch (error) {
            console.log('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#F44948" />
                <Text>Loading your posts...</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            {/* Add HeaderBar */}
            <HeaderBarShop />
            
            {/* Content */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Your Posts</Text>

                {posts.length === 0 ? (
                    <Text style={styles.noPostsText}>You have not posted anything yet.</Text>
                ) : (
                    posts.map((post) => (
                        <TouchableOpacity 
                            key={post.id} 
                            style={styles.postContainer}
                            onPress={() => navigation.navigate('DetailScreenShop', { post })}
                        >
                            {/* Image */}
                            <Image 
                                source={{ uri: post.profileShop ? post.profileShop : 'https://example.com/placeholder.png' }} 
                                style={styles.postImage} 
                            />

                            {/* Post Information */}
                            <View style={styles.postDetails}>
                                <Text style={styles.postTitle}>{post.nameshop} {post.gate}</Text>
                                <View style={styles.postTime}>
                                    <Ionicons name="time-outline" size={16} color="gray" />
                                    <Text style={styles.postText}>{post.time || 'Unknown Time'}</Text>
                                    <Text style={styles.postText}>| ทำ {post.person || 0} วัน</Text>
                                </View>

                                {/* Buttons */}
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>รายชื่อผู้สมัคร</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>ลูกจ้าง</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    postTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    postText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 5,
    },
    postImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonText: {
        fontSize: 14,
        color: '#555',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
    noPostsText: {
        marginTop: 20,
        fontSize: 16,
        color: '#555',
    },
});
