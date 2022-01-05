/*eslint-disable*/

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Navbar } from "../../components/layout/Navbar";
import Link from "next/link";
import React from "react";
import { addProductToClass } from "../../service/class-service";
import { addProduct } from "service/product-service";
import { getClasses } from "service/class-service";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "store/admin-slice";

export default function AddProduct() {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);
  const [classes, setClasses] = React.useState([]);
  const [selClass, setSelClass] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState("");
  const [inputState, setInputState] = React.useState({
    name: "",
    desc: "",
    price: undefined,
    list: false,
  });

  React.useEffect(async () => {
    const allClasses = await getClasses(state.token);
    if (allClasses?.success) setClasses(allClasses?.classes);
  }, []);
  const handleSelect = (e) => {
    setSelClass(JSON.parse(e.target.value));
    const dd = JSON.parse(e.target.value);
    setSelectedValue(dd.name);
  };

  const handleMutableAttribute = (e, attr) => {
    const { name, value } = e.target;
    const selClassCopy = { ...selClass };
    const selClassAttrIndx = selClassCopy.classAttributes.indexOf(attr);
    selClassCopy.classAttributes[selClassAttrIndx].value = value;
    console.log(selClassCopy);
    setSelClass({ ...selClassCopy });
  };
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    let valueV = value;
    if (name === "list") valueV = checked;

    setInputState((prev) => {
      return {
        ...prev,
        [name]: valueV,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    const apiBody = {
      class: selClass?.id,
      ...inputState,
      attributes: selClass.classAttributes,
    };

    const productRes = await addProduct(apiBody, state.token);

    if (productRes.success) {
      // const classUpdateRes = await addProductToClass(selClass?.id, {
      //   products: productRes?.data?.id,
      // });

      // if (!classUpdateRes.success) {
      //   toast.error("Failed to update Class.");
      // }

      dispatch(stopLoading());

      toast.success("Product created");

      return router.push("/products");
    } else if (productRes.success === false && productRes?.message) {
      dispatch(stopLoading());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.info(productRes?.message);
    } else {
      dispatch(stopLoading());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.info("some error occured.");
    }
  };
  const getFieldType = (attr) => {
    if (attr.type === "text_number") {
      return (
        <input
          type="text"
          value={attr.value || ""}
          name={attr?.name}
          onChange={(e) => handleMutableAttribute(e, attr)}
          className="form-control ms-3"
          placeholder="Enter value"
        />
      );
    }
    if (attr.type === "image_s3" || attr.type === "image_ipfs") {
      if (!attr?.immutable) return <a href={attr?.value}>{attr.value}</a>;
      return (
        <>
          <input
            type="file"
            name={attr?.name}
            onChange={(e) => handleMutableAttribute(e, attr)}
            className="form-control ms-3"
            placeholder="Enter value"
          />
          <a href={attr?.value}>{attr.value}</a>
        </>
      );
    }
  };
  return (
    <>
      <Navbar ProductsActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 className="app-page-title mb-5 main-title d-flex align-items-center justify-content-between">
                <span className="d-flex align-items-center">
                  <Link href="/products">
                    <a className="back-btn me-4">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                  </Link>
                  Add Product
                </span>
              </h1>

              <div className="app-card  h-100">
                <div className="app-card-body p-4 p-lg-5 ">
                  <div className="row">
                    <div className="col-md-12 col-12 product-col-form">
                      <form onSubmit={handleSubmit}>
                        <div className="product-form w-50">
                          <div className="form-group mb-4">
                            <label className="d-block mb-3">Name</label>
                            <input
                              name="name"
                              required
                              value={inputState.name}
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
                              rows={5}
                              value={inputState.desc}
                              onChange={handleInputChange}
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              style={{
                                minHeight: "170px !important",
                                borderRadius: "20px",
                              }}
                            ></textarea>
                          </div>
                          <div className="form-group mb-5">
                            <label className="d-block mb-3">Price</label>
                            <input
                              name="price"
                              required
                              value={inputState.price}
                              className="form-control"
                              onChange={handleInputChange}
                              type="number"
                            />
                          </div>
                          <div className="form-group mb-5">
                            <label className="d-block mb-3">Select Class</label>
                            <select
                              onChange={handleSelect}
                              defaultValue={selectedValue}
                              className="form-select form-control pt-2"
                              aria-label="Default select example"
                            >
                              <option selected={selectedValue === ""} disabled>
                                Select Class
                              </option>
                              {classes?.map((clas, ind) => {
                                return (
                                  <option
                                    selected={selectedValue === clas.name}
                                    required
                                    value={JSON.stringify(clas)}
                                  >
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
                              selClass?.classAttributes?.map((attr) => {
                                return (
                                  <div className="form-group mb-4">
                                    <label className="d-block mb-3">
                                      {attr?.name}
                                    </label>
                                    {getFieldType(attr)}
                                  </div>
                                );
                              })
                            ) : (
                              <p>No className is selected</p>
                            )}

                            <div className="form-group type-btn mt-5">
                              <button
                                disabled={!selClass}
                                type="submit"
                                className="add-attr-btn btn ms-auto d-block"
                              >
                                Create
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
