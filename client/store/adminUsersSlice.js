import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  try {
    const { data } = await axios.get("/api/admin/users", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    return error;
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.allUsers = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.allUsers = payload.sort((a, b) => {
        return a.id - b.id;
      });
    });
  },
});

export default usersSlice.reducer;
