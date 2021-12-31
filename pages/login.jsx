/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/index";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, startLoading, stopLoading } from "store/admin-slice";
import { Admin } from "../lib/constants";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, { mutate }] = useCurrentUser();
  const [loginLoading, setLoginLoading] = useState(false);
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push("/dashboard");
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoginLoading(true);
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      setLoginLoading(false);
      const userObj = await res.json();
      mutate(userObj);
      toast.success("Login Successfully!");
      //   router.push('./art')
    } else {
      setLoginLoading(false);
      toast.error("Incorrect username or password. Try again!");
    }
  }

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/admins/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const resJson = await res.json();
    dispatch(stopLoading());

    console.log(resJson);
    const { success, message, data, token } = resJson;
    if (!success) return toast.info(message);
    if (success) {
      if (!data.isActive)
        return toast.info(
          "Your Account is De-Activated by SUPER-ADMIN. Please contact to superadmin@test.com"
        );
      toast.success(message);
      const loginPayload = { data, token };
      dispatch({ type: login, payload: loginPayload });
      console.log(data);

      if (data.isFirstLogin && data.role !== Admin.SUPER_ADMIN)
        return router.push("admins/reset-password");

      router.push("/dashboard");
    }
  };

  return (
    <>
      {/* <Head>
        <title>Sign in</title>
      </Head> */}
      {/* <h2>Sign in</h2> */}
      <div className="row g-0 app-auth-wrapper">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <a className="app-logo" href="index.html">
                  {/* <img
                    className="logo-icon me-2"
                    src="/assets/images/logo.png"
                    alt="logo"
                  ></img> */}
                </a>
              </div>
              <h2 className="auth-heading text-center mb-5">
                Log in to Portal
              </h2>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form login-form"
                  form
                  onSubmit={handleSubmitNew}
                >
                  <div className="email mb-3">
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control signin-email"
                      placeholder="Email address"
                      required="required"
                    />
                  </div>
                  <div className="password mb-3">
                    <label className="sr-only" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control signin-password"
                      placeholder="Password"
                      required="required"
                    />
                    {/* <div className="extra mt-3 row justify-content-between">
									<div className="col-6">
										<div className="form-check">
											<input className="form-check-input" type="checkbox" value="" id="RememberPassword" />
											<label className="form-check-label" htmlFor="RememberPassword">
											Remember me
											</label>
										</div>
									</div>
									<div className="col-6">
										<div className="forgot-password text-end">
											<a href="reset-password.html">Forgot password?</a>
										</div>
									</div>
								</div> */}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn app-btn-primary w-100 theme-btn mx-auto"
                    >
                      Log In
                      {loginLoading && (
                        <div className="spinner-border" role="status"></div>
                      )}
                    </button>
                  </div>
                </form>

                {/* <div className="auth-option text-center pt-5">No Account? Sign up <a className="text-link" href="signup.html" >here</a>.</div> */}
              </div>
            </div>

            <footer className="app-auth-footer">
              <div className="container text-center py-3">
                {/* <small className="copyright">Designed with <i className="fas fa-heart" style={{color:'#fb866a'}}></i> by <a className="app-link" href="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</a> for developers</small> */}
                <small className="copyright">
                  SMART NFT-Admin portal Manage Items and Physical NFTs
                </small>
              </div>
            </footer>
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col app-login">
          {/* <div className="auth-background-holder"></div>
          <div className="auth-background-mask"></div> */}

          <div className="auth-background-overlay p-3 p-lg-5">
            <div className="d-flex flex-column align-content-end h-100">
              <div className="h-100"></div>
              <div className="overlay-content p-3 p-lg-4 rounded">
                <h5 className="mb-2 overlay-title">SMART NFT Admin Portal</h5>
                <div>
                  SMART NFT Admin portal Manage Items and Physical NFTs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
