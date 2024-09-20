import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import HeaderBarShop from '../../component/HeaderBarShop';  // นำเข้า HeaderBar

export default function MessageScreenShop({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            {/* เพิ่ม HeaderBar */}
            <HeaderBarShop navigation={navigation} />
            
            {/* ส่วนเนื้อหาของหน้า */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.text}>ข้อความ</Text>
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        
    },
});
