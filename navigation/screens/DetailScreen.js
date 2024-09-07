import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';  // ใช้สำหรับแผนที่

export default function DetailScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* รูปภาพร้าน */}
            <Image
                source={require('./img2/pd.jpg')}  // แทนที่ด้วยรูปภาพร้านของคุณ
                style={styles.shopImage}
            />
            
            {/* รายละเอียดร้าน */}
            <View style={styles.detailContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>ร้านอะเเดพแมน สาขา มทส.</Text>
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>สมัคร</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>📦</Text>
                        <Text>พนักงานคลังสินค้า</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💵</Text>
                        <Text>รายได้: ...... / ชั่วโมง</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.icon}>💼</Text>
                        <Text>รายได้รวม: ......</Text>
                    </View>
                </View>
            </View>

            {/* รายละเอียดอื่น ๆ */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>รายละเอียด</Text>
                <View style={styles.infoRow}>
                    <Text>วัน</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>เวลา</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>ขอบเขตการทำงาน</Text>
                </View>
            </View>

            {/* แผนที่ */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 14.8802,  // ค่า latitude, longitude ของตำแหน่งที่ต้องการ
                    longitude: 102.0154,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{ latitude: 14.8802, longitude: 102.0154 }}  // ตำแหน่งแผนที่
                    title="ร้านอะเเดพแมน สาขา มทส."
                />
            </MapView>

            {/* ข้อมูลเพิ่มเติม */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ข้อมูลเพิ่มเติม</Text>
                <Text>สวัสดิการ: เข้างานไม่เกิน 22.00 คืนวันที่ 3 สิงหาคม</Text>
                <Text>รายละเอียดบลาๆๆ</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    shopImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    detailContainer: {
        padding: 20,
        backgroundColor: '#FDD2D2',
        borderRadius: 10,
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: '#FFC0CB',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    infoContainer: {
        marginTop: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: 300,
        marginVertical: 10,
    },
});
