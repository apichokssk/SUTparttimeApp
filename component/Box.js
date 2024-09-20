import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure your Firebase setup is correct

export default function Box({ imgSource, textSource, time, gate, person, navigation, userId }) {
    const [nameshop, setNameshop] = useState('');

    // Fetch the shop name from the "users" collection based on userId
    useEffect(() => {
        const fetchNameshop = async () => {
            try {
                const userDoc = doc(db, 'users', userId); // Fetch from 'users' collection
                const docSnapshot = await getDoc(userDoc);
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    setNameshop(userData.nameshop || 'Unknown Shop');
                } else {
                    console.log('No such user!');
                }
            } catch (error) {
                console.error('Error fetching shop name:', error);
            }
        };

        if (userId) {
            fetchNameshop();
        }
    }, [userId]);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailScreen')}>
            <View style={styles.container}>
                {/* Product Image */}
                <Image source={imgSource} style={styles.image} />

                {/* Product Information */}
                <View style={styles.infoSection}>
                    <Text style={styles.title}>
                        {nameshop} {gate}
                    </Text>
                    <View style={styles.infoContainer}>
                        <Ionicons name="time-outline" size={16} color="#fff" />
                        <Text style={styles.infoText}>
                            {time} | ทำ {person} วัน
                        </Text>
                    </View>

                    {/* Price per hour */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>
                            {textSource}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F18180',  // Pink background
        borderRadius: 20,
        height: 120,
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    infoSection: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 14,
    },
    priceContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    priceText: {
        color: '#F18180',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
