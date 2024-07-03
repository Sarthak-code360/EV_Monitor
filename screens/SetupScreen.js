import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const setupInstructions = [
    'Plug to power on the device',
    'Search for Mazout motor controller in Bluetooth',
    'Follow on-screen instructions to connect',
    'Enjoy your ride!'
];

const SetupScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Swiper
                loop={false}
                showsPagination={true}
                activeDotColor="#000"
                paginationStyle={styles.pagination}
            >
                {setupInstructions.map((instruction, index) => (
                    <View key={index} style={styles.slide}>
                        <Text style={styles.text}>{instruction}</Text>
                    </View>
                ))}
            </Swiper>
            <View style={styles.buttonContainer}>
                <Button
                    title="Get Started"
                    onPress={() => navigation.navigate('Profile')}
                    color="#000"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    pagination: {
        bottom: 70
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingHorizontal: 20
    }
});

export default SetupScreen;
