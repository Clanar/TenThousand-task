import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const PINScreen = () => {
  const [loaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  const [pin, setPin] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [confirmedPin, setConfirmedPin] = useState("");

  const handleKeyPress = (key) => {
    if (pin.length < 5) {
      setPin(pin + key);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleContinue = () => {
    if (pin.length !== 5) {
      Alert.alert("Invalid PIN", "Please enter a 5 digit PIN.");
      return;
    }
    if (confirming) {
      if (pin === confirmedPin) {
        Alert.alert("Success", "PIN confirmed successfully.");
        navigation.navigate('HomeScreen', { screen: 'Home', params: { user } });

      } else {
        Alert.alert("Mismatch", "The PINs do not match. Please try again.");
        setPin("");
        setConfirming(false);
      }
    } else {
      setConfirmedPin(pin);
      setPin("");
      setConfirming(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Ionicons
          name="phone-portrait-outline"
          size={40}
          color="#00A385"
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>
          {confirming ? "Repeat a PIN code" : "Create a PIN code"}
        </Text>
        <Text style={styles.subHeaderText}>
          Enter 5 digit code:
        </Text>
        <View style={styles.pinContainer}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index < pin.length && styles.filledDot]}
              />
            ))}
        </View>

        <View style={styles.keypad}>
          <View style={styles.divider1} />
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"].map(
            (key) => (
              <TouchableOpacity
                key={key}
                style={styles.key}
                onPress={() =>
                  key === "delete" ? handleDelete() : handleKeyPress(key)
                }
              >
                {key === "delete" ? (
                  <Ionicons name="backspace-outline" size={35} color="black" />
                ) : (
                  <Text style={styles.keyText}>{key}</Text>
                )}
              </TouchableOpacity>
            )
          )}
          <View style={styles.divider2} />
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
  },
  headerIcon: {
    backgroundColor: "#E0F2F1",
    padding: 10,
    borderRadius: 30,
    marginVertical: 16,
  },
  headerText: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: "Inter-Bold",
  },
  subHeaderText: {
    color: "#606773",
    fontSize: 18,
    marginTop: 30,
    marginBottom: 16,
    fontFamily: "Inter-Medium",
  },
  pinContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 24,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 30,
    margin: 10,
    backgroundColor: "#C1C4CB",
  },
  filledDot: {
    backgroundColor: "#FA8A34",
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: width * 0.8,
    justifyContent: "space-between",
    position: "absolute",
    bottom: height * 0.1,
    marginTop: 30,
  },
  key: {
    width: width * 0.24,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    paddingVertical: 16,
  },
  keyText: {
    fontSize: 30,
    fontFamily: "Inter-ExtraBold",
  },
  continueButton: {
    backgroundColor: "#FA8A34",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
    position: "absolute",
    bottom: height * 0.02,
    left: width * 0.05,
    right: width * 0.05,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  divider1: {
    height: 1,
    backgroundColor: "#E6EBF5",
    width: width,
    left: -width*0.1,
  },
  divider2: {
    height: 1,
    backgroundColor: "#E6EBF5",
    width: width,
    left: -width*0.1,
    marginTop: 5,
    bottom: height * 0.1,
  },
});

export default PINScreen;
