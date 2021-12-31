/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../../components/layout/Navbar";
import { uploadFileToPinata } from "utils/pinata";
import { MentionsInput, Mention } from "react-mentions";
import moment from "moment";

const Details = ({ artists }) => {
  const [artist, setArtist] = React.useState([
    { artistId: "", arts: [{ value: "" }] },
  ]);

  const [mentionVaues, setMentionValues] = useState([]);
  const addArtist = () => {
    setArtist((prevState) => [
      ...prevState,
      { artistId: "", arts: [{ value: "" }] },
    ]);
  };
  const addArt = (index) => {
    const artistCopy = [...artist];
    artistCopy[index].arts.push({ value: "" });
    console.log(artistCopy);
    setArtist([...artistCopy]);
  };
  const removeArt = (artistIndex, artIndex) => {
    const artistCopy = [...artist];
    console.log("before");
    console.log(artistCopy[artistIndex].arts);
    artistCopy[artistIndex].arts.splice(artIndex, 1);
    // console.log(artistCopy);
    console.log("after");
    console.log(artistCopy[artistIndex].arts);
    setArtist([...artistCopy]);
  };

  const handleArtsChange = (e, artistIndex, artIndex) => {
    const artistCopy = [...artist];
    artistCopy[artistIndex].arts[artIndex].value = e.target.value;
    setArtist([...artistCopy]);
  };
  const handlePaste = async (artistIndex, artIndex) => {
    const artistCopy = [...artist];
    const copyText = await navigator.clipboard.readText();
    artistCopy[artistIndex].arts[artIndex].value = copyText;
    console.log(artistCopy[artistIndex].arts[artIndex].value);
    console.log(copyText);
    setArtist([...artistCopy]);
  };
  const handleArtistRemove = (index) => {
    const artistCopy = [...artist];
    artistCopy.splice(index, 1);
    setArtist([...artistCopy]);
  };
  const handleArtistChange = (index, evt, v, pv, men) => {
    console.log(index, v, pv, men);
    console.log(men[0]?.id);
    const id = men[0]?.id;

    const mentinValCopy = [...mentionVaues];
    const ob = { index, value: v, id: id };
    mentinValCopy.splice(index, 0, ob);
    console.clear();
    console.log(mentinValCopy);
    setMentionValues(mentinValCopy);

    const obj = { index: index, value: v, id: id };
    const mentionsCopy = [...artistMention];
    mentionsCopy.push(obj);
    setArtistMention([...mentionsCopy]);

    const artistCopy = [...artist];
    artistCopy[index].artistId = id;

    // const changedIndex = artistCopy[index]
    // changedIndex.artistId = "123"+index
    // artistCopy.splice(index, 1, {...changedIndex})

    console.log(artistCopy);
    setArtist([...artistCopy]);
  };

  const router = useRouter();
  const [images, setImages] = useState("");
  const [filetype, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [artistMention, setArtistMention] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    startingDate: "",
    endingDate: "",
    location: "",
    coverPhoto: "",
    description: "",
  });

  const [artistAndArts, setArtistAndArts] = useState([
    {
      artistId: "",
      artsitArts: [],
    },
  ]);

  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // if (user === null) useRouter.replace("/login");
  }, [user]);

  useEffect(async () => {
    // console.log(router.query.data);
    if (router.query.data) {
      const exhibitionData = JSON.parse(router.query.data);
      console.log(exhibitionData);
      console.log(exhibitionData.title);
      setFormValues({
        title: exhibitionData.title,
        startingDate: moment(exhibitionData.startingDate).format("YYYY-MM-DD"),
        endingDate: moment(exhibitionData.endingDate).format("YYYY-MM-DD"),
        location: exhibitionData.location,
        coverPhoto: exhibitionData.coverImage,
        description: exhibitionData.description,
      });
      setArtist(exhibitionData.artists);
      const allArtistOfCurrentExh = exhibitionData.artists?.map(
        (item) => item.artistId
      );
      const res = await fetch(
        process.env.BASE_URl + "/api/admin/artist/exhibitionartist/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(allArtistOfCurrentExh),
        }
      );
      const res12 = await res.json();
      console.clear();
      console.log(res12);
      const mentionsData = res12.artists.map((item, ind) => {
        // id: "61670e72cc6c4729a423a5db";
        // index: 0;
        // value: "@[umar zahir](61670e72cc6c4729a423a5db)";
        const obj = {
          index: ind,
          value: `@[${item.ArtistName}](${item._id})`,
          id: item._id,
        };

        const mentionsCopy1 = [...artistMention];
        mentionsCopy1.push(obj);
        console.log("artist mentin ***************************");
        console.log(mentionsCopy1);
        setArtistMention([...mentionsCopy1]);
        setMentionValues([...mentionsCopy1]);

        console.log(item._id);
      });
    }
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log(name, value);
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleImages = async (e) => {
    // const data = new FormData();
    // data.append("file", e.target.files[0]);
    // data.append("upload_preset", "bxmi-peset");
    if (e.target.files.length > 0) {
      console.log("Images", e.target.files[0]);
      setFile(e.target.files[0].type);
      // setResolution(e.target.files[0].size);
      const Url = await uploadFileToPinata(e.target.files[0]);
      setImages(Url);

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

  // const addNewArtist = () => {
  //   let stateCopy = [...artistAndArts];
  //   console.log(stateCopy);
  //   stateCopy.push({ artistId: "2", artsitArts: [] });
  //   console.log(stateCopy);
  //   setArtistMention([...stateCopy]);
  // };

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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      title: title,
      startingDate: startingDate,
      endingDate: endingDate,
      location: location,
      coverImage: images,
      description: description,
      artists: [...artist],
    };

    console.log("body is", images);
    console.log("body", body);
    const res = await fetch(`${process.env.BASE_URl}/api/exhibiton`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status == 200) {
      router.push("/exhibition");
    }
    setLoading(false);
  };
  // const handleArtistChange = (evt, newValue, newPlainTextValue, mentions) => {
  //   console.log(newValue, newPlainTextValue, mentions);
  //   setArtistMention(newValue);
  // };

  // console.log("UmarBhai", user);
  const { title, startingDate, endingDate, coverPhoto, location, description } =
    formValues;
  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div className="page-wrapper">
            <div className="edit-page main-col">
              <div className="app-content">
                <div className="container-fluid ">
                  <h3 className="section-title mb-4">Create Exhibition</h3>

                  <div className="">
                    <div className="app-card app-card-settings shadow-sm p-4 row">
                      <form className="settings-form" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="form-check mb-3 col-12">
                            <label
                              htmlFor="title"
                              className="mb-1"
                              required="required"
                            >
                              Exhibition Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              required
                              value={title}
                              id="title"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-check mb-3 col-6">
                            <label
                              htmlFor="title"
                              className="mb-1"
                              required="required"
                            >
                              Starting Date
                            </label>
                            <input
                              type="date"
                              name="startingDate"
                              className="form-control"
                              id="startingDate"
                              value={startingDate}
                              required
                              onChange={handleChange}
                            />
                          </div>

                          <div className="form-check mb-3 col-6">
                            <label
                              htmlFor="title"
                              className="mb-1"
                              required="required"
                            >
                              Ending Date
                            </label>
                            <input
                              type="date"
                              name="endingDate"
                              className="form-control"
                              id="endingDate"
                              value={endingDate}
                              required
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-check mb-3 col-6">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="mb-1"
                              required="required"
                            >
                              Location
                            </label>
                            <input
                              name="location"
                              id="location"
                              value={location}
                              className="form-control"
                              onChange={handleChange}
                              required
                            ></input>
                          </div>

                          <div className="form-check mb-3 col-6">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="mb-1"
                              required="required"
                            >
                              Select Exhibition Cover Photo
                            </label>
                            <input
                              type="file"
                              name="coverPhoto"
                              className="form-control"
                              id="coverPhoto"
                              required
                              onChange={handleImages}
                            />
                          </div>

                          <div className="form-check mb-3">
                            <label
                              className="mb-1"
                              htmlFor="exampleInputEmail1"
                              required="required"
                            >
                              Description
                            </label>
                            <textarea
                              cols="30"
                              rows="40"
                              name="description"
                              className="form-control desc-height"
                              id="description"
                              placeholder="briefly describe the purpose of your exhibition"
                              value={description}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>

                        {artist?.map((artis, index) => {
                          return (
                            <div className="row mt-5">
                              <div className="col-6">
                                <p>Artist</p>

                                <div className="row">
                                  <div className="col-3">
                                    {/* <img
                                  src=""
                                  className="round-image"
                                  alt="Artist image"
                                /> */}
                                    <div className="round-image bg-warning"></div>
                                  </div>
                                  <div className="col-9">
                                    <MentionsInput
                                      value={mentionVaues[index]?.value}
                                      onChange={(evt, v, pv, men) =>
                                        handleArtistChange(
                                          index,
                                          evt,
                                          v,
                                          pv,
                                          men
                                        )
                                      }
                                      placeholder="@username"
                                    >
                                      <Mention trigger="@" data={artists} />
                                    </MentionsInput>
                                    <br />
                                    {index !== 0 && (
                                      <button
                                        type="button"
                                        className="text-btn"
                                        onClick={() =>
                                          handleArtistRemove(index)
                                        }
                                      >
                                        remove
                                      </button>
                                    )}
                                  </div>
                                  <div className="mt-5">
                                    <button
                                      className="ama"
                                      type="button"
                                      onClick={addArtist}
                                    >
                                      Add More Artists
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="col-6">
                                <p>Artworks</p>
                                <ol>
                                  {artis?.arts.map((art, ind) => {
                                    console.log(art);
                                    return (
                                      <>
                                        <li>
                                          <input
                                            type="text"
                                            defaultValue={art.value}
                                            className="form-control"
                                            onChange={(e) =>
                                              handleArtsChange(e, index, ind)
                                            }
                                            // disabled={!artis?.artistId}
                                          />
                                          <br />
                                          {ind + 1 === artis?.arts.length && (
                                            <button
                                              // disabled={!artis?.artistId}
                                              type="button"
                                              className="ama"
                                              onClick={() => addArt(index)}
                                            >
                                              Add More Artworks
                                            </button>
                                          )}
                                        </li>
                                      </>
                                    );
                                  })}
                                </ol>
                              </div>
                            </div>
                          );
                        })}

                        {/* <div className="form-check mb-3">
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
                            Status
                          </label>
                        </div> */}

                        <div className="form-group mt-3">
                          {/* <label className="mr-2">Upload Image:</label> */}
                          {/* <input
                            type="file"
                            name="file"
                            onChange={handleImages}
                          /> */}
                          {/* {images?.length > 0 &&
                            images.map((data, i) => {
                              return (
                                <div className="cover-thumbnail-box" key={i}>
                                  <button
                                    name="landingImage"
                                    onClick={(e) => {
                                      handleRemoveImage(e, i);
                                    }}
                                  >
                                    Remove
                                  </button>
                                  <img
                                    className="img-fluid cover-thumbnail"
                                    src={data?.url}
                                    style={{
                                      width: 250,
                                      height: 200,
                                      margin: 5,
                                    }}
                                    id="imgId"
                                    alt="pic"
                                  />
                                  <span>
                                    <i className="far fa-check-circle "></i>
                                  </span>
                                </div>
                              );
                            })} */}
                        </div>

                        <button type="submit" className="btn app-btn-primary">
                          submit
                          {loading && (
                            <div className="spinner-border" role="status"></div>
                          )}
                        </button>
                      </form>
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

export async function getServerSideProps() {
  const url = `${process.env.BASE_URl}/api/Artistmention`;
  const res = await fetch(url);
  const artists = await res.json();

  //country api https://api.first.org/data/v1/countries
  // const countryuUrl = "https://restcountries.com/v3.1/all";
  // const res1 = await fetch(countryuUrl);
  // const countries = await res1.json();
  return {
    props: { artists },
  };
}
