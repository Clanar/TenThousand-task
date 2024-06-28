import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const PostDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.image }} style={styles.image} /> 
        </View>
        <Text style={styles.header}>About</Text>
        <Text style={styles.body}>{post.body}</Text>
        <Text style={styles.header}>Comments</Text>
        {post.comments ? (
          post.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentName}>{comment.name}</Text>
              <Text style={styles.commentEmail}>{comment.email}</Text>
              <Text style={styles.commentBody}>{comment.body}</Text>
            </View>
          ))
        ) : (
          <Text>No comments available.</Text>
        )}
        <TouchableOpacity
          style={styles.backButtonBottom}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-ExtraBold',
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 16, 
  },
  body: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    color: '#606773',
  },
  comment: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  commentName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 5,
  },
  commentEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 5,
  },
  commentBody: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  backButtonBottom: {
    backgroundColor: "#FA8A34",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});


export default PostDetailScreen;