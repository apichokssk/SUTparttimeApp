import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import Box from '../../component/Box'; 
import ImageSlider from '../../component/ImageSlider';
import BtnDay from '../../component/BtnDay';
import HeaderBar from '../../component/HeaderBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);  // สถานะสำหรับการรีเฟรช

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

    const filterPostsByGate = (gate) => {
        if (gate === 'ทั้งหมด') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post => post.gate === gate);
            setFilteredPosts(filtered); 
        }
    };

    // ฟังก์ชันการรีเฟรชหน้า
    const onRefresh = async () => {
        setRefreshing(true);  // แสดงการโหลดขณะรีเฟรช
        await fetchPosts();  // ดึงข้อมูลใหม่
        setRefreshing(false);  // หยุดการโหลด
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
                            onRefresh={onRefresh}  // เรียกใช้ฟังก์ชัน onRefresh เมื่อรีเฟรช
                        />
                    }
                    onEndReachedThreshold={0.5} // เลื่อนถึง 50% ของขอบล่างเพื่อรีเฟรช
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
