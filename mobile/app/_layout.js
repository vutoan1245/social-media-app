import { Provider } from "react-redux";
import { Stack } from "expo-router";
import store from "../store/store";

export default function _layout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
