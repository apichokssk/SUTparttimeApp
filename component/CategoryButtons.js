import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const DateButton = ({ date, isActive, onPress }) => (
    <TouchableOpacity style={[styles.button, isActive && styles.activeButton]} onPress={onPress}>
        <Text style={[styles.buttonText, isActive && styles.activeText]}>
            {date}
        </Text>
    </TouchableOpacity>
);

export default function DateScrollView({ selectedDate, setSelectedDate }) {
    const dates = ["8 ส.ค.", "9 ส.ค.", "10 ส.ค.", "11 ส.ค.", "12 ส.ค."];  // Example dates

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {dates.map((date, index) => (
                    <DateButton
                        key={index}
                        date={date}
                        isActive={selectedDate === date}
                        onPress={() => setSelectedDate(date)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#F18180',
    },
    activeButton: {
        backgroundColor: '#F18180',
    },
    buttonText: {
        color: '#F18180',
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeText: {
        color: '#fff',
    },
});
