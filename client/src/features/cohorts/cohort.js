import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "https://project-tracker-tvyu.onrender.com";

const initialState = {
  classes: [],
  loading: "idle",
  error: null,
  selectedClass: null,
};

// Get Cohorts || Classes

export const getCohorts = createAsyncThunk(
  // name of the action
  "cohorts/getCohorts",
  // payload created
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${baseUrl}/classes`);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const addCohort = createAsyncThunk(
  "cohorts/addCohort",
  async (cohortDetails, thunkApi) => {
    try {
      const res = await axios.post(`${baseUrl}/classes`, cohortDetails);
      toast.success("Cohort added successfully", {
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

const cohortSlice = createSlice({
  name: "cohorts",
  initialState,
  reducers: {
    selectClass(state, { payload }) {
      state.selectedClass = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCohorts.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(getCohorts.fulfilled, (state, { payload }) => {
      state.loading = "successful";

      state.classes = payload;
    });

    builder.addCase(getCohorts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error;
    });

    builder.addCase(addCohort.fulfilled, (state, { payload }) => {
      state.classes = [...state.classes, payload];
    });
  },
});

export default cohortSlice.reducer;
export const { selectClass } = cohortSlice.actions;
