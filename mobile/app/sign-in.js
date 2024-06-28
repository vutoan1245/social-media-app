import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { loginUser } from "../utils/api";
import { saveUserData } from "../store/userSlice";

const LoginScreen = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await loginUser(email, password);
      dispatch(saveUserData(response.data));
      router.push("/(drawer)/(tabs)/feed");
    } catch (error) {
      setError("Failed to login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text
        style={[
          styles.title,
          colorScheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Login
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Email"
        placeholderTextColor={colorScheme === "dark" ? "#bbb" : "#555"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Password"
        placeholderTextColor={colorScheme === "dark" ? "#bbb" : "#555"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text style={styles.link}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  lightContainer: {
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: "#333",
    color: "#fff",
  },
  lightInput: {
    backgroundColor: "#fff",
    color: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#1c8ef9",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#1c8ef9",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LoginScreen;
