import { View, Text, Pressable } from "react-native";
import { getToken } from "../utils/storage";
import { Link, router, useRouter } from "expo-router";
import { useEffect } from "react";
import { removeToken } from "../utils/storage";

const Root = () => {
  const router = useRouter();
  console.log(getToken());
  const isAuthenticated = Boolean(getToken());

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated]);

  const onSignOut = () => {
    console.log("sign out  ");
    removeToken();
    router.replace("/sign-in");
  };

  return (
    <View>
      <Text>Root</Text>
      <Pressable onPress={() => onSignOut()}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default Root;
