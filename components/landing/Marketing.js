import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Marketing({ marketingData, uploadImage }) {
  const heading = useRef();
  const subHeading = useRef();
  const [cards, setCards] = useState(
    marketingData?.cards?.length > 0
      ? marketingData.cards
      : [{ title: "", description: "", imageUrl: "" }]
  );

  function handleAddCard() {
    if (cards.length < 3) {
      setCards([...cards, { title: "", description: "", imageUrl: "" }]);
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

  function handleUpdateCard(idx, attribute, value, mediaFile) {
    const updatedCards = cards.filter((item, index) => {
      if (index === idx) {
        if (attribute === "title") {
          item.title = value;
        } else if (attribute === "description") {
          item.description = value;
        } else if (attribute === "image") {
          item.imageUrl = mediaFile;
        }
      }
      return item;
    });
    setCards(updatedCards);
  }

  const handleUpdateMarketing = async (event) => {
    event.preventDefault();

    const promisesArr = [];

    const cardsArrtemp = cards.forEach((item, idx) => {
      const image = item.imageUrl
        ? promisesArr.push(uploadImage(item.imageUrl))
        : marketingData?.cards[idx].imageUrl;
      return item;
    });
    let promise = await Promise.all(promisesArr);

    let cardsArr = cards.map((item, idx) => ({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl
        ? promise[idx]
        : marketingData?.cards[idx].imageUrl,
    }));

    const body = JSON.stringify({
      heading: heading.current.value,
      subHeading: subHeading.current.value,
      cards: cardsArr,
    });

    const res = await fetch(`/api/landing/marketing`, {
      body,
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const result = await res.json();
    if (res.ok && result.success) {
      toast.success("Marketing Updated");
    } else {
      toast.error("Marketing Update failed!");
    }
    // router.push(`/profile/${artist.PublicAddress}`);
  };

  return (
    <>
      <div className="app-content pt-4">
        <div className="container-fluid">
          <h3 className="section-title">Edit Marketing Section</h3>

          <div className="col-12 col-md-12">
            <div className="app-card app-card-settings shadow-sm p-4">
              <div className="app-card-body">
                <form
                  className="settings-form"
                  onSubmit={handleUpdateMarketing}
                >
                  <article>
                    <div className="mb-3">
                      <label htmlFor="heading" className="form-label">
                        Heading
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="heading"
                        ref={heading}
                        defaultValue={marketingData?.heading || ""}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subHeading" className="form-label">
                        Sub-Heading
                      </label>
                      <input
                        type="text"
                        id="subHeading"
                        ref={subHeading}
                        defaultValue={marketingData?.subHeading || ""}
                        className="form-control"
                      />
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
                            <label htmlFor="image" className="form-label">
                              Image
                            </label>
                            <input
                              type="file"
                              id="image"
                              value=""
                              name="image"
                              className="form-control"
                              //   onChange={(e) => {
                              //     setImage(e.target.files[0]);
                              //   }}
                              onChange={(e) =>
                                handleUpdateCard(
                                  idx,
                                  "image",
                                  "",
                                  e.target.files[0]
                                )
                              }
                            />
                            {(item?.imageUrl ||
                              marketingData?.cards[idx]?.imageUrl) && (
                              <div className="cover-thumbnail-box">
                                {/* <button
                                name="backgroundImage1"
                                type="button"
                                onClick={(e) => {
                                  // handleRemoveImage(e, i);
                                  e.preventDefault();
                                  setImage("");
                                }}
                              >
                                Remove
                              </button> */}
                                <img
                                  className="img-fluid cover-thumbnail"
                                  src={
                                    typeof item?.imageUrl === "string"
                                      ? item.imageUrl
                                      : URL.createObjectURL(item.imageUrl)
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
                                  <i className="far fa-check-circle "></i>
                                </span>
                              </div>
                            )}
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
