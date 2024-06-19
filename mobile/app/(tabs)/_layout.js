import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { getUserData } from "../../utils/storage";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "@env";
import defaultProfilePic from "../../assets/defaultProfilePic.png";

export default function TabsLayout() {
  const [picturePath, setPicturePath] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const setProfilePicture = async () => {
      const userData = await getUserData();

      if (userData && userData.user && userData.user.picturePath) {
        setPicturePath(`${API_BASE_URL}/assets/${userData.user.picturePath}`);
      }
    };

    setProfilePicture();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push("/profile")}>
            {picturePath ? (
              <Image source={{ uri: picturePath }} style={styles.profilePic} />
            ) : (
              <Image
                source={defaultProfilePic}
                style={[styles.profilePic, styles.defaultProfilePic]}
              />
            )}
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    borderColor: "#f0f0f0",
    borderWidth: 1,
  },
  defaultProfilePic: {
    backgroundColor: "#f0f0f0",
  },
});
