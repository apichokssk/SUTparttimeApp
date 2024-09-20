import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ActivityIndicator, FlatList } from 'react-native';
import Box from '../../component/Box'; // Update the Box component import if needed
import ImageSlider from '../../component/ImageSlider';
import BtnDay from '../../component/BtnDay';
import HeaderBar from '../../component/HeaderBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // State for refreshing

    // Fetching posts from Firestore
    const fetchPosts = async () => {
        try {
            const postsCollection = collection(db, 'blog'); // Ensure 'blog' is the correct Firestore collection
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

    // Initial data fetch
    useEffect(() => {
        fetchPosts();
    }, []);

    // Refresh function when user scrolls to the bottom
    const handleRefresh = () => {
        setRefreshing(true);
        fetchPosts().then(() => setRefreshing(false));
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
            {/* Header Bar Component */}
            <HeaderBar navigation={navigation} />

            {/* Image Slider Component */}
            <View style={styles.sliderContainer}>
                <ImageSlider />
            </View>

            {/* Day Button Component */}
            <View style={{ flex: 1 }}>
                <BtnDay />
            </View>

            {/* FlatList to Render Posts */}
            <View style={styles.boxContainer}>
                <FlatList
                    data={posts}
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
                            textdetail={item.textdetail || 'ไม่มีรายละเอียด'}  // Ensure this is passed
                            onPress={() => {
                                navigation.navigate('DetailScreen', {
                                    imgSource: { uri: item.profileShop || 'https://example.com/placeholder.png' },
                                    textSource: `฿${item.perhrs}/ชั่วโมง`,
                                    time: item.time || 'Unknown Time',
                                    gate: item.gate || '',
                                    person: item.person || 0,
                                    nameshop: item.nameshop || 'ร้านไม่มีชื่อ',
                                    position: item.position || 'ไม่ระบุ',
                                    sum: item.sum || 'ไม่ระบุ',
                                    textdetail: item.textdetail || 'ไม่มีรายละเอียด',
                                });
                            }}
                        />
                    )}
                    onEndReached={handleRefresh} // Refresh when reaching end
                    onEndReachedThreshold={0.5} // Trigger refresh when 50% of the remaining scroll distance
                    refreshing={refreshing}
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
