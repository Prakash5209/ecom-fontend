import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories/");
      console.log(response.data.result);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  },
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload || [];
        console.log("action", action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred";
        console.error("Fetch failed:", state.error);
      });
  },
});

export const dataReducer = dataSlice.reducer;
