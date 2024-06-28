import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Language</Text>
      <TouchableOpacity
        style={[
          styles.languageOption,
          selectedLanguage === 'English' && styles.selectedOption,
        ]}
        onPress={() => selectLanguage('English')}
      >
        <View style={styles.languageContainer}>
        <Ionicons name="globe-outline" size={24} color="#FA8A34" />
          <Text style={styles.languageText}>English</Text>
        </View>
        <View style={styles.iconContainer}>
          {selectedLanguage === 'English' ? (
            <Ionicons name="checkmark-circle" size={24} color="orange" />
          ) : (
            <Ionicons name="ellipse" size={24} color="#EBEFF5" />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.languageOption,
          selectedLanguage === 'Arabic' && styles.selectedOption,
        ]}
        onPress={() => selectLanguage('Arabic')}
      >
        <View style={styles.languageContainer}>
        <Ionicons name="globe-outline" size={24} color="#FA8A34" />
          <Text style={styles.languageText}>Arabic</Text>
        </View>
        <View style={styles.iconContainer}>
          {selectedLanguage === 'Arabic' ? (
            <Ionicons name="checkmark-circle" size={24} color="orange" />
          ) : (
            <Ionicons name="ellipse" size={24} color="#EBEFF5" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    borderColor: '#CED5E0',
    borderRadius: 16,
    marginBottom: 20,
  },
  selectedOption: {
    borderColor: '#FA8A34',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 18,
    marginLeft: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LanguageScreen;
