import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';

const ImageSlider = () => {
  const images = [require('./img/1.png'), require('./img/2.png'), require('./img/3.png')]; // Add all images here
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // To track if animation is in progress
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextImage(); // Auto slide to the next image
      }
    }, 5000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [isAnimating]);

  const nextImage = () => {
    setIsAnimating(true);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // After animation, update the index
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to first image
      setIsAnimating(false);
      animationValue.setValue(0); // Reset animation
    });
  };

  const prevImage = () => {
    setIsAnimating(true);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // After animation, update the index
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Loop back to last image
      setIsAnimating(false);
      animationValue.setValue(0); // Reset animation
    });
  };

  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300], // Image slides from right to left
  });

  const translateXNext = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Image slides from left to right
  });

  return (
    <View style={styles.container}>
      {/* Current Image */}
      <Animated.View style={{ ...styles.imageContainer, transform: [{ translateX }] }}>
        <Image source={images[currentIndex]} style={styles.image} />
      </Animated.View>

      {/* Next Image during animation */}
      {isAnimating && (
        <Animated.View style={{ ...styles.imageContainer, transform: [{ translateX: translateXNext }] }}>
          <Image
            source={images[(currentIndex + 1) % images.length]} // Next image
            style={styles.image}
          />
        </Animated.View>
      )}

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot, // Highlight active dot
            ]}
          />
        ))}
      </View>

      {/* Left and Right Arrows */}
      <TouchableOpacity style={styles.leftArrow} onPress={prevImage}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightArrow} onPress={nextImage}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'red', // Active dot color
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  arrowText: {
    color: 'white',
    fontSize: 20,
  },
});

export default ImageSlider;
