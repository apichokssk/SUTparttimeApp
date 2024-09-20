import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DetailScreen = ({ route }) => {
    const { imgSource, textSource, time, gate, person, nameshop, position, sum, textdetail } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image source={imgSource} style={styles.image} />
            </View>

            {/* Details Section */}
            <View style={styles.detailContainer}>
            <Text style={styles.title}>{nameshop} {gate}</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.icon}>📦</Text>
                    <Text>ตำแหน่งงาน: {position}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.icon}>💵</Text>
                    <Text>ค่าจ้าง: {textSource}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.icon}>💼</Text>
                    <Text>รวม: {sum} บาท</Text>
                </View>
            </View>
            <View style={styles.detailsSection2}>
                <Text style={styles.title}>รายละเอียด</Text>
                <Text>จำนวนคน: {person} คน</Text>
                <Text>เวลา: {time} น.</Text>
                <Text>งานที่มอบหมาย: {textdetail}</Text>

            </View>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 14.8811,
                        longitude: 102.0155,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 14.8811, longitude: 102.0155 }}
                        title="Suranaree University of Technology"
                    />
                </MapView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 5,
    },
    detailsSection: {
        padding: 20,
        backgroundColor: '#FDD2D2',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    detailContainer: {
        padding: 20,
        backgroundColor: '#FDD2D2',
        borderRadius: 10,
        margin: 10,
    },
    detailsSection2: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mapContainer: {
        height: 200,
        marginHorizontal: 15,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    map: {
        flex: 1,
    },
});

export default DetailScreen;
