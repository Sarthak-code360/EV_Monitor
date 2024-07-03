import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');

    const handleCreateProfile = () => {
        if (name && email && company) {
            Alert.alert(
                'Congratulation',
                'Profile created successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Main')
                    }
                ]
            );
        } else {
            Alert.alert('Alert', 'All fields are required');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Enter your name"
                placeholderTextColor="#999"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Company:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCompany}
                value={company}
                placeholder="Enter your company name"
                placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
                <Text style={styles.buttonText}>Create Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333'
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#000000',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});

export default ProfileScreen;
