import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Box from '../../component/Box';
import HeaderBar from '../../component/HeaderBar'; // นำเข้า HeaderBar

export default function WorkScreenShop({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            {/* เพิ่ม HeaderBar */}
            <HeaderBar />
            
            {/* ส่วนเนื้อหาของหน้าจอ */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 ,marginTop: 20,}}>
                    โพสต์ของคุณ
                </Text>
                
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:'#fff',
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
});
