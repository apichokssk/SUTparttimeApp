import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import HeaderBarShop from '../../component/HeaderBarShop';  // นำเข้า HeaderBar

export default function EmployeeScreen({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            <HeaderBarShop navigation={navigation} />
            
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.text}>ลูกจ้างของคุณ</Text>
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
        fontFamily: 'SUT_Bold', 
        fontSize: 30 ,
        marginTop: 20,
    },
});
