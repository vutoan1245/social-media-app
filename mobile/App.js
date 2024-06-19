import { ExpoRoot } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const ctx = require.context("./app", true, /.js$/);
  return (
    <AuthProvider>
      <ExpoRoot context={ctx} />
    </AuthProvider>
  );
}
