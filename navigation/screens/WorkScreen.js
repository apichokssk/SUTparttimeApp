import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Box from '../../component/Box';
import HeaderBar from '../../component/HeaderBar'; // นำเข้า HeaderBar

export default function WorkScreen({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            {/* เพิ่ม HeaderBar */}
            <HeaderBar />
            
            {/* ส่วนเนื้อหาของหน้าจอ */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={{ fontFamily: 'SUT_Bold', fontSize: 30 ,marginTop: 20,}}>
                    งานของคุณ
                </Text>

                {/* Box แสดงรายการงาน */}
                <Box imgSource={require('./img2/pd.jpg')} textSource={"40/ชั่วโมง"} navigation={navigation} />
                
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
