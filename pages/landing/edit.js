import { Navbar } from "@/components/layout/Navbar";
import Landing from "@/db/models/Landing/Landing";
import SpecificationsModel from "@/db/models/Landing/Specifications";
import MarketingModel from "@/db/models/Landing/Marketing";
import { useCurrentUser } from "@/hooks/user";
import { useEffect, useState } from "react";
import "../../utils/dbConnect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Specifications from "@/components/landing/Specifications";
import Marketing from "@/components/landing/Marketing";

const EditLandingPage = ({ landingData, specsData, marketingData }) => {
  const [heading, setHeading] = useState(landingData?.heading || "");
  const [subHeading, setSubHeading] = useState(landingData?.subHeading || "");
  const [images, setImages] = useState(landingData?.images || []);

  const [user] = useCurrentUser();
  useEffect(() => {
    if (user === null) useRouter.replace("/login");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      heading,
      subHeading,
      images,
    };

    const response = await fetch(`${process.env.BASE_URl}/api/landing`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.status == 200) {
      toast.success("Landing Updated");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleImages = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "bxmi-peset");
    if (e.target.files.length > 0) {
      fetch(`https://api.cloudinary.com/v1_1/bxmi-io/image/upload`, {
        method: "POST",
        body: data,
      })
        .then(async (response) => {
          const res = await response.json();
          if (e.target.name === "images") {
            setImages([...images, { url: res.secure_url }]);
          }
        })
        .catch((err) => console.log(err));
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

  // For Uploading Single Image to Cloudinary
  const singleImageUpload = async (media) => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "bxmi-peset");
    data.append("cloud_name", "bxmi-io");
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/bxmi-io/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();

    return res2.url;
  };

  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div className="page-wrapper">
            <div className="edit-page main-col">
              <div className="app-content">
                <div className="container-fluid">
                  <h3 className="section-title">Edit Intro Section</h3>

                  <div className="col-12 col-md-12">
                    <div className="app-card app-card-settings shadow-sm p-4">
                      <div className="app-card-body">
                        <form className="settings-form" onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="heading" className="form-label">
                              Heading
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="heading"
                              value={heading}
                              onChange={(e) => setHeading(e.target.value)}
                              // required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="subHeading" className="form-label">
                              Sub Heading
                            </label>
                            <input
                              type="text"
                              id="subHeading"
                              value={subHeading}
                              className="form-control"
                              onChange={(e) => setSubHeading(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="images" className="form-label">
                              Images
                            </label>
                            <input
                              type="file"
                              id="images"
                              value=""
                              name="images"
                              className="form-control"
                              onChange={(e) => {
                                handleImages(e);
                              }}
                            />
                            {images?.length > 0 &&
                              images.map((data, i) => {
                                return (
                                  <div class="cover-thumbnail-box" key={i}>
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
                                    <span
                                    // className="coverimg-indication"
                                    // style={{ display: data ? "" : "none" }}
                                    >
                                      <i class="far fa-check-circle "></i>
                                    </span>
                                  </div>
                                );
                              })}
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

              <div>
                <Specifications
                  specificationsData={specsData}
                  uploadImage={singleImageUpload}
                />
              </div>

              <div>
                <Marketing
                  marketingData={marketingData}
                  uploadImage={singleImageUpload}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const infoData = await Landing.find({});

    const specsData = await SpecificationsModel.find({});

    const marketingData = await MarketingModel.find({});

    return {
      props: {
        landingData: JSON.parse(JSON.stringify(infoData[0])),
        specsData: JSON.parse(JSON.stringify(specsData[0])),
        marketingData: JSON.parse(JSON.stringify(marketingData[0])),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { landingData: [], specsData: [], marketingData: [] },
    };
  }
}

export default EditLandingPage;
