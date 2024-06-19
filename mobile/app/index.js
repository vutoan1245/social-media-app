import { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getUserData, deleteUserData } from "../utils/storage";

const Root = () => {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserData();

      if (user) {
        router.push("/(tabs)/home");
      }
      return user;
    };

    getUser();
  }, []);

  const onSignOut = () => {
    console.log("sign out  ");
    deleteUserData();
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
