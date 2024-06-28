import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ButtonSign from '../components/ButtonSign';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <ButtonSign
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
        buttonStyle={styles.signInButton}
        textStyle={styles.signInButtonText}
      />
      <ButtonSign
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        buttonStyle={styles.signUpButton}
        textStyle={styles.signUpButtonText}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
  },
  signUpButton: {
    backgroundColor: '#FA8A34',
    width: width - 40,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white'
  },
  signInButton: {
    backgroundColor: 'transparent',
    width: width - 40,
    marginBottom: 10,
  },
  signInButtonText: {
    color: '#FA8A34'
  },
});
