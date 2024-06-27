import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { registerUser } from "../utils/api";

const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      if (image) {
        formData.append("picture", {
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      }

      const response = await registerUser(formData);

      if (response.status === 201) {
        router.push("/sign-in");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to register");
      }
    } catch (error) {
      setError("Failed to register");
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
        Register
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="First Name"
        placeholderTextColor={colorScheme === "dark" ? "#bbb" : "#555"}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Last Name"
        placeholderTextColor={colorScheme === "dark" ? "#bbb" : "#555"}
        value={lastName}
        onChangeText={setLastName}
      />
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
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Confirm Password"
        placeholderTextColor={colorScheme === "dark" ? "#bbb" : "#555"}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Register"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/sign-in")}>
        <Text style={styles.link}>Back to Login</Text>
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

export default RegisterScreen;
