/*eslint-disable*/
import React, { useEffect } from "react";
import { useCurrentUser } from "@/hooks/index";
import { Link } from "next/link";
import { router } from "next/router";
import AllUser from "../../components/usersCompnent/AllUser";
import Edit from "../../components/usersCompnent/Edit";
// import { Navbar } from "../../components/layout/Navbar";
import useForm from "../../hooks/useForm";

const Users = ({ users, totalRecord }) => {
  //buisness logic
  const { handleChange, form, setForm } = useForm("");
  useEffect(() => {
    console.log("usererere", users);
  }, []);

  return (
    <>
      <AllUser
        users={users}
        totalRecord={totalRecord}
        handleChange={handleChange}
        form={form}
      />
      <Edit />
    </>
  );
};

export default Users;

export async function getServerSideProps() {
  const url = `${process.env.BASE_URl}/api/admin/artist?limit=10&skip=1`;
  const res = await fetch(url);
  const { artists, totalRecord } = await res.json();
  console.log("wah");
  console.log(totalRecord, artists);
  return {
    props: { users: artists, totalRecord },
  };
}
