/*eslint-disable*/

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../components/layout/Navbar";

import router from "next/router";

const Details = ({ creatorData, artistData }) => {
  console.log(artistData[0]);
  console.log(creatorData);
  const [user, { mutate }] = useCurrentUser();

  return (
    <>
      <>
        <Navbar />
        <div className="app-content">
          <div className="container-fluid">
            <div className="row g-4 settings-section">
              <h3 className="section-title"> Artist Details</h3>
              <div className="col-12 col-md-4">
                <div className="section-intro">
                  <img className="img-fluid" src={artistData[0].Url} />
                  <div className="mb-2">
                    <strong>Name:</strong> {artistData[0].ArtistName}
                  </div>
                </div>
              </div>
              <h3 className="section-title"> Creator Detail</h3>
              <div className="col-12 col-md-8 ">
                <div className="app-card app-card-settings shadow-sm p-4 col-md-12 mb-3">
                  <div className="app-card-body">
                    <div className="mb-2">
                      <strong>Name:</strong> {creatorData[0].name}
                    </div>
                    <div className="mb-3">
                      <strong>Email:</strong> {creatorData[0].email}
                    </div>

                    <div className="mb-3">
                      <strong>Country:</strong> {creatorData[0].country}
                    </div>
                    <div className="mb-3">
                      <a target="_blank" href={creatorData[0].insta_link}>
                        <strong>Instagram Link:</strong>{" "}
                        {creatorData[0].insta_link}
                      </a>
                    </div>
                    <div className="mb-3">
                      <a target="_blank" href={creatorData[0].portfolio_link}>
                        <strong>Portfolio Link:</strong>{" "}
                        {creatorData[0].portfolio_link}
                      </a>
                    </div>

                    <div className="row justify-content-between"></div>
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
    </>
  );
};

export default Details;

export const getServerSideProps = async (context) => {
  const { id, CId } = context.query;
  const res = await fetch(`${process.env.BASE_URl}/api/creator/${id}`);
  const data = await res.json();

  const creatRes = await fetch(
    `${process.env.BASE_URl}/api/admin/artist/details/` + CId
  );
  const Cdata = await creatRes.json();

  return {
    props: { creatorData: data.creator, artistData: Cdata },
  };
};
