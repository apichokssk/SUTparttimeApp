import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native'; // Make sure Alert is imported
import { collection, getDocs, deleteDoc, query, where, doc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path to your Firebase setup
import HeaderBarShop from '../../component/HeaderBarShop';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EmployeeScreen({ route, navigation }) {
    const { postId } = route.params;
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch employees for the selected postId
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'employee'), where('postId', '==', postId)); // Filter employees by postId
            const querySnapshot = await getDocs(q);
            const fetchedEmployees = [];
            querySnapshot.forEach((doc) => {
                fetchedEmployees.push({ id: doc.id, ...doc.data() });
            });
            setEmployees(fetchedEmployees);
        } catch (error) {
            console.log('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        Alert.alert(
            'ยืนยันการลบ',
            'คุณแน่ใจหรือว่าต้องการลบพนักงานคนนี้?',
            [
                { text: 'ยกเลิก', style: 'cancel' },
                {
                    text: 'ยืนยัน',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'employee', employeeId));
                            console.log('Employee successfully deleted:', employeeId);
                            fetchEmployees(); // Refresh the employee list after deletion
                        } catch (error) {
                            console.log('Error deleting employee:', error);
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        fetchEmployees();
    }, [postId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#F44948" />
                <Text>Loading Employees...</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <HeaderBarShop navigation={navigation} />
            <Text style={styles.title}>พนักงานสำหรับโพสต์นี้</Text>

            <ScrollView contentContainerStyle={styles.centeredContainer}>
                {employees.length === 0 ? (
                    <Text style={styles.noEmployeesText}>ไม่มีพนักงานในระบบ</Text>
                ) : (
                    employees.map((employee) => (
                        <View key={employee.id} style={styles.employeeContainer}>
                            {/* Display employee profile image */}
                            <Image
                                source={{ uri: employee.profile || 'https://example.com/placeholder.png' }}
                                style={styles.employeeImage}
                            />

                            {/* Employee Info */}
                            <View style={styles.employeeInfoContainer}>
                                <Text style={styles.employeeName}>{employee.firstName} {employee.lastName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                <Ionicons name="at-circle" size={16} color="gray" />
                                    <Text style={styles.employeeInfo}> {employee.email}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <Ionicons name="call" size={16} color="gray" />
                                    <Text style={styles.employeeInfo}> {employee.phone}</Text>
                                </View>

                                {/* Delete Employee Button */}
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteEmployee(employee.id)}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons name="person-remove-outline" size={20} color="white" />
                                        <Text style={styles.deleteButtonText}> ยกเลิกจ้างงาน</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: 'SUT_Bold',
        marginTop: 10,
        textAlign: 'center',
    },
    employeeContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFE2E2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    employeeInfoContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    employeeName: {
        fontSize: 18,
        fontFamily: 'SUT_Bold',
        marginBottom: 5,
    },
    employeeInfo: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'SUT_Bold',
    },
    employeeImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: '#ff5c5c',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        fontFamily: 'SUT_Bold',
        fontSize: 20,
        color: '#fff',
    },
    noEmployeesText: {
        fontSize: 18,
        color: '#555',
        fontFamily: 'SUT_Bold',
        textAlign: 'center',
        marginTop: 20,
    },
});
