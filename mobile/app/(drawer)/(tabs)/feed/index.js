import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../../store/userSlice";
import { fetchPosts } from "../../../../utils/api";
import PostList from "../../../../components/PostLIst";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      const callFetch = async () => {
        try {
          const data = await fetchPosts(token?.data?.token);
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      };

      callFetch();
    }
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Feed Page</Text>
      <View>
        <PostList posts={posts} />
      </View>

      <Button title="Refresh" onPress={() => dispatch(fetchUserData())} />
    </View>
  );
}
