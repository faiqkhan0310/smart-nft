import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { set } from "mongoose";
import { use } from "passport";
import moment from "moment";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../../components/layout/Navbar";

// export const getServerSideProps = async () => {
//   const res = await fetch(`${process.env.BASE_URl}/api/admin/art`);
//   const data = await res.json();
//     console.log('+++++', data)
//   const paths = data.map((user_id) => {
//     return {
//       props: { userData: data },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  console.log("localPort", process.env.BASE_URl);
  const id = context.params.id;
  const res = await fetch(`${process.env.BASE_URl}/api/admin/training/` + id);
  const data = await res.json();
  return {
    props: { userData: data },
  };
};

const Details = ({ userData }) => {
  const editaDetals = userData;
  const router = useRouter();
  const [heading, setHeading] = useState("");
  const [heading2, setHeading2] = useState("");
  const [heading3, setHeading3] = useState("");
  const [videourl, setVideourl] = useState("");
  const [description, setdescription] = useState("");
  const [vurl, setVurl] = useState("");
  const [url, setUrl] = useState("");
  const [count, setCount] = useState(Array());
  const [inputFields, setInputFields] = useState([{}]);
  const [inputFields2, setInputFields2] = useState([{}]);
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // if (user === null) useRouter.replace("/login");
  }, [user]);

  useEffect(() => {
    console.log(`userData`, userData);
    console.log(userData);
    setdescription(userData.description);
    setHeading(userData.heading);
    setUrl(userData.videoUrl);
    setHeading2(userData.heading2);
    setHeading3(userData.heading3);
    setInputFields(userData.section2Videos);
    setInputFields2(userData.section3videos);

    // if(userData.Status==='true'){
    //   setStatus(true)
    // } else{
    //  setStatus(false)
    // }
  }, []);

  // useEffect(() => {}, [status]);
  // useEffect(() => {
  //   if (!Auctioned) {
  //     console.log("asdadsaada");
  //     setStartAuction("");
  //     setEndAuction("");
  //   } else {
  //     setStartAuction(moment(userData.StartAuction).format("YYYY-MM-DD"));
  //     setEndAuction(moment(userData.EndAuction).format("YYYY-MM-DD"));
  //   }
  // }, [Auctioned]);

  const handlechangeHeading = (e) => {
    setHeading(e.target.value);
  };

  const handlechangeHeading2 = (e) => {
    setHeading2(e.target.value);
  };
  const handlechangeHeading3 = (e) => {
    setHeading3(e.target.value);
  };

  const handleChangeDiscription = (e) => {
    setdescription(e.target.value);
  };

  const handlevideoUrl = (e) => {
    setVurl(e.target.value);
  };

  // const handleAddFields = (e) => {
  //   e.preventDefault();
  //   let arr = vurl;
  //   if (url !== "") {
  //     arr.push(url);
  //     setVurl(arr);
  //     // setvideourl([...videourl, url]);
  //   }
  //   setCount([...count, 1]);
  // };

  const handlesection2Fields = (e) => {
    e.preventDefault();
    setInputFields([...inputFields, {}]);
  };

  const handlesection3Fields = (e) => {
    e.preventDefault();
    setInputFields2([...inputFields2, {}]);
  };

  const handleremoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleremoveFields2 = (index) => {
    const values = [...inputFields2];
    values.splice(index, 1);
    setInputFields2(values);
  };

  const handleChangeInput = (index, e) => {
    console.log(index, e.target.name);
    const values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
  };

  const handleChangeInput2 = (index, e) => {
    console.log(index, e.target.name);
    const values = [...inputFields2];
    values[index][e.target.name] = e.target.value;
    setInputFields2(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      heading: heading,
      description: description,
      videoUrl: url,
      heading2: heading2,
      section2Videos: inputFields,
      heading3: heading3,
      section3videos: inputFields2,
    };
    console.log("body is", body);

    const res = await fetch(
      `${process.env.BASE_URl}/api/admin/training/${userData._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

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
                  <h3 className="section-title">Training Page Editor</h3>

                  <div className="col-12 col-md-12">
                    <div className="app-card app-card-settings shadow-sm p-4">
                      <div className="app-card-body">
                        <form className="settings-form" onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                              Section 1 Heading
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
                              id="heading"
                              value={heading}
                              onChange={(e) => handlechangeHeading(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Section 1 Description
                            </label>
                            <textarea
                              rows="5"
                              id="description"
                              value={description}
                              style={{ height: "200px" }}
                              className="form-control"
                              onChange={(e) => handleChangeDiscription(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Video Url Link 1
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="DescInput"
                              aria-describedby="emailHelp"
                              placeholder="Enter Description"
                              value={url}
                              className="form-control"
                              onChange={(e) => setUrl(e.target.value)}
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Section 2 Heading
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="heading"
                              value={heading2}
                              onChange={(e) => handlechangeHeading2(e)}
                            />
                          </div>

                          {inputFields?.map((inputField, index) => (
                            <div key={index}>
                              <div className="form-check mb-3">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  required="required"
                                >
                                  Section 2 Video Name
                                </label>
                                <input
                                  type="text"
                                  name="videoName"
                                  className="form-control"
                                  id="nameInput"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Name"
                                  value={inputField.videoName}
                                  onChange={(e) => handleChangeInput(index, e)}
                                />
                              </div>

                              <div className="form-check mb-3">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  required="required"
                                >
                                  Section 2 Video Description
                                </label>
                                <textarea
                                  rows="5"
                                  type="text"
                                  name="videoDescription"
                                  className="form-control"
                                  id="DescInput"
                                  style={{ height: "200px" }}
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Description"
                                  value={inputField.videoDescription}
                                  onChange={(e) => handleChangeInput(index, e)}
                                />
                              </div>

                              <div>
                                <div className="form-check mb-3">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    required="required"
                                  >
                                    Section 2 Vimeo Link
                                  </label>
                                  <input
                                    type="text"
                                    name="videoUrl"
                                    className="form-control"
                                    id="DescInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Description"
                                    value={inputField.videoUrl}
                                    // onChange={(e) => handlevideoURl(index, e)}
                                    onChange={(e) =>
                                      handleChangeInput(index, e)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="form-check mb-3">
                                <button
                                  className="btn app-btn-primary"
                                  onClick={(e) => handlesection2Fields(e)}
                                >
                                  Add
                                </button>
                              </div>

                              <div className="form-check mb-3">
                                <button
                                  onClick={() => handleremoveFields(index)}
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}

                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Section 3 Heading
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="heading"
                              value={heading3}
                              onChange={(e) => handlechangeHeading3(e)}
                            />
                          </div>

                          {inputFields2?.map((inputField, index) => (
                            <div key={index}>
                              <div className="form-check mb-3">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  required="required"
                                >
                                  Section 3 Video Name
                                </label>
                                <input
                                  type="text"
                                  name="videoName"
                                  className="form-control"
                                  id="nameInput"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Name"
                                  value={inputField.videoName}
                                  onChange={(e) => handleChangeInput2(index, e)}
                                />
                              </div>

                              <div className="form-check mb-3">
                                <label
                                  htmlFor="exampleInputEmail1"
                                  required="required"
                                >
                                  Section 3 Video Description
                                </label>
                                <textarea
                                  rows="5"
                                  type="text"
                                  name="videoDescription"
                                  className="form-control"
                                  id="DescInput"
                                  style={{ height: "200px" }}
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Description"
                                  value={inputField.videoDescription}
                                  onChange={(e) => handleChangeInput2(index, e)}
                                />
                              </div>

                              <div>
                                <div className="form-check mb-3">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    required="required"
                                  >
                                    Section 3 Vimeo Link
                                  </label>
                                  <input
                                    type="text"
                                    name="videoUrl"
                                    className="form-control"
                                    id="DescInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Description"
                                    value={inputField.videoUrl}
                                    // onChange={(e) => handlevideoURl(index, e)}
                                    onChange={(e) =>
                                      handleChangeInput2(index, e)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="form-check mb-3">
                                <button
                                  className="btn app-btn-primary"
                                  onClick={(e) => handlesection3Fields(e)}
                                >
                                  Add
                                </button>
                              </div>

                              <div className="form-check mb-3">
                                <button
                                  onClick={() => handleremoveFields2(index)}
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* <div>
                            {userData.section2Videos.map((o) => (
                              <div className="form-check mb-3">
                                <label
                                  htmlFor="Price"
                                  className="form-label"
                                  required="required"
                                >
                                  Video Url Link 2
                                </label>
                                <input
                                  type="text"
                                  name="Url"
                                  className="form-control"
                                  id="Url"
                                  aria-describedby="emailHelp"
                                  placeholder="Url"
                                  value={userData.url}
                                />
                              </div>
                            ))}

                            <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                Section 2 Video Name
                              </label>
                               
                               <input
                               type="text"
                               className="form-control"
                               id="heading"
                               value={heading}
                               onChange={(e) => handlechangeHeading(e)}

                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                Section 2 Description
                              </label>
                              <textarea
                                rows="5"
                                id="description"
                                value={description}
                                style={{ height: "200px" }}
                                className="form-control"
                                onChange={(e) => handleChangeDiscription(e)}
                              />
                            </div>

                            <div className="form-check mb-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                required="required"
                              >
                                VideoUrl Link
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="DescInput"
                                aria-describedby="emailHelp"
                                placeholder="Enter Description"
                                // onChange={(e) => handlevideoURl(index, e)}
                                onChange={(e) => setUrl(e.target.value)}
                              />
                            </div>
                           
                          </div>

                          <div className="form-check mb-3">
                            <button
                              className="btn app-btn-primary"
                              onClick={(e) => handleAddFields(e)}
                            >
                              Add Section 
                            </button>
                          </div> */}

                          {/* <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="feature"
                            checked={feature ? true : false}
                            onChange={(e) => {
                              handleFeature(e);
                            }}
                            id="settings-checkbox-2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="settings-checkbox-2"
                          >
                            Feature
                          </label>
                        </div> */}

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
