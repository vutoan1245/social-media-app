import * as SecureStore from "expo-secure-store";

export const saveUserData = async (value) => {
  await SecureStore.setItemAsync("user_data", JSON.stringify(value));
};

export const getUserData = async () => {
  const data = await SecureStore.getItemAsync("user_data");
  return data ? JSON.parse(data) : null;
};

export const deleteUserData = async () => {
  await SecureStore.deleteItemAsync("user_data");
};
