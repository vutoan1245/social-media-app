import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

// Async actions to interact with SecureStore
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const data = await SecureStore.getItemAsync("user_data");
    return data ? JSON.parse(data) : null;
  }
);

export const saveUserData = createAsyncThunk(
  "user/saveUserData",
  async (userData) => {
    await SecureStore.setItemAsync("user_data", JSON.stringify(userData));
    return userData;
  }
);

export const deleteUserData = createAsyncThunk(
  "user/deleteUserData",
  async () => {
    await SecureStore.deleteItemAsync("user_data");
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveUserData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteUserData.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export default userSlice.reducer;
