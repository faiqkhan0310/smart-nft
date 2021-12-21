import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../components/layout/Navbar";

import router from "next/router";

const Details = ({ userData, ownerData, creatorData }) => {
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    if (user === null) router.replace("/login");
  }, [user]);
  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div className="app-content">
            <div className="container-fluid">
              <div className="row g-4 settings-section">
                <h3 className="section-title"> Item Details</h3>
                <div className="col-12 col-md-4">
                  <div className="section-intro">
                    <img className="img-fluid" src={userData.Url} />
                  </div>
                </div>
                <div className="col-12 col-md-8 ">
                  <div className="app-card app-card-settings shadow-sm p-4 col-md-12 mb-3">
                    <div className="app-card-body">
                      <div className="mb-2">
                        <strong>Name:</strong> {userData.name}
                      </div>
                      <div className="mb-3">
                        <strong>Category:</strong> {userData.Category}
                      </div>
                      <div className="mb-3">
                        <strong>Price:</strong> {userData.Price}
                      </div>
                      <div className="mb-3">
                        <strong>Created At:</strong> {userData.createdAt}
                      </div>
                      <div className="mb-3">
                        <strong>Description:</strong> {userData.Description}
                      </div>
                      {/* <div className="mb-3">
                      <strong>Contract Address:</strong><span  className= "d-inline-block text-truncate" style={{"max-width": "180px", verticalAlign:'middle'}}> {userData.ContractAddress}</span>
                    </div> */}
                      <div className="mb-3">
                        <strong>Transaction Hash:</strong>{" "}
                        <span
                          className="d-inline-block text-truncate"
                          style={{
                            "max-width": "180px",
                            verticalAlign: "middle",
                          }}
                        >
                          {" "}
                          {userData.MintTransaction}
                        </span>
                      </div>
                      <div className="mb-3">
                        <strong>NFT Id:</strong> {userData.NFTId}
                      </div>

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
                  {/*  */}
                  <div className="row">
                    <div className=" col-12 col-md-6 ">
                      <div className="app-card app-card-settings shadow-sm p-4 ">
                        <div className="app-card-body">
                          <div className="mb-2">
                            <strong>Owner Name:</strong> {ownerData.ArtistName}
                          </div>
                          <div className="mb-3">
                            <strong>Address:</strong>{" "}
                            <a
                              className="d-inline-block text-truncate"
                              style={{
                                "max-width": "180px",
                                verticalAlign: "middle",
                              }}
                              href={`https://www.bxminft.com/art/${ownerData.PublicAddress}`}
                              target="_blank"
                            >
                              {" "}
                              {ownerData.PublicAddress}
                            </a>
                          </div>
                          <div className="mb-3">
                            <strong>Created At::</strong> {ownerData.createdAt}
                          </div>

                          <div className="mb-3">
                            {/* <strong>Contract Address:</strong> {userData.ContractAddress} */}
                          </div>

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
                    <div className="col-12 col-md-6">
                      <div className="app-card app-card-settings shadow-sm p-4">
                        <div className="app-card-body">
                          <div className="mb-2">
                            <strong>Creator Name:</strong>{" "}
                            {creatorData.ArtistName}
                          </div>
                          <div className="mb-3">
                            <strong>Address:</strong>{" "}
                            <a
                              className="d-inline-block text-truncate"
                              style={{
                                "max-width": "180px",
                                verticalAlign: "middle",
                              }}
                              href={`https://www.bxminft.com/art/${creatorData.PublicAddress}`}
                              target="_blank"
                            >
                              {" "}
                              {creatorData.PublicAddress}
                            </a>
                          </div>
                          {/* <div className="mb-3">
                      <strong>Price BNB:</strong> {userData.PriceBNB}
                    </div> */}
                          <div className="mb-3">
                            <strong>Created At:</strong> {creatorData.createdAt}
                          </div>
                          {/* <div className="mb-3">
                      <strong>Description:</strong> {userData.Description}
                    </div> */}
                          <div className="mb-3">
                            {/* <strong>Contract Address:</strong> {userData.ContractAddress} */}
                          </div>

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

                  {/*  */}
                </div>

                {/*   */}

                {/*  */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;

// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:3000/api/admin/art");
//   const data = await res.json();

//   const paths = data.map((user_id) => {
//     return {
//       params: { id: user_id._id.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  const { id, OId, CId } = context.query;
  const res = await fetch(`${process.env.BASE_URl}/api/admin/item/` + id);
  const data = await res.json();
  const Ores = await fetch(
    `${process.env.BASE_URl}/api/admin/artist/details/` + OId
  );
  const OData = await Ores.json();
  const creatRes = await fetch(
    `${process.env.BASE_URl}/api/admin/artist/details/` + CId
  );
  const Cdata = await creatRes.json();

  return {
    props: { userData: data, ownerData: OData, creatorData: Cdata },
  };
};
