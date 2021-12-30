/*eslint-disable*/

import React from "react";
import { useRouter } from "next/router";
import { addAdmin } from "service/admin-service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "store/admin-slice";

export default function AddAdmin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const showError = (err) => {
    if (err?.name) return err.name;
    if (err?.email) return err.email;
    if (err?.password) return err.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(startLoading());

    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const adminRes = await addAdmin({ name, email, password });
    console.log(adminRes);
    dispatch(stopLoading());
    if (!adminRes.success) return toast.error(() => showError(adminRes.error));

    if (adminRes.success) {
      toast.success("Admin Created");
      return router.push("/admins");
    }
  };
  return (
    <div className="container full-vh">
      <div className="row full-vh justify-content-center align-items-center">
        <div className="col-11 col-md-6 border p-5">
          <h1 className="mb-5">Add Admin</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>
            <div className="mb-3 mt-5">
              <input
                type="submit"
                className="form-control bg-dark text-white "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
