/*eslint-disable*/

import React, { createContext, useEffect } from "react";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import NextNprogress from "nextjs-progressbar";
import "bootstrap/dist/css/bootstrap.css";

import "../public/assets/css/portal.css";
import "../styles/globals.css";
import { useCurrentUser } from "@/hooks/index";
import LoginPage from "./login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import router from "next/router";
import { Provider } from "react-redux";
import { store } from "../store/index";
// import 'public/assets/css/portal.css';
// import 'public/assets/plugins/fontawesome/css/all.min.css'

export const genContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [user, { mutate }] = useCurrentUser();
  const [global, setGlobal] = React.useState();
  const [loading, setLoading] = React.useState(false);

  // useEffect(() => {
  //   if(user===null){
  //       router.push('/login')
  //   }
  // }, [user])

  return (
    <>
      <NextNprogress height={6} color="orange" />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Provider store={store}>
        {/* <genContext.Provider value={{ global, setGlobal, loading, setLoading }}> */}
        <Layout>
          <Head>
            <title>Admin Portal</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
        {/* </genContext.Provider> */}
      </Provider>
    </>
  );
}
