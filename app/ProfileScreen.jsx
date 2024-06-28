import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/1');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Settings</Text>
      {user && (
        <>
          <View style={styles.userContainer}>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
          </View>
          <Text style={styles.smallHeader}>Basic</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LanguageScreen')}>
              <Ionicons name="globe-outline" size={24} color="#FA8A34" />
              <Text style={styles.menuText}>Language</Text>
              <Ionicons name="chevron-forward" size={24} color="#CED5E0" />
            </TouchableOpacity>
          </View>
          <Text style={styles.smallHeader}>Other</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Main')}>
              <MaterialCommunityIcons name="logout" size={24} color="#FA8A34" />
              <Text style={styles.menuText}>Log Out</Text>
              <Ionicons name="chevron-forward" size={24} color="#CED5E0" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
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
  smallHeader: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 20,
    color: "#606773",
    marginVertical: 5,
  },
  userContainer: {
    borderColor: '#CED5E0',
    flexDirection: 'row',
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  avatar: {
    width: width * 0.15,
    height: height * 0.08,
    borderRadius: 30,
  },
  userName: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: '500',
  },
  menuContainer: {
    borderColor: '#CED5E0',
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
