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

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (itemData, { rejectWithValue }) => {
    try {
      console.log("itemData", itemData);
      const response = await axios.post(
        "http://localhost:8000/cart/api/",
        itemData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sown_access")}`,
          },
        },
      );
      console.log("addtocart response", response);
      if (response.status === 200 || response.status === 201) {
        alert("status:product added to cart successfully");
      }
      return response.data;
    } catch (error) {
      if (error.response.status === 500) {
        alert("cannot addtocart: quantity more than stock");
      }
      return rejectWithValue(error.response.data);
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
      console.log("update cart item", response.data);
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
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add item to cart";
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
