import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ route }) => {
  const [loaded] = useFonts({
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
  });

  const navigation = useNavigation();
  const { user } = route.params;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
        const postsData = postsResponse.data;
        const postsWithCommentsAndImages = await Promise.all(postsData.map(async (post) => {
          const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
          const imageResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos/${post.id}`);
          post.comments = commentsResponse.data;
          post.image = imageResponse.data.url;
          return post;
        }));

        setPosts(postsWithCommentsAndImages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostsAndComments();
  }, []);

  const renderHeader = () => (
    <View>
      <View style={styles.orangeCanva}>
        <Text style={styles.yourName}>Your name</Text>
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.tileTestTask}>
        <Text style={styles.taskTitle}>Test task</Text>
        <Text style={styles.taskDescription}>Lorem ipsum</Text>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Go to call</Text>
          <Ionicons name="chevron-forward" size={25} color="#FA8A34" />
        </TouchableOpacity>
      </View>
      <View style={styles.stepsContainer}>
        <Text style={styles.header}>Before you Start</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          <View style={[styles.stepCard, { backgroundColor: "#666" }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.iconContainer}>
                <Ionicons name="link-outline" style={styles.linkIcon} size={24} color="#fff" />
              </View>
              <Text style={styles.stepText}>Lorem ipsum lorem ipsum</Text>
            </View>
            <View style={[styles.stepsContainer, { flexDirection: 'row', alignItems: 'center' }]}>
              <Text style={styles.stepCount}>2 steps</Text>
              <Ionicons name="arrow-forward" size={25} color="#fff" style={styles.arrow} />
            </View>
          </View >
          <View style={[styles.stepCard, { backgroundColor: "#EE6363" }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.iconContainer}>
                <Ionicons name="link-outline" style={styles.linkIcon} size={24} color="#00A385" />
              </View>
              <Text style={styles.stepText}>Lorem ipsum lorem ipsum</Text>
            </View>
            <View style={[styles.stepsContainer, { flexDirection: 'row', alignItems: 'center' }]}>
              <Text style={styles.stepCount}>3 steps</Text>
              <Ionicons name="arrow-forward" size={25} color="#fff" style={styles.arrow} />
            </View>
          </View >
        </ScrollView>
      </View>
      <Text style={styles.header}>Posts</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.post}
          onPress={() => navigation.navigate('PostDetail', { post: item })}
        >
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postContent}>{item.body}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  orangeCanva: {
    backgroundColor: "#FA8A34",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginBottom: 10,
  },
  name: {
    color: "#fff",
    fontFamily: "Inter-ExtraBold",
    fontSize: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  tileTestTask: {
    backgroundColor: "#fff",
    width: width * 0.9,
    alignSelf: "center",
    borderRadius: 16,
    marginVertical: 30,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  taskTitle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
  },
  taskDescription: {
    fontSize: 18,
    color: "#858C94",
    marginVertical: 5,
    flexDirection: "row",
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  callButtonText: {
    color: "#FA8A34",
    fontSize: 18,
    marginRight: 50,
    fontFamily: "Inter-SemiBold",
  },
  stepsContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    color: "#606773",
    fontFamily: "Inter-Medium",
    marginLeft: width * 0.05,
  },
  scrollContainer: {
    marginVertical: 10,
  },
  stepCard: {
    paddingHorizontal: 20,
    borderRadius: 16,
    paddingTop: 20,
    width: width * 0.6,
    justifyContent: "center",
    marginRight: 10,
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  linkIcon: {
    backgroundColor: "#FA8A34",
    padding: 10,
    borderRadius: 50,
  },
  stepText: {
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    flex: 1,
  },
  stepCount: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  arrow: {
    paddingLeft: 40,
  },
  post: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    width: width * 0.9,
    alignSelf: "center",
  },
  postTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    color: "#858C94",
    fontFamily: "Inter-Regular",
  },
});

export default HomeScreen;
