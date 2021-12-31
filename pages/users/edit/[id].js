/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../../components/layout/Navbar";

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  console.log("localPort", id);
  const res = await fetch(
    `${process.env.BASE_URl}/api/admin/artist/details/${id}`
  );
  const data = await res.json();
  return {
    props: { userData: data },
  };
};

const Details = ({ userData }) => {
  const editaDetals = userData;
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [status, setStatus] = useState(false);
  const [member, setMember] = useState(false);
  const [creator, setCreator] = useState(false);

  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // if (user === null) useRouter.replace("/login");
  }, [user]);

  useEffect(() => {
    console.log(`userData`, userData);
    setdescription(userData.Description);
    setName(userData.ArtistName);
    setStatus(userData.status);
    setMember(userData.memberStatus);
    setCreator(userData.isCreator);

    // if(userData.Status==='true'){
    //   setStatus(true)
    // } else{
    //  setStatus(false)
    // }
  }, []);

  useEffect(() => {}, [status, member]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDiscription = (e) => {
    setdescription(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handlememberStatus = (e) => {
    setMember(e.target.checked);
  };

  const handlecreatorStatus = (e) => {
    setCreator(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ArtistName: name,
      Description: description,
      status: status,
      memberStatus: member,
      isCreator: creator,
    };
    console.log("body is", body);

    const res = await fetch(
      `${process.env.BASE_URl}/api/admin/artist/update/${userData._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    console.log("Response", res);

    if (res.status == 200) {
      router.push("../");
    }
  };

  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div className="page-wrapper">
            {/* ============================================================== */}
            {/* Bread crumb and right sidebar toggle */}
            {/* ============================================================== */}

            <div className="edit-page main-col">
              <div className="app-content">
                <div className="container-fluid">
                  <h3 className="section-title">Edit Art</h3>

                  <div className="col-12 col-md-12">
                    <div className="app-card app-card-settings shadow-sm p-4">
                      <div className="app-card-body">
                        <form className="settings-form" onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                              Name
                              <span
                                className="ms-2"
                                data-container="body"
                                data-bs-toggle="popover"
                                data-trigger="hover"
                                data-placement="top"
                                data-content="This is a Bootstrap popover example. You can use popover to provide extra info."
                              >
                                <svg
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 16 16"
                                  className="bi bi-info-circle"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                  />
                                  <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                                  <circle cx="8" cy="4.5" r="1" />
                                </svg>
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={name}
                              onChange={(e) => handleChangeName(e)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Description
                            </label>
                            <textarea
                              rows="20"
                              id="description"
                              value={description}
                              className="form-control"
                              onChange={(e) => handleChangeDiscription(e)}
                            />
                          </div>
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="status"
                              checked={status ? true : false}
                              onChange={(e) => {
                                handleStatus(e);
                              }}
                              id="settings-checkbox-1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="settings-checkbox-1"
                            >
                              Blocked
                            </label>
                          </div>

                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="memberstatus"
                              checked={member ? true : false}
                              onChange={(e) => {
                                handlememberStatus(e);
                              }}
                              id="settings-checkbox-2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="settings-checkbox-2"
                            >
                              Membership status
                            </label>
                            {userData.memberStatus === false ? (
                              <small className="text-danger" role="alert">
                                Member not Allowed
                              </small>
                            ) : (
                              <small className="text-success" role="alert">
                                Member Allowed
                              </small>
                            )}
                          </div>

                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="memberstatus"
                              checked={creator ? true : false}
                              onChange={(e) => {
                                handlecreatorStatus(e);
                              }}
                              id="settings-checkbox-2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="settings-checkbox-2"
                            >
                              Creator status
                            </label>

                            {userData.isCreator === false ? (
                              <small className="text-danger" role="alert">
                                Creator Not Allowed
                              </small>
                            ) : (
                              <small className="text-success" role="alert">
                                Creator Allowed
                              </small>
                            )}
                          </div>

                          <button type="submit" className="btn app-btn-primary">
                            Save Changes
                          </button>
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
