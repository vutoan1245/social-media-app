import { Button } from "react-native";
import { Provider } from "react-redux";
import { Stack, router } from "expo-router";
import store from "../store/store";

export default function _layout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Home",
            headerRight: () => (
              <Button
                onPress={() => {
                  router.push("contact");
                }}
                title="Contact"
              />
            ),
          }}
        />
        <Stack.Screen
          name="blog/index"
          options={{ headerTitle: "All Blog Posts" }}
        />
        <Stack.Screen
          name="contact"
          options={{ headerTitle: "Contact", presentation: "modal" }}
        />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
