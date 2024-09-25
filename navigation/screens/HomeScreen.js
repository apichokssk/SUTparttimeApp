import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import Box from '../../component/Box'; 
import ImageSlider from '../../component/ImageSlider';
import BtnDay from '../../component/BtnDay';
import HeaderBar from '../../component/HeaderBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Accelerometer } from 'expo-sensors'; // Import the Accelerometer from expo-sensors
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused to track screen focus

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [subscription, setSubscription] = useState(null); // State to manage the Accelerometer subscription
    const isFocused = useIsFocused(); // Hook to detect if the screen is focused

    const fetchPosts = async () => {
        try {
            const postsCollection = collection(db, 'blog'); 
            const postsSnapshot = await getDocs(postsCollection);
            const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(postsList);
            setFilteredPosts(postsList); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts: ", error);
            Alert.alert('Error', 'Failed to load posts.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (isFocused) {
            // Subscribe to accelerometer when the screen is focused
            subscribeToShake();
        } else {
            // Unsubscribe from accelerometer when the screen is not focused
            unsubscribeFromShake();
        }
        // Cleanup subscription on unmount or when screen loses focus
        return () => unsubscribeFromShake();
    }, [isFocused]);

    const filterPostsByGate = (gate) => {
        if (gate === 'ทั้งหมด') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post => post.gate === gate);
            setFilteredPosts(filtered); 
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    };

    // Shake detection logic using the Accelerometer
    const subscribeToShake = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                const { x, y, z } = accelerometerData;
                const acceleration = Math.sqrt(x * x + y * y + z * z);
                // Detect shake with a threshold value (you can adjust this value based on your testing)
                if (acceleration > 1.78) {
                    // If the phone is shaken, navigate to YourWorkScreen.js
                    navigation.navigate('YourWorkScreen');
                }
            })
        );
        // Set accelerometer update interval
        Accelerometer.setUpdateInterval(400);
    };

    const unsubscribeFromShake = () => {
        if (subscription) {
            subscription.remove();
        }
        setSubscription(null);
    };

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
                <BtnDay filterPostsByGate={filterPostsByGate} />
            </View>

            <View style={styles.boxContainer}>
                <FlatList
                    data={filteredPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Box
                            imgSource={{ uri: item.profileShop || 'https://example.com/placeholder.png' }}
                            textSource={`฿${item.perhrs}/ชั่วโมง`}
                            time={item.time || 'Unknown Time'}
                            gate={item.gate || ''}
                            person={item.person || 0}
                            navigation={navigation}
                            userId={item.userId}
                            nameshop={item.nameshop || 'ร้านไม่มีชื่อ'}
                            postId={item.id}
                            position={item.position || 'ไม่ระบุ'}
                            perhrs={item.perhrs}
                            sum={item.sum}
                            textdetail={item.textdetail || 'ไม่มีรายละเอียด'}
                            latitude={item.latitude || 14.8811}
                            longitude={item.longitude || 102.0155}
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    onEndReachedThreshold={0.5}
                />
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
});
