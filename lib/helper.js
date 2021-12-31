/*eslint-disable*/

import Router from "next/router";
import { store } from "../store/index";

export function isLoginAndisFirstLogin(ctx) {
  //   console.log(store.getState()?.admin?.isLogin);
  //   console.log(store.getState()?.admin?.admin?.isFirstLogin);
  if (!store.getState()?.admin?.isLogin)
    return ctx.res.writeHead(302, { Location: "/login" });
  if (store.getState()?.admin?.admin?.isFirstLogin)
    return ctx.res.writeHead(302, { Location: "/admins/reset-password" });
  else {
    ctx.res.writeHead(302, { Location: "/dashboard" });
  }
}
