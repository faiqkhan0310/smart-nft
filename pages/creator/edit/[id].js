/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../../components/layout/Navbar";

const Details = ({ userData }) => {
  const router = useRouter();

  const [accepted, setAccepted] = useState(false);
  const [rejectd, setRejected] = useState(false);
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, SetEmail] = useState("");
  const [creatorId, setCreatorId] = useState(undefined);
  const [creator, setCreator] = useState([]);
  const [artistId, setArtistId] = useState(undefined);
  const handleRadio = (event) => {
    const { name } = event.target;
    if (name === "accept") {
      setPending(false);
      setAccepted(true);
      setRejected(false);
    }
    if (name === "reject") {
      setPending(false);
      setRejected(true);
      setAccepted(false);
    }
  };

  const sendEmail = async (text) => {
    try {
      const res = await fetch("/api/mail", {
        body: JSON.stringify({
          email: email,
          subject: "Creator Request",
          html: `
      <h4 style={{display: 'flex' , justifyContent: 'center' , color: 'green'}}>${text}</h4>
      `,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [user, { mutate }] = useCurrentUser();
  const deleteCreataorRequest = async (status) => {
    try {
      const body = { status: status };
      const res = await fetch(
        `${process.env.BASE_URl}/api/creator/${creatorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const createDeleteJson = await res.json();
      setLoading(false);
      if (createDeleteJson.success) {
        router.push("/creator");
      }
      return;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const artistUpdate = async (artistId, body) => {
    console.log(" artist ;udpate");
    console.log(body);
    try {
      const res = await fetch(
        `${process.env.BASE_URl}/api/admin/artist/update/${artistId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const artistUpateJson = await res.json();
      console.log(artistUpateJson);
      return artistUpateJson;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accepted) {
      setLoading(true);
      const body = { creatorRequest: 2, isCreator: true };
      const artistRes = await artistUpdate(artistId, body);
      if (artistRes.success) {
        setLoading(false);
        sendEmail(
          "Your Creator request accepted please logout and login again to unlock NFT cration service."
        );
        deleteCreataorRequest(1);
        return;
      }
      setLoading(false);
      console.log(artistRes);
    }
    if (rejectd) {
      setLoading(true);
      const body = { creatorRequest: 3, isCreator: false };
      const artistRes = await artistUpdate(artistId, body);
      if (artistRes.success) {
        setLoading(false);
        sendEmail(
          "Your request for NFT creation is rejected please logout and login again to send a new request."
        );
        deleteCreataorRequest(2);
        return;
      }
      setLoading(false);
      console.log(artistRes);
    }
  };

  useEffect(() => {
    if (creator) {
      const [creatorObj] = creator;
      if (creatorObj?.status === 1) {
        setAccepted(true);
        setRejected(false);
        setPending(false);
        return;
      }

      if (creatorObj?.status === 2) {
        setRejected(true);
        setAccepted(false);
        setPending(false);
        return;
      } else {
        setRejected(false);
        setAccepted(false);
        setPending(true);
      }
    }
  }, [creator]);

  useEffect(async () => {
    const { id, CId, Email } = router.query;
    setArtistId(CId);
    SetEmail(Email);
    if (!id) return;
    setCreatorId(id);
    try {
      const res = await fetch(`${process.env.BASE_URl}/api/creator/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resJson = await res.json();
      console.log(resJson);
      setCreator(resJson.creator);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div className="page-wrapper">
            <div className="edit-page main-col">
              <div className="app-content">
                <div className="container-fluid">
                  <h3 className="section-title">Request</h3>

                  <div className="col-12 col-md-12">
                    <div className="app-card app-card-settings shadow-sm p-4">
                      <div className="app-card-body">
                        <form className="settings-form" onSubmit={handleSubmit}>
                          <div className="d-flex justify-content-center labl">
                            <div>
                              <label className="accept">
                                Accept
                                <input
                                  name="accept"
                                  checked={accepted}
                                  onClick={handleRadio}
                                  className="ms-3 radio me-5"
                                  type="radio"
                                />
                              </label>
                            </div>
                            <div>
                              <label className="reject">
                                Reject
                                <input
                                  checked={rejectd}
                                  name="reject"
                                  onClick={handleRadio}
                                  className="ms-3 radio"
                                  type="radio"
                                />
                              </label>
                            </div>
                          </div>
                          <div className="d-flex mt-5 justify-content-center">
                            <button
                              type="submit"
                              className="btn w-50 app-btn-primary"
                            >
                              Save Changes
                              {loading && (
                                <div
                                  className="spinner-border ms-4"
                                  role="status"
                                ></div>
                              )}
                            </button>
                          </div>
                        </form>
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
