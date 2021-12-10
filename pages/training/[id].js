import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../components/layout/Navbar";

import router from "next/router";

const Details = ({ userData, ownerData, creatorData }) => {
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    if (user === null) router.replace("/login");
    console.log(userData);
  }, [user]);

  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div className="app-content">
            <div className="container-fluid">
              <div className="row g-4 settings-section">
                <h3 className="section-title"> Crypto Training Page Details</h3>
                <div className="col-12 col-md-4"></div>
                <div className="col-12 col-md-8 ">
                  <div className="app-card app-card-settings shadow-sm p-4 col-md-12 mb-3">
                    <div className="app-card-body">
                      <div className="mb-2">
                        <strong>Heading:</strong> {userData.heading}
                      </div>
                      <div className="mb-3">
                        <strong>Description:</strong> {userData.description}
                      </div>

                      <div className="mb-3">
                        <ul>
                          <li>
                            <strong>Video Url:</strong> {userData.videoUrl}
                          </li>
                        </ul>
                      </div>

                      {/* <div className="mb-3">
                      <strong>Contract Address:</strong><span  class= "d-inline-block text-truncate" style={{"max-width": "180px", verticalAlign:'middle'}}> {userData.ContractAddress}</span>
                    </div> */}
                    </div>
                  </div>
                  {/*  */}

                  {/*  */}
                </div>

                <div className="col-12 col-md-8 ">
                  <div className="app-card app-card-settings shadow-sm p-4 col-md-12 mb-3">
                    <div className="app-card-body">
                      <div className="mb-2">
                        <strong>Heading 2 :</strong> {userData.heading2}
                      </div>

                      {userData.section2Videos?.map((data, i) => (
                        <div key={i}>
                          <div className="mb-3">
                            <strong>Section 2 Videos:</strong>
                            <ul>
                              <li>
                                <strong>video Name:</strong> {data.videoName}{" "}
                                <br />
                                <strong>video Description:</strong>
                                {data.videoDescription} <br />
                                <strong>video URL:</strong> {data.videoUrl}{" "}
                                <br />
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}

                      {/* <div className="mb-3">
                      <strong>Contract Address:</strong><span  class= "d-inline-block text-truncate" style={{"max-width": "180px", verticalAlign:'middle'}}> {userData.ContractAddress}</span>
                    </div> */}
                    </div>
                  </div>
                  {/*  */}

                  {/*  */}
                </div>

                <div className="col-12 col-md-8 ">
                  <div className="app-card app-card-settings shadow-sm p-4 col-md-12 mb-3">
                    <div className="app-card-body">
                      <div className="mb-2">
                        <strong>Heading 3 :</strong> {userData.heading3}
                      </div>

                      {userData.section3videos?.map((data, i) => (
                        <div key={i}>
                          <div className="mb-3">
                            <strong>Section 3 Videos:</strong>
                            <ul>
                              <li>
                                <strong>video Name:</strong> {data.videoName}{" "}
                                <br />
                                <strong>video Description:</strong>
                                {data.videoDescription} <br />
                                <strong>video URL:</strong> {data.videoUrl}{" "}
                                <br />
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}

                      {/* <div className="mb-3">
                      <strong>Contract Address:</strong><span  class= "d-inline-block text-truncate" style={{"max-width": "180px", verticalAlign:'middle'}}> {userData.ContractAddress}</span>
                    </div> */}
                    </div>
                  </div>
                  {/*  */}

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
  const res = await fetch(`${process.env.BASE_URl}/api/admin/training/` + id);
  const data = await res.json();
  // const Ores = await fetch(`${process.env.BASE_URl}/api/admin/artist/details/` + OId);
  // const OData = await Ores.json();
  // const creatRes = await fetch(`${process.env.BASE_URl}/api/admin/artist/details/` + CId);
  // const Cdata = await creatRes.json();

  return {
    props: { userData: data },
  };
};
