import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://project-tracker-tvyu.onrender.com";

const initialState = {
  projectItems: [],
  loading: "idle",
  error: null,
  // | "pending" | "succeeded" | "failed",
};

// Get all Projects from the backend

export const getProjects = createAsyncThunk(
  // The name of the action
  "projects/getProjects",
  // The payload creator
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${baseUrl}/projects`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error, "something went wrong");
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

// Delete project by ID

export const deleteProject = createAsyncThunk(
  // name of the action type
  "projects/deleteProject",
  async (id, thunkApi) => {
    try {
      await axios.delete(`${baseUrl}/project/${id}`);
      console.log("successfully deleted project");
      return id;
    } catch (error) {
      console.log("Error deleting project", error);

      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      // when data is being fetched from the server
      state.loading = "loading";
    });

    builder.addCase(getProjects.fulfilled, (state, action) => {
      // When data is fetched successfully
      state.loading = "successful";
      console.log(action);
      state.projectItems = action.payload;
    });

    builder.addCase(getProjects.rejected, (state, action) => {
      //  When data is fetched unsuccessfully
      state.loading = "failed";
      console.log(action);
      state.error = action.error;
    });

    builder.addCase(deleteProject.fulfilled, (state, action) => {
      console.log(action);
      state.projectItems = state.projectItems.filter(
        (project) => project.id !== action.payload
      );
    });
  },
});

export default projectSlice.reducer;
