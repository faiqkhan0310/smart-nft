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
import { DashboardComponent } from "../../../components/dashboard-component/DashboardComponent";
import { Navbar } from "../../../components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getProducts } from "../../../service/product-service";
import { addProductToClass } from "../../../service/class-service";
import { values } from "public/assets/plugins/fontawesome/js/v4-shims";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getOneProduct,
  updateProduct,
} from "service/product-service";
import { useContext } from "react";
import { genContext } from "pages/_app";
import { getClasses } from "service/class-service";
import { startLoading, stopLoading } from "store/admin-slice";

export default function AddProduct() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);
  const router = useRouter();
  const [classes, setClasses] = React.useState([]);
  const [selClass, setSelClass] = React.useState();
  const [selClassPrev, setSelClassPrev] = React.useState(undefined);
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [classId, setClassId] = React.useState(undefined);
  const [procuctAttributes, setProductAttributes] = React.useState([]);
  const [inputState, setInputState] = React.useState({
    name: "",
    desc: "",
    price: undefined,
    list: false,
  });

  const getProduct = async (id) => {
    const ProductData = await getOneProduct(id);

    if (ProductData.success) {
      console.log(ProductData.products[0]?.attributes);
      setInputState({
        name: ProductData.products[0]?.name,
        desc: ProductData.products[0]?.desc,
        price: ProductData.products[0]?.price,
        list: ProductData.products[0]?.list,
      });
      setSelClass(ProductData.products[0]?.class);
      setSelectedValue(ProductData.products[0]?.class?.name);
      setProductAttributes([...ProductData.products[0]?.attributes]);
    }
  };
  React.useEffect(async () => {
    if (router.query?.id) {
      const allClasses = await getClasses();
      if (allClasses?.success) setClasses(allClasses?.classes);
      setIsEdit(true);
      setClassId(router.query?.id);
      getProduct(router.query?.id);
    }
  }, []);

  const handleSelect = (e) => {
    setSelClassPrev(selClass._id);
    setSelClass(JSON.parse(e.target.value));
    const dd = JSON.parse(e.target.value);

    setSelectedValue(dd.name);
    console.log(dd);
    if (dd._id !== classId) {
      setProductAttributes([...dd.attributes]);
    }
    setClassId(dd._id);
  };

  const handleMutableAttribute = (e, attr) => {
    const { name, value } = e.target;
    console.log(name, value);
    const productAttributeCopy = [...procuctAttributes];
    console.log(productAttributeCopy);
    const productAttrIndex = productAttributeCopy.indexOf(attr);
    productAttributeCopy[productAttrIndex].value = value;
    setProductAttributes([...productAttributeCopy]);
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
    dispatch(startLoading());
    const apiBody = {
      class: selClass?._id,
      ...inputState,
      attributes: procuctAttributes,
    };

    const selectService = () => {
      if (isEdit) {
        return updateProduct(classId, selClassPrev, selClass, apiBody);
      } else return addProduct(apiBody);
    };
    const productRes = await selectService();

    if (productRes.success) {
      if (isEdit) {
        toast.success("Product Updated");

        dispatch(stopLoading());

        return router.push("/products");
      }
      const classUpdateRes = await addProductToClass(selClass?._id, {
        products: productRes?.data?._id,
      });

      if (!classUpdateRes.success) {
        toast.error("Failed to update Class.");
      }

      dispatch(stopLoading());

      {
        !isEdit
          ? toast.success("Product created")
          : toast.success("Product Updated");
      }

      return router.push("/products");
    } else if (productRes.success === false && productRes?.message) {
      dispatch(stopLoading());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.info(productRes?.message);
    } else {
      // context.setLoading(false);
      dispatch(stopLoading());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.info("some error occured.");
    }

    console.log(productRes);
  };
  const getFieldType = (attr) => {
    console.log(attr);
    if (attr.type === "text_number") {
      return (
        <input
          type="text"
          value={attr.value}
          name={attr?.name}
          disabled={isEdit && attr?.immutable}
          onChange={(e) => handleMutableAttribute(e, attr)}
          className="form-control ms-3"
          placeholder="Enter value"
        />
      );
    }
    if (attr.type === "image_s3" || attr.type === "image_ipfs") {
      if (!attr?.mutable) return <a href={attr?.value}>{attr.value}</a>;
      return (
        <>
          <input
            type="file"
            name={attr?.name}
            // value={attr.value}
            disabled={isEdit && attr?.immutable}
            onChange={(e) => handleMutableAttribute(e, attr)}
            className="form-control ms-3"
            placeholder="Enter value"
          />
          <a href={attr?.value}>{attr.value}</a>
        </>
      );
    }
    return (
      <input
        type="text"
        name="value"
        disabled
        onChange={(e) => handleMutableAttribute(e, attr)}
        className="ms-3"
        style={{ visibility: "hidden", minWidth: "280px" }}
        placeholder="Enter value"
      />
    );
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
                  {" "}
                  <Link href="/products">
                    <a className="back-btn me-4">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                  </Link>
                  {isEdit ? "Update Product" : "Add Product"}
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
                                console.log(clas);
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
                              procuctAttributes?.map((attr) => {
                                return (
                                  <div className="form-group mb-4">
                                    <label className="d-block mb-3">
                                      {attr?.name}
                                    </label>
                                    {/* <input
                                      type="text"
                                      name={attr?.name}
                                      value={attr?.type}
                                      onChange={(e) =>
                                        handleMutableAttribute(e, attr)
                                      }
                                      disabled={!attr?.mutable}
                                      className="form-control me-2"
                                      placeholder=""
                                    /> */}
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
