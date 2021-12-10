import React ,{useEffect} from "react";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import "bootstrap/dist/css/bootstrap.css";

import '../public/assets/css/portal.css'
import "../styles/globals.css";
import { useCurrentUser } from '@/hooks/index';
import LoginPage from './login';
import { ToastContainer } from "react-toastify";

import router from "next/router";
// import 'public/assets/css/portal.css';
// import 'public/assets/plugins/fontawesome/css/all.min.css'
export default function MyApp({ Component, pageProps }) {
  const [user, { mutate }] = useCurrentUser();


  // useEffect(() => {
  //   if(user===null){
  //       router.push('/login')
  //   }
  // }, [user])

  return (
    <>
 <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    <Layout>
      <Head>
        <title>Admin Portal</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}
