import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const ButtonSign = ({ title, onPress, buttonStyle, textStyle }) => {
  const [loaded] = useFonts({
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});

export default ButtonSign;
