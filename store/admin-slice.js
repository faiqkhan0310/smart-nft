/*eslint-disable*/
import { createSlice } from "@reduxjs/toolkit";

const rehydrateAdmin = () => {
  if (typeof window != "undefined") {
    if (localStorage.getItem("admin"))
      return JSON.parse(localStorage.getItem("admin"));
    else return [];
  }
};
const rehydrateisLogin = () => {
  if (typeof window != "undefined") {
    if (localStorage.getItem("isLogin"))
      return JSON.parse(localStorage.getItem("isLogin"));
    else return false;
  }
};

// const rehydrateToken = () => {
//   if (typeof window != "undefined") {
//     if (localStorage.getItem("token"))
//       return JSON.parse(localStorage.getItem("token"));
//     else return false;
//   }
// };

const initialState = {
  isLogin: rehydrateisLogin(),
  token: "",
  admin: rehydrateAdmin(),
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
    updateAdmin: (state, action) => {
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
export const {
  login,
  updateAdmin,
  logout,
  setPublicAddress,
  startLoading,
  stopLoading,
} = counterSlice.actions;

export default counterSlice.reducer;
