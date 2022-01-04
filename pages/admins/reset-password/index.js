/*eslint-disable*/

import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { updateAdmin } from "service/admin-service";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
  updateAdmin as UA,
} from "store/admin-slice";
import bcrypt from "bcryptjs";
import { isLoginAndisFirstLogin } from "@/lib/helper";

export default function ResetPassword() {
  // isLoginAndisFirstLogin();
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    let password = e.currentTarget.password.value;
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    const res = await updateAdmin(
      state?.admin?.id,
      {
        password: password,
        isFirstLogin: false,
      },
      state.token
    );
    console.log(res.data[1]);
    dispatch(stopLoading());
    const loginPayload = { data: res.data[1] };
    dispatch({ type: UA, payload: loginPayload });
    if (!res.success) return toast.error(res.message);
    if (res.success) {
      toast.info("Admin password updated");
      return router.push("/dashboard");
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center full-vh">
        <div className="col-11 sm-8 col-md-6 border p-5">
          <h6 className="mb-5">Please change your passowrd.</h6>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="submit"
                className="form-control bg-dark text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
