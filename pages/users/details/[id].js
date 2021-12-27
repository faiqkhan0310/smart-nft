import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../../components/layout/Navbar";
import Link from "next/link";

import router from "next/router";

const Details = ({ userData }) => {
  console.log(userData, "userData");
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // if (user === null) router.replace("/login");
  });
  return (
    <>
      {userData != null && (
        <>
          <Navbar />
          <div className="app-content">
            <div className="container-fluid">
              <div className="row g-4 justify-content-center  settings-section">
                <h3 className="section-title text-center">
                  {" "}
                  User: {userData._id}
                </h3>
                {/* <div className="col-12 col-md-4">
                        <div className="section-intro">
                             <img className="img-fluid" src={userData.Url} /> 
                        </div>
                    </div>*/}
                <div className="col-12 col-md-8">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <div className="mb-3">
                        <strong>Artist Name:</strong> {userData.ArtistName}
                      </div>
                      <div className="mb-2">
                        <strong>Nonce:</strong> {userData.nonce}
                      </div>
                      <div className="mb-3">
                        <strong>PublicAddress:</strong> {userData.PublicAddress}
                      </div>

                      <div className="mb-3">
                        <strong>Created At:</strong>{" "}
                        {new Intl.DateTimeFormat("en-AE", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }).format(new Date(userData.createdAt))}
                      </div>
                      <div className="mb-3">
                        <strong>Status</strong>{" "}
                        {userData.status == true ? (
                          <strong className="text-danger">Blocked</strong>
                        ) : (
                          <strong className="text-success">Active</strong>
                        )}
                      </div>

                      <div className="mb-3">
                        <strong>Email </strong>{" "}
                        {userData.isEmailVerified == true ? (
                          <strong className="text-success">Verified</strong>
                        ) : (
                          <strong className="text-danger"> Not Verified</strong>
                        )}
                      </div>

                      <div className="mb-3">
                        <strong>Membership Status </strong>{" "}
                        {userData.memberStatus == true ? (
                          <strong className="text-success">Active</strong>
                        ) : (
                          <strong className="text-danger"> Pending</strong>
                        )}
                      </div>

                      <div className="mb-3">
                        <strong>Creator Status </strong>{" "}
                        {userData.isCreator == true ? (
                          <strong className="text-success">Active</strong>
                        ) : (
                          <strong className="text-danger"> Pending</strong>
                        )}
                      </div>

                      <div className="mb-3">
                        {/* <strong>Portfolio Link </strong>{" "} */}

                        {/* <Link href={userData.portfolio}>
                          <a>{userData.portfolio}</a>
                        </Link> */}
                      </div>
                      {/* <div className="mb-3">
                                    <strong>Total Minted:</strong> {userData.totalMinted}
                                </div> */}
                      {/*
          
        <div className="mb-3">
          <strong>Contract Address:</strong> {userData.ContractAddress}
        </div> */}

                      <div className="row justify-content-between">
                        {/* <div  className="col-auto">
                            <a  className="btn app-btn-primary" href="#">Upgrade Plan</a>
                        </div>
                        <div  className="col-auto">
                            <a  className="btn app-btn-secondary" href="#">Cancel Plan</a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    `${process.env.BASE_URl}/api/admin/artist/details/${id}`
  );
  const data = await res.json();
  return {
    props: { userData: data },
  };
};
