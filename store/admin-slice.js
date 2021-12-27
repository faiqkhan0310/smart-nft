/*eslint-disable*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  token: "",
  admin: [],
  publicAddress: undefined,
  loading: false,
};

export const counterSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.isLogin = true;
      state.token = action.payload.token;
      state.admin = action.payload.data;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = undefined;
      state.admin = undefined;
      state.publicAddress = undefined;
    },
    setPublicAddress: (state, payload) => {
      state.publicAddress = payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setPublicAddress, startLoading, stopLoading } =
  counterSlice.actions;

export default counterSlice.reducer;
