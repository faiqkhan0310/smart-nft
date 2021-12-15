/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import {
  faChevronCircleLeft,
  faChevronLeft,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { DashboardComponent } from "../../components/dashboard-component/DashboardComponent";
import { Navbar } from "../../components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getClasses } from "service/class-service";
import { values } from "public/assets/plugins/fontawesome/js/v4-shims";
import { addProduct } from "service/product-service";
import { useContext } from "react";
import { genContext } from "pages/_app";

export default function AddProduct() {
  const context = useContext(genContext);
  const router = useRouter();
  const [classes, setClasses] = React.useState([]);
  const [selClass, setSelClass] = React.useState();
  const [inputState, setInputState] = React.useState({
    name: "",
    desc: "",
    price: undefined,
    list: false,
  });

  React.useEffect(async () => {
    const allClasses = await getClasses();
    // console.log(allClasses);
    if (allClasses?.success) setClasses(allClasses?.classes);
  }, []);
  const handleSelect = (e) => {
    console.log(JSON.parse(e.target.value));
    setSelClass(JSON.parse(e.target.value));
  };

  const handleMutableAttribute = (e, attr) => {
    const { name, value } = e.target;
    console.log(name, value);
    const selClassCopy = { ...selClass };
    const selClassAttrIndx = selClassCopy.attributes.indexOf(attr);
    selClassCopy.attributes[selClassAttrIndx].type = value;
    setSelClass({ ...selClassCopy });
  };
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(name, value, checked);
    let valueV = value;
    if (name === "list") valueV = checked;
    console.log(valueV);

    setInputState((prev) => {
      return {
        ...prev,
        [name]: valueV,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    context.setLoading(true);
    const apiBody = {
      class: selClass?._id,
      ...inputState,
      attributes: selClass.attributes,
    };
    console.log(apiBody);
    const productRes = await addProduct(apiBody);
    if (productRes.success) {
      context.setLoading(false);
      toast.success("Product created");
      return router.push("/products");
    } else if (productRes.success === false && productRes?.message) {
      context.setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.info(productRes?.message);
    } else {
      context.setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.info("some error occured.");
    }

    console.log(productRes);
  };

  return (
    <>
      <Navbar ProductsActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 class="app-page-title mb-5 main-title d-flex align-items-center justify-content-between">
                <span className="d-flex align-items-center">
                  {" "}
                  <Link href="/classes">
                    <a className="back-btn me-4">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                  </Link>
                  Add Product{" "}
                </span>
              </h1>

              <div class="app-card  h-100">
                <div class="app-card-body p-4 p-lg-5 ">
                  <div className="row">
                    <div className="col-md-12 col-12 product-col-form">
                      <form onSubmit={handleSubmit}>
                        <div className="product-form w-50">
                          <div className="form-group mb-4">
                            <label className="d-block mb-3">Name</label>
                            <input
                              name="name"
                              required
                              className="form-control"
                              onChange={handleInputChange}
                              type="text"
                            />
                          </div>

                          <div className="form-group mb-4">
                            <label className="d-block mb-3">Desc</label>
                            <textarea
                              name="desc"
                              required
                              onChange={handleInputChange}
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              style={{
                                minHeight: "150px !important",
                                borderRadius: "20px",
                              }}
                            ></textarea>
                          </div>
                          <div className="form-group mb-5">
                            <label className="d-block mb-3">Price</label>
                            <input
                              name="price"
                              required
                              className="form-control"
                              onChange={handleInputChange}
                              type="number"
                            />
                          </div>
                          <div className="form-group mb-5">
                            <label className="d-block mb-3">Select Class</label>
                            <select
                              onChange={handleSelect}
                              className="form-select form-control pt-2"
                              aria-label="Default select example"
                            >
                              <option selected disabled>
                                Select Class
                              </option>
                              {classes?.map((clas, ind) => {
                                return (
                                  <option required value={JSON.stringify(clas)}>
                                    {clas?.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group mb-5">
                            <div className="form-check me-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue
                                name="list"
                                onChange={handleInputChange}
                                id="flexCheckDefault4"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault4"
                              >
                                {`List on ${selClass?.name || "____"}`}
                              </label>
                            </div>
                          </div>

                          <div className="form-group add-attr-col mb-5">
                            <label className="d-block mb-4">Attributes </label>
                            {selClass ? (
                              selClass?.attributes?.map((attr) => {
                                return (
                                  <div className="form-group mb-4">
                                    <label className="d-block mb-3">
                                      {attr?.name}
                                    </label>
                                    <input
                                      type="text"
                                      name={attr?.name}
                                      value={attr?.type}
                                      onChange={(e) =>
                                        handleMutableAttribute(e, attr)
                                      }
                                      disabled={!attr?.mutable}
                                      className="form-control me-2"
                                      placeholder=""
                                    />
                                  </div>
                                );
                              })
                            ) : (
                              <p>No class is selected</p>
                            )}

                            <div className="form-group type-btn mt-5">
                              <button
                                disabled={!selClass}
                                type="submit"
                                className="add-attr-btn btn ms-auto d-block"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
