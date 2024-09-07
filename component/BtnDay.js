import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function BtnDay(props) {
    return (
        <View style={styles.container}>
            {/* ปุ่มเวลาเช้า */}
            <View style={styles.button}>
                <Image 
                    source={require('./img/sun.png')}  // ไอคอนพระอาทิตย์
                    style={styles.icon}
                />
                <View>
                    <Text style={styles.timeTextDay}>กลางวัน</Text>
                    <Text style={styles.timeRangeText}>01:00-12:00</Text>
                </View>
            </View>

            {/* ปุ่มเวลาค่ำ */}
            <View style={styles.button}>
                <Image 
                    source={require('./img/moon.png')}  // ไอคอนพระจันทร์
                    style={styles.icon}
                />
                <View>
                    <Text style={styles.timeTextNight}>กลางคืน</Text>
                    <Text style={styles.timeRangeText}>13:00-00:00</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#fff',  // สีพื้นหลังตามตัวอย่าง
        borderRadius: 20,
        padding: 15,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
        resizeMode: 'contain',
    },
    timeTextDay: {
        fontSize: 16,
        color: '#F9A825',  // สีของข้อความ "กลางวัน"
    },
    timeTextNight: {
        fontSize: 16,
        color: '#BDBDBD',  // สีของข้อความ "กลางคืน"
    },
    timeRangeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
