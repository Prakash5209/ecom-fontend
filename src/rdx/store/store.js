import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./../slice/dataSlice.js";
import { cartReducer } from "./../slice/cartSlice.js";

const rootReducer = combineReducers({
  data: dataReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
