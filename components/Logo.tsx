import React from 'react';
import { Image, StyleSheet } from 'react-native';
const Logo = () => (
    <Image
        source={require('../assets/images/Sports_Up_Logo.png')}
        style={styles.logo}
    />
);

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 40,
    },
});

export default Logo;