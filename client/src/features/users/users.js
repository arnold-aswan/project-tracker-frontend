import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  students: [],
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  loading: "idle",
  loginStatus: "idle",
  error: null,
};

const baseUrl = "https://project-tracker-tvyu.onrender.com";

export const getStudents = createAsyncThunk(
  "users/getStudents",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${baseUrl}/students`);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const signUp = createAsyncThunk(
  "users/signUp",
  async (userDetails, thunkApi) => {
    try {
      const res = await axios.post(`${baseUrl}/signUp`, userDetails);

      return res.data;
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error.res.data.message, {
        autoclose: 3000,
        theme: "colored",
      });
      console.log(error);
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (loginDetails, thunkApi) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, loginDetails);

      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("isLoggedIn", "true");

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoclose: 3000,
        theme: "colored",
      });
      console.log(error);
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudents.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(getStudents.fulfilled, (state, { payload }) => {
      state.loading = "successful";
      state.students = payload;
    });

    builder.addCase(getStudents.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error;
    });

    builder.addCase(signUp.fulfilled, () => {});

    builder.addCase(login.pending, (state) => {
      state.loginStatus = "loading";
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loginStatus = "successful";
      payload.access_token
        ? (state.isLoggedIn = true)
        : (state.isLoggedIn = false);
    });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
