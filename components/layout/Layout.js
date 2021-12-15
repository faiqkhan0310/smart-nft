/*eslint-disable*/

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useContext } from "react";

// import { useCurrentUser } from '@/hooks/index';
import Head from "next/head";
import { genContext } from "pages/_app";

export function Layout({ children }) {
  const context = useContext(genContext);
  // const [user, { mutate }] = useCurrentUser();
  return (
    <>
      {context?.loading && <div id="cover-spin"></div>}

      <div>
        {/* <Head>
        <title>Bitxmi Admin</title>
        <meta name="description" content="Bitxmi Admin Panel for Stacking" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
        {/* {user !== null &&   <Navbar></Navbar>} */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">{children}</div>
          </div>
        </section>
        {/* <Footer></Footer> */}
      </div>
    </>
  );
}
