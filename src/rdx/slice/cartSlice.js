import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const cartFetchData = createAsyncThunk(
  "cart/cartFetchData",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/cart/api/list/", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sown_access")}`,
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
            Authorization: `Bearer ${sessionStorage.getItem("sown_access")}`,
          },
        },
      );
      console.log("addtocart response", response);
      if (response.status === 201) {
        alert("status:product added to cart successfully");
      }
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        alert("Login gar pahile");
      } else if (error.response.status === 500) {
        alert("cannot addtocart : quantity more than stock");
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity, operation_status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/cart/api/cart-operation/${id}/`,
        { quantity, operation_status },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("sown_access")}`,
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

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ id }) => {
    const response = await axios.delete(
      `http://localhost:8000/cart/api/cart-operation/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sown_access")}`,
        },
      },
    );
    return id;
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
      // cart fetch data
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

      // add to cart item
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

      // update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })

      // delete cart item
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedItemid = action.payload;
        state.items = state.items.filter((item) => item.id !== deletedItemid);
      })

      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete item from cart";
      });
  },
});

export const cartReducer = cartSlice.reducer;
