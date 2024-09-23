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

    // Fetch posts from Firestore and also fetch nameshop from users
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser; // Get the current logged-in user
            if (!user) {
                console.log('No user is logged in');
                setLoading(false);
                return;
            }

            // Query posts created by the logged-in user
            const q = query(collection(db, 'blog'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const fetchedPosts = [];
            for (const docSnapshot of querySnapshot.docs) {
                const postData = docSnapshot.data();
                
                // Fetch nameshop from the users collection
                const userDoc = await getDoc(doc(db, 'users', postData.userId));
                const nameshop = userDoc.exists() ? userDoc.data().nameshop : 'Unknown Shop';

                // Add nameshop to post data
                fetchedPosts.push({ id: docSnapshot.id, ...postData, nameshop });
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
            <HeaderBarShop navigation={navigation} />

            {/* Content */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>โพสต์ของคุณ</Text>

                {posts.length === 0 ? (
                    <Text style={styles.noPostsText}>You have not posted anything yet.</Text>
                ) : (
                    posts.map((post) => (
                        <TouchableOpacity
                            key={post.id}
                            style={styles.postContainer}
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
                                    <Ionicons name="menu" size={16} color="gray" />
                                    <Text style={styles.postText}>{post.position || 'Unknown Time'}</Text>
                                    <Text style={styles.postText}>| รับ {post.person || 0} คน</Text>
                                </View>

                                {/* Buttons */}
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => navigation.navigate('ApplicantScreen', { postId: post.id })}  // Pass postId to ApplicantScreen
                                    >
                                        <Text style={styles.buttonText}>รายชื่อผู้สมัคร</Text>
                                    </TouchableOpacity>
                                    {/* Add "ลูกจ้าง" button */}
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => navigation.navigate('EmployeeScreen', { postId: post.id })} // Pass postId to EmployeeScreen
                                    >
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
        width: '95%',
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
    button: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginRight: 1,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'SUT_Bold',
        color: '#555',
    },
    title: {
        fontSize: 30,
        fontFamily: 'SUT_Bold',
        marginTop: 20,
    },
    noPostsText: {
        marginTop: 20,
        fontSize: 16,
        color: '#555',
    },
});
