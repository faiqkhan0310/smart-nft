import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// import { useCurrentUser } from '@/hooks/index';
import Head from "next/head";
export function Layout({ children }) {
  // const [user, { mutate }] = useCurrentUser();
  return (
    <>
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
