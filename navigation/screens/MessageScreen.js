import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import HeaderBar from '../../component/HeaderBar';  // นำเข้า HeaderBar

export default function MessageScreen({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            {/* เพิ่ม HeaderBar */}
            <HeaderBar />
            
            {/* ส่วนเนื้อหาของหน้า */}
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('./img2/message.png')} style={styles.headerImage} />
                <Text style={styles.text}>Your Messages</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    headerImage: {
        width: '100%',
        height: 230,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});
