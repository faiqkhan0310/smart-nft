import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "../../../hooks/user";
import router from "next/router";
import { Navbar } from "../../../components/layout/Navbar";

import AdminAddressCreate from "../../../components/admin-addresses/create-address";
// const [user, { mutate }] = useCurrentUser();

const CreateAdmin = () => {
//   useEffect(() => {
//     if (user === null) router.replace("/login");
//   }, [user]);
  return (
    <>
      <Navbar 
      AddressesActive="active"
      />
        <div className="app-content">
          <AdminAddressCreate />
        </div>
      {/* <h1> create admin</h1> */}
    </>
  );
};

export default CreateAdmin;
