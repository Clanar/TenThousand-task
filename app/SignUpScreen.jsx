import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [buttonBottom, setButtonBottom] = useState(new Animated.Value(20));
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let valid = true;

    if (name.trim() === "") {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 8-64 characters, include uppercase, lowercase letters, and a special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleContinue = () => {
    if (validate()) {
      alert("Successful registration");
    }
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="person-add-outline"
            size={40}
            color="#00A385"
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}>Sign up</Text>
          <Text style={styles.subHeaderText}>Personal Account</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          placeholder="emma-watson@m.com"
          style={styles.input}
          placeholderTextColor="#06070A"
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Text style={styles.inputTitle}>E-mail</Text>
        <TextInput
          placeholder="emma-watson@m.com"
          style={styles.input}
          placeholderTextColor="#06070A"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
              color="#00A36D"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <Animated.View
          style={[styles.continueButtonContainer, { bottom: buttonBottom }]}
        >
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
    borderColor: "#CED5E0",
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CED5E0",
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
  continueButtonContainer: {
    position: "absolute",
    left: width * 0.05,
    right: width * 0.05,
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
  errorText: {
    color: "red",
    marginBottom: 10,
    left: 20,
    width: width * 0.8,
  },
});

export default SignUpScreen;
