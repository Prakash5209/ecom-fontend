import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axios from "axios";

export const cartFetchData = createAsyncThunk(
  "cart/cartFetchData",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/cart/api/list/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sown_access")}`,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("error", error);
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/cart/api/cart-operation/${id}/`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sown_access")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("update error", error);
      throw error;
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartFetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cartFetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || "Unknown error occurred";
      })
      .addCase(cartFetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        console.log("update_field", action.payload);
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const cartReducer = cartSlice.reducer;
