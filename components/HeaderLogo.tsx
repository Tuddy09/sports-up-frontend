import React from 'react';
import { Image, StyleSheet } from 'react-native';

const HeaderLogo = () => (
    <Image
        source={require('../assets/images/Sports_Up_Logo.png')}
        style={styles.logo}
    />
);

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        marginTop: 15,
    },
});

export default HeaderLogo;