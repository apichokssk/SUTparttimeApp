import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native';
import Box from '../../component/Box';
import ImageSlider from '../../component/ImageSlider';
import BtnDay from '../../component/BtnDay';
import HeaderBar from '../../component/HeaderBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, 'blog'); // Make sure 'blog' is the correct Firestore collection
                const postsSnapshot = await getDocs(postsCollection);
                const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts: ", error);
                Alert.alert('Error', 'Failed to load posts.');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#F18180" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation} />

            <View style={styles.sliderContainer}>
                <ImageSlider />
            </View>
            <View style={{ flex: 1 }}>
                <BtnDay />
            </View>
            <View style={styles.boxContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {posts.map((post) => (
                        <Box
                            key={post.id}
                            imgSource={{ uri: post.profileShop || 'https://example.com/placeholder.png' }}
                            textSource={`฿${post.perhrs}/ชั่วโมง`}
                            time={post.time || 'Unknown Time'}
                            gate={post.gate || ''}
                            person={post.person || 0}
                            navigation={navigation}
                            userId={post.userId} // Pass userId to fetch nameshop
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sliderContainer: {
        flex: 2,
    },
    boxContainer: {
        flex: 4,
    },
    scrollViewContainer: {
        padding: 10,
    },
});
