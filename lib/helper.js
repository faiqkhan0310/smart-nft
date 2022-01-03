/*eslint-disable*/

import Router from "next/router";
import { store } from "../store/index";

export function isLoginAndisFirstLogin(ctx) {
  //   console.log(store.getState()?.admin?.isLogin);
  //   console.log(store.getState()?.admin?.admin?.isFirstLogin);
  if (!store.getState()?.admin?.isLogin) return Router.push("/login");
  if (store.getState()?.admin?.admin?.isFirstLogin)
    return Router.push("/admins/reset-password");
  else {
    return Router.push("/dashboard");
  }
}
