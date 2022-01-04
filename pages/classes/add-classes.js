/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { Navbar } from "../../components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addClass,
  getOneClass,
  updateClass,
} from "../../service/class-service";
import { startLoading, stopLoading } from "store/admin-slice";

export default function Addcar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);
  const router = useRouter();
  const [isEdit, setIsEdit] = React.useState(false);
  const [classId, setClassId] = React.useState(undefined);
  const [gettingData, setGetingData] = React.useState(false);

  const [classA, setClassA] = React.useState({
    name: "",
    type: "sale",
  });
  const [attributes, setAttributes] = React.useState([
    { name: "", type: "", immutable: false, value: "" },
  ]);
  const handleSubmit = async (e) => {
    console.log(state);
    e.preventDefault();
    dispatch(startLoading());
    const apibody = {
      ...classA,
      attributes: [...attributes],
    };
    console.log("updae className and className is is  ", classId);
    const selectService = () => {
      if (isEdit) {
        console.log(classId);
        return updateClass(classId, apibody, state.token);
      } else return addClass(apibody, state.token);
    };
    const clRes = await selectService();
    if (clRes.success) {
      dispatch(stopLoading());
      {
        !isEdit
          ? toast.success("Class Created!")
          : toast.success("Class Updated!");
      }
      return router.push("/classes");
    } else if (clRes.success === false && clRes?.message) {
      dispatch(stopLoading());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.info(clRes?.message);
    } else {
      dispatch(stopLoading());
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.error("Some error occured!");
      return;
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClassA((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const addAttribute = () => {
    const attributeObj = { name: "", type: "", immutable: false };
    const attributesCopy = [...attributes];
    if (attributesCopy.length === 10) return;

    attributesCopy.push(attributeObj);
    setAttributes(attributesCopy);
  };
  const handleDelete = (indx) => {
    const attributesCopy = [...attributes];
    console.log(indx);
    console.log(attributesCopy[indx]);
    attributesCopy.splice(indx, 1);
    console.log(attributesCopy);
    setAttributes([...attributesCopy]);
  };
  const handleAttributeChange = (e, indx) => {
    const { name, value, checked } = e.target;
    console.log(name);
    const attributesCopy = [...attributes];
    if (name === "immutable") {
      attributesCopy[indx][name] = checked;
      setAttributes([...attributesCopy]);
      return;
    }
    attributesCopy[indx][name] = value;
    setAttributes([...attributesCopy]);
  };
  // const getFieldType = (attribute, indx) => {
  //   console.log("in field tgype");
  //   console.log(attribute);
  //   if (attribute.type === "text_number") {
  //     return (
  //       <input
  //         type="text"
  //         name="value"
  //         value={attribute?.value}
  //         onChange={(e) => handleAttributeChange(e, indx)}
  //         className="form-control ms-3"
  //         placeholder="Enter value"
  //       />
  //     );
  //   }
  //   if (attribute.type === "image_s3" || attribute.type === "image_ipfs") {
  //     console.log("herer value");
  //     console.log(attribute);

  //     return (
  //       <div className="w-100  pos-rel ">
  //         <input
  //           type="file"
  //           name="value"
  //           // value={attribute?.value}
  //           onChange={(e) => handleAttributeChange(e, indx)}
  //           className="form-control ms-3"
  //           placeholder="Enter value"
  //         />

  //         {attribute.value && (
  //           <div className="class_img_view ms-4">
  //             <a className="d-block" href={attribute?.value}>
  //               View Image
  //             </a>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   }
  //   return (
  //     <input
  //       type="text"
  //       name="value"
  //       disabled
  //       onChange={(e) => handleAttributeChange(e, indx)}
  //       className="ms-3"
  //       style={{ visibility: "hidden", minWidth: "280px" }}
  //       placeholder="Enter value"
  //     />
  //   );
  // };

  const getClass = async (id) => {
    setGetingData(true);
    const classData = await getOneClass(id, state.token);
    if (classData.success) {
      setAttributes([...classData.classes?.attributes]);
      setClassA({
        name: classData.classes?.name,
        type: "sale",
      });
    }
    setGetingData(false);
  };

  React.useEffect(() => {
    console.log(router.query?.classId);
    if (router.query?.classId) {
      setIsEdit(true);
      setClassId(router.query?.classId);
      getClass(router.query?.classId);
    }
  }, [router]);
  return (
    <>
      <Navbar ClassesActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          {!gettingData ? (
            <div className="row">
              <div className="col-12">
                <h1 className="app-page-title mb-5 main-title d-flex align-items-center justify-content-between">
                  <span className="d-flex align-items-center">
                    {" "}
                    <Link href="/classes">
                      <a className="back-btn me-4">
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </a>
                    </Link>
                    {isEdit ? "Edit Class" : " Add Classes"}
                  </span>
                </h1>

                <div className="app-card  h-100">
                  <div className="app-card-body p-4 p-lg-5 ">
                    <div className="row">
                      <div className="col-12 mint-nft-form">
                        <form onSubmit={handleSubmit}>
                          <div className="mint-nft-form">
                            <div className="row">
                              <div className="col-6">
                                <div className="form-group mb-5">
                                  <label className="d-block mb-3">Name</label>
                                  <input
                                    className="form-control"
                                    name="name"
                                    value={classA?.name}
                                    onChange={handleChange}
                                    type="text"
                                  />
                                </div>

                                <div className="form-group type-btn mb-5">
                                  <label className="d-block mb-4">Type</label>
                                  <button type="button" className="btn me-3">
                                    Sale
                                  </button>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group add-attr-col mb-5">
                                  <label className="d-block mb-4">
                                    Add Attributes{" "}
                                    <small>
                                      (You can add upto 10 attribute)
                                    </small>
                                  </label>
                                  <ol>
                                    {attributes &&
                                      attributes?.map((attribute, indx) => {
                                        console.log(attribute);
                                        return (
                                          <li>
                                            <div className="d-flex align-items-center mb-4">
                                              <input
                                                type="text"
                                                name="name"
                                                value={attribute?.name}
                                                onChange={(e) =>
                                                  handleAttributeChange(e, indx)
                                                }
                                                className="form-control me-2"
                                                placeholder="Enter Attribute Name"
                                              />

                                              <div className="form-check ms-3 me-3">
                                                <input
                                                  name="immutable"
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  onChange={(e) =>
                                                    handleAttributeChange(
                                                      e,
                                                      indx
                                                    )
                                                  }
                                                  checked={attribute?.immutable}
                                                  id="flexCheckDefault3"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="flexCheckDefault3"
                                                >
                                                  IMmutable
                                                </label>
                                              </div>

                                              <select
                                                onChange={(e) =>
                                                  handleAttributeChange(e, indx)
                                                }
                                                name="type"
                                                id="type"
                                                className="form-control"
                                              >
                                                <option
                                                  selected={
                                                    attribute.type === ""
                                                  }
                                                  value="disable"
                                                  disabled
                                                >
                                                  Select Type
                                                </option>

                                                <option
                                                  selected={
                                                    attribute.type ===
                                                    "text_number"
                                                  }
                                                  value="text_number"
                                                >
                                                  Text/Number
                                                </option>
                                                <option
                                                  selected={
                                                    attribute.type ===
                                                    "image_s3"
                                                  }
                                                  value="image_s3"
                                                >
                                                  Image/S3
                                                </option>
                                                <option
                                                  selected={
                                                    attribute.type ===
                                                    "image_ipfs"
                                                  }
                                                  value="image_ipfs"
                                                >
                                                  Image/IPFS
                                                </option>
                                              </select>
                                              {/* {getFieldType(attribute, indx)} */}

                                              <button
                                                className="rounded border-0 ms-5 bg-transparent"
                                                type="button"
                                              >
                                                <FontAwesomeIcon
                                                  style={{
                                                    color: "red",
                                                  }}
                                                  icon={faTrash}
                                                  onClick={() =>
                                                    handleDelete(indx)
                                                  }
                                                />
                                              </button>
                                            </div>
                                          </li>
                                        );
                                      })}
                                  </ol>

                                  <div className="form-group type-btn mt-5">
                                    <button
                                      onClick={addAttribute}
                                      type="button"
                                      className="add-attr-btn btn ms-0"
                                    >
                                      Add More Attribute
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group type-btn mt-5 ">
                            <button
                              type="submit"
                              className="add-attr-btn btn w-50 ms-0 "
                            >
                              {isEdit ? "Update Class" : " Create Class"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-2">
                  <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
