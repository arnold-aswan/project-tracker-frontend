import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "https://project-tracker-tvyu.onrender.com";

const initialState = {
  projectItems: [],
  loading: "idle",
  error: null,
};

// Get all Projects from the backend

export const getProjects = createAsyncThunk(
  // The name of the action
  "projects/getProjects",
  // The payload creator
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${baseUrl}/projects`);
      // console.log(res.data);
      return res.data;
    } catch (error) {
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
      toast.success("Project deleted successfully", {
        autoClose: 3000,
        theme: "colored",
      });
      return id;
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        theme: "colored",
      });
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectDetails, thunkApi) => {
    try {
      const res = await axios.post(`${baseUrl}/projects`, projectDetails);
      toast.success("Project added successfully", {
        autoClose: 3000,
        theme: "colored",
      });
      return res.data;
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        theme: "colored",
      });
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const projectSlice = createSlice({
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
      state.projectItems = action.payload;
    });

    builder.addCase(getProjects.rejected, (state, action) => {
      //  When data is fetched unsuccessfully
      state.loading = "failed";
      state.error = action.error;
    });

    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projectItems = state.projectItems.filter(
        (project) => project.id !== action.payload
      );
    });

    builder.addCase(addProject.fulfilled, (state, { payload }) => {
      state.projectItems = [...state.projectItems, payload];
    });
  },
});

export default projectSlice.reducer;
