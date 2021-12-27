/*eslint-disable*/
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin-slice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
