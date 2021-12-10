import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Specifications({ specificationsData, uploadImage }) {
  const heading = useRef();
  const subHeading = useRef();
  const [image, setImage] = useState();
  const heading2 = useRef();
  const subHeading2 = useRef();
  const [image2, setImage2] = useState();
  const [cards, setCards] = useState(
    specificationsData?.cards || [{ title: "", description: "" }]
  );

  function handleAddCard() {
    if (cards.length < 6) {
      setCards([...cards, { title: "", description: "" }]);
    }
  }

  function handleRemoveCard(idx) {
    if (cards.length > 1) {
      const updatedCards = cards.filter((item, index) =>
        index !== idx ? item : null
      );
      setCards(updatedCards);
    }
  }

  function handleUpdateCard(idx, attribute, value) {
    const updatedCards = cards.filter((item, index) => {
      if (index === idx) {
        if (attribute === "title") {
          item.title = value;
        } else if (attribute === "description") {
          item.description = value;
        }
      }
      return item;
    });
    setCards(updatedCards);
  }

  const handleUpdateSpecs = async (event) => {
    event.preventDefault();
    const image_url = image
      ? await uploadImage(image)
      : specificationsData?.image;
    const image2_url = image2
      ? await uploadImage(image2)
      : specificationsData?.image2;

    const body = JSON.stringify({
      heading: heading.current.value,
      subHeading: subHeading.current.value,
      image: image_url,
      heading2: heading2.current.value,
      subHeading2: subHeading2.current.value,
      image2: image2_url,
      cards,
    });

    const res = await fetch(`/api/landing/specifications`, {
      body,
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const result = await res.json();
    if (res.ok && result.success) {
      toast.success("Specifications Updated");
    } else {
      toast.error("Specifications Update failed!");
    }
    // router.push(`/profile/${artist.PublicAddress}`);
  };

  return (
    <>
      <div className="app-content pt-4">
        <div className="container-fluid">
          <h3 className="section-title">Edit Specifications Section</h3>

          <div className="col-12 col-md-12">
            <div className="app-card app-card-settings shadow-sm p-4">
              <div className="app-card-body">
                <form className="settings-form" onSubmit={handleUpdateSpecs}>
                  <article>
                    <div className="mb-3">
                      <label htmlFor="heading" className="form-label">
                        First Heading
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="heading"
                        ref={heading}
                        defaultValue={specificationsData?.heading || ""}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subHeading" className="form-label">
                        First Sub-Heading
                      </label>
                      <input
                        type="text"
                        id="subHeading"
                        ref={subHeading}
                        defaultValue={specificationsData?.subHeading || ""}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        Images
                      </label>
                      <input
                        type="file"
                        id="image"
                        value=""
                        name="image"
                        className="form-control"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                      />
                      {(image || specificationsData?.image) && (
                        <div class="cover-thumbnail-box">
                          {/* <button
                            name="backgroundImage1"
                            onClick={(e) => {
                              // handleRemoveImage(e, i);
                              console.log("hi");
                              e.preventDefault();
                              setImage("");
                            }}
                          >
                            Remove
                          </button> */}
                          <img
                            className="img-fluid cover-thumbnail"
                            src={
                              image
                                ? URL.createObjectURL(image)
                                : specificationsData?.image
                            }
                            style={{
                              width: 250,
                              height: 200,
                              margin: 5,
                            }}
                            id="imgId"
                            alt="background Image"
                          />
                          <span
                          // className="coverimg-indication"
                          // style={{ display: data ? "" : "none" }}
                          >
                            <i class="far fa-check-circle "></i>
                          </span>
                        </div>
                      )}
                    </div>
                  </article>

                  <article>
                    <div className="mb-3">
                      <label htmlFor="heading2" className="form-label">
                        Second Heading
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="heading2"
                        ref={heading2}
                        defaultValue={specificationsData?.heading2 || ""}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subHeading2" className="form-label">
                        Second Sub-Heading
                      </label>
                      <input
                        type="text"
                        id="subHeading2"
                        ref={subHeading2}
                        defaultValue={specificationsData?.subHeading2 || ""}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image2" className="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="image2"
                        value=""
                        name="image2"
                        className="form-control"
                        onChange={(e) => {
                          setImage2(e.target.files[0]);
                        }}
                      />
                      {(image2 || specificationsData?.image2) && (
                        <div class="cover-thumbnail-box">
                          {/* <button
                            name="backgroundImage2"
                            onClick={(e) => {
                              // handleRemoveImage(e, i);
                              setImage2("");
                            }}
                          >
                            Remove
                          </button> */}
                          <img
                            className="img-fluid cover-thumbnail"
                            src={
                              image2
                                ? URL.createObjectURL(image2)
                                : specificationsData?.image2
                            }
                            style={{
                              width: 250,
                              height: 200,
                              margin: 5,
                            }}
                            id="imgId2"
                            alt="background Image 2"
                          />
                          <span
                          // className="coverimg-indication"
                          // style={{ display: data ? "" : "none" }}
                          >
                            <i class="far fa-check-circle "></i>
                          </span>
                        </div>
                      )}{" "}
                    </div>
                  </article>

                  <article>
                    {cards &&
                      cards.map((item, idx) => (
                        <div className="border my-3 p-3" key={idx}>
                          <div className="mb-3">
                            <h4 className="mx-2">{`Card ${idx + 1}`}</h4>
                            <label
                              htmlFor={`title${idx}`}
                              className="form-label"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id={`title${idx}`}
                              value={item.title}
                              onChange={(e) =>
                                handleUpdateCard(idx, "title", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor={`description${idx}`}
                              className="form-label"
                            >
                              Description
                            </label>
                            <input
                              type="text"
                              id={`description${idx}`}
                              value={item.description}
                              onChange={(e) =>
                                handleUpdateCard(
                                  idx,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="form-control"
                            />
                          </div>
                          <div className="mb-3">
                            <button
                              className="btn btn-secondary"
                              type="button"
                              onClick={(e) => handleRemoveCard(idx)}
                            >
                              Remove Card
                            </button>
                          </div>
                        </div>
                      ))}
                    {cards && (
                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={(e) => handleAddCard()}
                        >
                          Add Card
                        </button>
                      </div>
                    )}
                  </article>

                  <button type="submit" className="btn app-btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
