import * as React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function BtnDay({ filterPostsByGate }) {
    return (
        <View style={styles.container}>
            {/* ปุ่มเวลาเช้า */}
            <TouchableOpacity style={styles.gate1} onPress={() => filterPostsByGate('ประตู 1')}>
                <Image 
                    source={require('./img/gate1.png')}  
                    style={styles.icon}
                />
                <View>
                    <Text style={{ fontFamily: 'SUT_Bold', fontSize: 18 }}>ประตู 1</Text>
                </View>
            </TouchableOpacity>

            {/* ปุ่มเวลาค่ำ */}
            <TouchableOpacity style={styles.gate4} onPress={() => filterPostsByGate('ประตู 4')}>
                <Image 
                    source={require('./img/gate4.png')}  
                    style={styles.icon}
                />
                <View>
                    <Text style={{ fontFamily: 'SUT_Bold', fontSize: 18 }}>ประตู 4</Text>
                </View>
            </TouchableOpacity>

            {/* ปุ่มทั้งหมด */}
            <TouchableOpacity style={styles.allGate} onPress={() => filterPostsByGate('ทั้งหมด')}>
                <Image 
                    source={require('./img/AllGate.png')}
                    style={styles.icon}
                />
                <View>
                    <Text style={{ fontFamily: 'SUT_Bold', fontSize: 16 }}>ทั้งหมด</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    gate1: {
        flex: 2,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 8,
        elevation: 5,
    },
    gate4: {
        flex: 2,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 8,
    },
    allGate: {
        flex: 2,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 8,
        elevation: 5, 
    },
});
