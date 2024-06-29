import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { formatDistanceToNow } from "date-fns";
import { API_BASE_URL } from "@env";

const { width, height } = Dimensions.get("window");

const Post = ({ post }) => {
  const { content, createdAt, images, userId } = post;
  const { firstName, lastName, picturePath } = userId;
  const dateDifference = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: `${API_BASE_URL}/assets/${picturePath}` }}
          style={styles.profilePicture}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.postDate}>{dateDifference}</Text>
        </View>
      </View>
      <Text style={styles.content}>{content}</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `${API_BASE_URL}/assets/${item}` }}
            style={styles.postImage}
          />
        )}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (width * 90) / 100,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default Post;
