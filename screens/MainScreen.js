// screens/MainScreen.js

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Switch,
    Alert,
    PermissionsAndroid,
    Platform
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const MainScreen = () => {
    const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
    const [scannedDevices, setScannedDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const manager = new BleManager();

    useEffect(() => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then((result) => {
                if (result) {
                    console.log("User accepted location permission");
                } else {
                    console.log("User denied location permission");
                }
            });
        }

        return () => {
            manager.destroy();
        };
    }, [manager]);

    const toggleBluetooth = () => {
        setIsBluetoothEnabled((previousState) => !previousState);
        if (!isBluetoothEnabled) {
            scanForDevices();
        }
    };

    const scanForDevices = () => {
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                return;
            }
            if (device.name) {
                setScannedDevices((prevDevices) => {
                    if (!prevDevices.some(d => d.id === device.id)) {
                        return [...prevDevices, device];
                    }
                    return prevDevices;
                });
            }
        });

        // Stop scanning after 5 seconds
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 5000);
    };

    const connectToDevice = (device) => {
        manager.connectToDevice(device.id)
            .then((connectedDevice) => {
                setConnectedDevice(connectedDevice);
                Alert.alert('Connected', `Connected to ${connectedDevice.name}`);
            })
            .catch((error) => {
                Alert.alert('Error', `Failed to connect to ${device.name}`);
                console.log(error);
            });
    };

    const renderDevice = ({ item }) => {
        const isConnected = connectedDevice && connectedDevice.id === item.id;
        return (
            <TouchableOpacity
                style={[styles.deviceContainer, isConnected && styles.connectedDevice]}
                onPress={() => connectToDevice(item)}
            >
                <Text style={styles.deviceName}>{item.name}</Text>
                <Text style={styles.deviceStatus}>
                    {isConnected ? 'Connected' : 'Tap to connect'}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bluetooth Connectivity</Text>
                <View style={styles.toggleContainer}>
                    <Text>Bluetooth</Text>
                    <Switch
                        onValueChange={toggleBluetooth}
                        value={isBluetoothEnabled}
                    />
                </View>
                {isBluetoothEnabled && (
                    <FlatList
                        data={scannedDevices}
                        renderItem={renderDevice}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
            {/* Add other sections here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 24,
        marginBottom: 10
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    deviceContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    connectedDevice: {
        backgroundColor: 'lightblue',
        borderColor: 'darkblue'
    },
    deviceName: {
        fontSize: 18
    },
    deviceStatus: {
        fontSize: 14,
        color: '#666'
    }
});

export default MainScreen;
