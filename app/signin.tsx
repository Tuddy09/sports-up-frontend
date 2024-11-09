import { Link, router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/components/Logo';
import Background from '@/components/Background';
import axios from 'axios';
import baseApi from '@/constants/BaseApi';
import { UserContext } from '@/hooks/contexts/userContext';

export default function SignIn() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert("Error", "Both fields are required.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSignIn = () => {
    if (validateInputs()) {
      const api = baseApi + '/Auth/Login';
      axios.post(api, {
        email: email,
        password: password
      })
        .then(response => {
          console.log(response.data);
          setUser(response.data);
          Alert.alert("Success", "Sign in successful!");
          router.push('/home');
        })
        .catch(error => {
          console.log(error);
          Alert.alert(error.response.data)
        });
    }
  };

  return (
    <Background>
      <View style={styles.contentContainer}>
        <Logo />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
        >
          <LinearGradient
            colors={['#2ecc71', '#3498db']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Link href="/register" style={styles.registerLink}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </Link>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});