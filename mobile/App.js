import React from "react";
import { ClerkProvider } from "@clerk/clerk-react-native";
import { AuthProvider } from "./context/AuthContext";
import { ExpoRoot } from "expo-router";
import Constants from "expo-constants";

const frontendApi = Constants.manifest.extra.clerkFrontendApi;

export default function App() {
  const ctx = require.context("./app", true, /\.js$/);
  return (
    <ClerkProvider frontendApi={frontendApi}>
      <AuthProvider>
        <ExpoRoot context={ctx} />
      </AuthProvider>
    </ClerkProvider>
  );
}
