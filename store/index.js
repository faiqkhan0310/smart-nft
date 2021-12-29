/*eslint-disable*/
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin-slice";

const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log(action);
  if (action.type?.type === "admin/login") {
    const adminState = store.getState().admin;
    localStorage.setItem("isLogin", JSON.stringify(adminState.isLogin));
    localStorage.setItem("admin", JSON.stringify(adminState.admin));
    localStorage.setItem("token", JSON.stringify(adminState.access_token));
  }
  if (action.type?.match("logout")) {
    localStorage.clear();
  }
  return result;
};

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
