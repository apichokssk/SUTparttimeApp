import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DetailScreen = ({ route }) => {
  const { imgSource, textSource, time, gate, person, nameshop, postId, userId } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={imgSource} style={styles.image} />
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        <Text style={styles.title}>{nameshop}</Text>
        <Text>ค่าจ้าง: {textSource}</Text>
        <Text>เวลา: {time}</Text>
        <Text>ประตู: {gate}</Text>
        <Text>จำนวนคน: {person}</Text>
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
    backgroundColor: '#f5f5f5',
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
