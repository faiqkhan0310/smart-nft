/*eslint-disable*/

import React from "react";
import { useRouter } from "next/router";
import { getOneAdmin, updateAdmin } from "service/admin-service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "store/admin-slice";

export default function AddAdmin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(startLoading());

    const adminRes = await updateAdmin(
      router.query.id,
      {
        name,
        email,
      },
      state.token
    );
    console.log(adminRes);
    dispatch(stopLoading());
    if (!adminRes.success) return toast.error(adminRes.message);

    if (adminRes.success) {
      toast.success(adminRes.message);
      return router.push("/admins");
    }
  };

  const getAdmin = async () => {
    const adminRes = await getOneAdmin(router.query.id, state.token);
    if (!adminRes.success) return toast.error(adminRes.message);
    if (adminRes.success) {
      const { name, email, password } = adminRes.data;
      setName(name);
      setEmail(email);
      //   setPassword(password);
    }
  };
  React.useEffect(() => {
    getAdmin();
  }, []);
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
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                required
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                name="password"
                required
              />
            </div> */}
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
