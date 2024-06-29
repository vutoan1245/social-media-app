import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Post from "./Post";

const PostList = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Post post={item} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default PostList;
