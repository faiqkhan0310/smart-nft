import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { set } from "mongoose";
import { use } from "passport";
import moment from "moment";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../../components/layout/Navbar";
import { uploadFileToPinata } from "utils/pinata";

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

// export const getServerSideProps = async (context) => {
//   console.log("localPort", process.env.BASE_URl);
//   const id = context.params.id;
//   const res = await fetch(`${process.env.BASE_URl}/api/admin/item/` + id);
//   const data = await res.json();
//   return {
//     props: { userData: data },
//   };
// };

const Details = ({ userData }) => {
  const editaDetals = userData;
  const router = useRouter();
  const [heading, setHeading] = useState("");
  const [heading2, setHeading2] = useState("");
  const [heading3, setHeading3] = useState("");
  const [cetagory, setCetagory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState("");
  const [videourl, setvideourl] = useState(Array());
  const [status, setStatus] = useState(false);
  const [feature, setFeature] = useState(false);
  const [Auctioned, setAuctioned] = useState(false);
  const [StartAuction, setStartAuction] = useState("");
  const [EndAuction, setEndAuction] = useState("");
  const [images, setImages] = useState("");
  const [resoultion, setResolution] = useState("");
  const [filetype, setFile] = useState("");
  const [count, setCount] = useState(Array());
  const [url, setUrl] = useState("");
  const [inputFields, setInputFields] = useState([{}]);
  const [inputFields2, setInputFields2] = useState([{}]);

  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    if (user === null) useRouter.replace("/login");
  }, [user]);

  // useEffect(() => {
  //   console.log(`userData`, userData);
  //   console.log(userData);
  //   setCetagory(userData.Category);
  //   setdescription(userData.Description);
  //   setName(userData.name);
  //   setStatus(userData.Status);
  //   setAuctioned(userData.Auctioned);
  //   setFeature(userData.Featured);
  //   setStitemAuction(moment(userData.StitemAuction).format("YYYY-MM-DD"));
  //   setEndAuction(moment(userData.EndAuction).format("YYYY-MM-DD"));

  //   if(userData.Status==='true'){
  //     setStatus(true)
  //   } else{
  //    setStatus(false)
  //   }
  // }, []);

  // useEffect(() => {}, [status]);
  // useEffect(() => {
  //   if (!Auctioned) {
  //     console.log("asdadsaada");
  //     setStitemAuction("");
  //     setEndAuction("");
  //   } else {
  //     setStitemAuction(moment(userData.StitemAuction).format("YYYY-MM-DD"));
  //     setEndAuction(moment(userData.EndAuction).format("YYYY-MM-DD"));
  //   }
  // }, [Auctioned]);

  const handleChangeHeading = (e) => {
    setHeading(e.target.value);
  };
  const handleChangeHeading2 = (e) => {
    setHeading2(e.target.value);
  };

  const handleChangeHeading3 = (e) => {
    setHeading3(e.target.value);
  };

  const handleChangeCetagory = (e) => {
    setCetagory(e.target.value);
  };
  const handleStitemAuction = (e) => {
    setStitemAuction(e.target.value);
  };
  const handleEndAuction = (e) => {
    setEndAuction(e.target.value);
  };

  const handleChangeDiscription = (e) => {
    setdescription(e.target.value);
  };

  const handlevideoURl = (index, e) => {
    // console.log(index,e.target.name)
    // const values = videourl;
    // values[index][e.target.name] = e.target.value;
    // setvideourl(values);
    // console.log("Values",values)
    setvideourl([videourl, e.target.value]);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handleFeature = (e) => {
    setFeature(e.target.checked);
  };

  const handleAuction = (e) => {
    setAuctioned(e.target.checked);
  };

  // const handleAddFields = (e) => {
  //   e.preventDefault();
  //   let arr = videourl;
  //   if (url !== "") {
  //     arr.push(url);
  //     setvideourl(arr);
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

  // const handleremoveFields = (index) => {
  //   const values = [...videourl];
  //   values.splice(index, 1);
  //   setvideourl(values);
  // };
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

  const handleImages = async (e) => {
    // const data = new FormData();
    // data.append("file", e.target.files[0]);
    // data.append("upload_preset", "bxmi-peset");
    if (e.target.files.length > 0) {
      console.log("Images", e.target.files[0]);
      setFile(e.target.files[0].type);
      setResolution(e.target.files[0].size);
      const Url = await uploadFileToPinata(e.target.files[0]);
      setImages([...images, { url: Url }]);

      // return
      // fetch(`https://api.pinata.cloud/pinning/pinFileToIPFS`, {
      //   method: "POST",
      //   body: data,
      // })
      //   .then(async (response) => {
      //     const res = await response.json();
      //     // if (e.target.name === "images") {
      //       setImages([...images, { url: res.secure_url }]);
      //     // }
      //   })
      //   .catch((err) => console.log(err));
    }
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    let filteredImages;
    if (e.target.name === "landingImage") {
      filteredImages = images.filter((data, i) => {
        return i !== index;
      });
      setImages(filteredImages);
    }
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
    console.log("input Fields", inputFields);

    const body = {
      heading: heading,
      description: description,
      videoUrl: url,
      heading2: heading2,
      section2Videos: inputFields,
      heading3: heading3,
      section3videos: inputFields2,
    };

    const res = await fetch(`${process.env.BASE_URl}/api/admin/training`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // console.log("body is", body);

    // const itemed = await fetch(`${process.env.BASE_URl}/api/admin/training`);

    // const dataItem = await itemed.json();

    // console.log("body is", dataItem);

    // if (!dataItem) {
    //   const res = await fetch(`${process.env.BASE_URl}/api/admin/training`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });

    //   console.log("REsponse", res);
    // } else {
    //   const res = await fetch(`${process.env.BASE_URl}/api/admin/training`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });
    // if (res.status == 200) {
    //   router.push("../");
    // }
    // }
  };

  // console.log("UmarBhai",user)
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
                  <h3 className="section-title">Crypto Training Page</h3>

                  <div className="col-12 col-md-12">
                    <div className="app-card app-card-settings shadow-sm p-4">
                      <div className="app-card-body">
                        <form className="settings-form">
                          <div className="form-check mb-3">
                            <label for="exampleInputEmail1" required="required">
                              Heading
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              id="nameInput"
                              aria-describedby="emailHelp"
                              placeholder="Enter Name"
                              value={heading}
                              onChange={(e) => handleChangeHeading(e)}
                            />
                          </div>

                          <div className="form-check mb-3">
                            <label for="exampleInputEmail1" required="required">
                              Description
                            </label>
                            <textarea
                              rows="5"
                              type="text"
                              name="name"
                              className="form-control"
                              id="DescInput"
                              style={{ height: "200px" }}
                              aria-describedby="emailHelp"
                              placeholder="Enter Description"
                              value={description}
                              onChange={(e) => handleChangeDiscription(e)}
                            />
                          </div>

                          {/* {count.map((video, index) => ( */}
                          <div>
                            <div className="form-check mb-3">
                              <label
                                for="exampleInputEmail1"
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
                                value={url}
                                // onChange={(e) => handlevideoURl(index, e)}
                                onChange={(e) => setUrl(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-check mb-3">
                            <label for="exampleInputEmail1" required="required">
                              Section 2 Heading
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              id="nameInput"
                              aria-describedby="emailHelp"
                              placeholder="Enter Name"
                              value={heading2}
                              onChange={(e) => handleChangeHeading2(e)}
                            />
                          </div>

                          {/* {videourl?.length > 0 &&
                            videourl?.map((video) => {
                              return <p> {video} </p>;
                            })} */}
                          {inputFields?.map((inputField, index) => (
                            <div key={index}>
                              <div className="form-check mb-3">
                                <label
                                  for="exampleInputEmail1"
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
                                  for="exampleInputEmail1"
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
                                    for="exampleInputEmail1"
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

                          <div className="form-check mb-3">
                            <label for="exampleInputEmail1" required="required">
                              Section 3 Heading
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              id="nameInput"
                              aria-describedby="emailHelp"
                              placeholder="Enter Name"
                              value={heading3}
                              onChange={(e) => handleChangeHeading3(e)}
                            />
                          </div>

                          {/* {videourl?.length > 0 &&
                            videourl?.map((video) => {
                              return <p> {video} </p>;
                            })} */}
                          {inputFields2?.map((inputField, index) => (
                            <div key={index}>
                              <div className="form-check mb-3">
                                <label
                                  for="exampleInputEmail1"
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
                                  for="exampleInputEmail1"
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
                                    for="exampleInputEmail1"
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

                          <button
                            onClick={handleSubmit}
                            className="btn app-btn-primary"
                          >
                            Update
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
