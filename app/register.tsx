import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "@/components/Logo";
import Background from "@/components/Background";
import axios from "axios";
import baseApi from "@/constants/BaseApi";
import { UserContext } from "@/hooks/contexts/userContext";

export default function Register() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");

  const validateInputs = () => {
    if (!username || !email || !password || !confirmPassword || !age) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }

    if (password.length < 3) {
      Alert.alert("Error", "Password must be at least 3 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber)) {
      Alert.alert("Error", "Age must be a valid number.");
      return false;
    }
    if (ageNumber <= 10) {
      Alert.alert("Error", "You have to be at least 10 years old.");
      return false;
    }

    return true;
  };

  const handleRegister = () => {

    if (validateInputs()) {
      console.log("sal");
      const api = baseApi + "/Auth/Register";
      axios
        .post(api, {
          username: username,
          email: email,
          password: password,
          age: age,
        })
        .then((response) => {
          console.log(response.data);
          Alert.alert("Success", "Registration successful!");
          setUser(response.data);
          router.push("/home");
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", error.response);
        });
    console.log("sal");
    }

  };

  return (
    <Background>
      <View style={styles.contentContainer}>
        <Logo />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={setUsername}
            value={username}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={setAge}
            value={age}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <LinearGradient
            colors={["#2ecc71", "#3498db"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Link href="/signin" style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? Sign In</Text>
        </Link>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
