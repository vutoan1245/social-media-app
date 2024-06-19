import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { View, Text } from "react-native";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return children;
}
