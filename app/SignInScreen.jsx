import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Animated, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [buttonBottom, setButtonBottom] = useState(new Animated.Value(20));
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = async () => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: email,
        password: password,
      });
  
      if (response.data && response.data.token) {
        const userResponse = await axios.get(`https://dummyjson.com/users/${response.data.id}`);
        const user = userResponse.data;
        Alert.alert("Login Successful", "You are now logged in!");
        navigation.navigate('PIN', { user });
      } else {
        Alert.alert("Login Failed", "Please check your credentials and try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Login Error", "An error occurred during login. Please try again.");
    }
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="person-outline"
            size={40}
            color="#00A385"
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.subHeaderText}>Personal Account</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.inputTitle}>E-mail</Text>
        <TextInput
          placeholder="Emma Watson"
          style={styles.input}
          placeholderTextColor="#06070A"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.inputTitle}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#7C8594"
            secureTextEntry={!passwordVisible}
            autoCorrect={false}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#FA8A34"
            />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[styles.ButtonContainer, { bottom: buttonBottom }]}
        >
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#ffffff",
    height: height * 0.85,
    padding: 20,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
  },
  headerContainer: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  headerIcon: {
    backgroundColor: "#E0F2F1",
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    position: "absolute",
    top: 5,
    left: 75,
  },
  subHeaderText: {
    fontSize: 20,
    color: "#606773",
    fontWeight: "400",
    position: "absolute",
    top: 30,
    left: 75,
  },
  divider: {
    height: 1,
    backgroundColor: "#EBEFF5",
    width: "100%",
    marginTop: 5,
  },
  inputTitle: {
    color: "#606773",
    marginVertical: 10,
    fontSize: 15,
    left: 20,
  },
  input: {
    height: 56,
    borderColor: "#cccccc",
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 56,
    fontSize: 20,
  },
  eyeIcon: {
    padding: 10,
  },
  ButtonContainer: {
    position: "relative",
    marginVertical: 40,
  },
  continueButton: {
    backgroundColor: "#FA8A34",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 20,
  },
  createAccountButton: {
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  createAccountButtonText: {
    color: '#FA8A34',
    fontSize: 18,
  },
});

export default SignInScreen;
