import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("users/getOne", async (id) => {
  try {
    const { data } = await axios.get(`/api/admin/users/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    return error;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { sessions: [], orders: [] },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export default userSlice.reducer;
