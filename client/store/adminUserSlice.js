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
    try {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          "Authorization": localStorage.getItem("token"),
          "sessionId": localStorage.getItem("session_id"),
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { sessions: [], orders: [], email: "", phone: "" },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      if (payload != null) {
        state.user = payload;
      } else {
        state.user = { sessions: [], orders: [], email: "", phone: "", doesNotExist: true };
      }
    });
  },
});

export default userSlice.reducer;
