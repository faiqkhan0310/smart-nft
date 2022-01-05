/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import {
  faChevronCircleLeft,
  faChevronLeft,
  faEdit,
  faEye,
  faEyeDropper,
  faEyeSlash,
  faShoppingBag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Paginate/Paginate";
import { useRouter } from "next/router";
import { DashboardComponent } from "../../components/dashboard-component/DashboardComponent";
import { Navbar } from "../../components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { getClasses, delClass } from "../../service/class-service";
import { useContext } from "react";
import { genContext } from "pages/_app";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "store/admin-slice";

const Cars = ({ users, totalRecord, handleChange, form }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);
  const [total, setTotal] = useState(totalRecord);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const indexOflastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOflastPost - userPerPage;
  const [usersPaginated, setpostsPaginated] = useState(users);
  const [classes, setClasses] = useState([]);
  const [filterArray, setfilterArray] = useState([]);
  const [search, setSearch] = useState("");
  const [user, { mutate }] = useCurrentUser();
  const [tableLoading, setTableLoading] = useState(false);

  const getAllClasses = async () => {
    setTableLoading(true);
    const allCls = await getClasses(state.token);
    console.log(allCls);
    if (allCls.success) setClasses(allCls.classes);
    setTableLoading(false);
  };
  useEffect(() => {
    getAllClasses();
    // if (user === null) router.replace("/login");
  }, [user]);
  const paginate = (e, pageNumber) => {
    // e.preventDefault();
    fetch(
      `${process.env.BASE_URl}/api/admin/artist?limit=${userPerPage}&skip=${pageNumber}&search=${search}`
    )
      .then(async (res) => {
        let { artists, totalRecord } = await res.json();
        console.log("ArtistData", artists);
        setpostsPaginated(artists);
        setTotal(totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });
    setCurrentPage(pageNumber);
  };
  const previous = (e) => {
    if (currentPage > 1) {
      let number = currentPage - 1;
      paginate(number);
      setCurrentPage(e, number);
    }
  };
  const next = (e) => {
    let totalpage = total / userPerPage;
    if (currentPage < Math.ceil(totalpage)) {
      let number = currentPage + 1;
      paginate(e, number);
      setCurrentPage(number);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetch(
      `${process.env.BASE_URl}/api/admin/artist?limit=${userPerPage}&skip=${currentPage}&search=${search}`
    )
      .then(async (res) => {
        let { artists, totalRecord } = await res.json();
        setpostsPaginated(artists);
        setTotal(totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });

    //  console.log("Paginations",currentPage)
  }, [currentPage]);
  const handleDelete = async (id) => {
    dispatch(startLoading());
    const delRes = await delClass(id, state.token);
    console.log(delRes);
    dispatch(stopLoading());
    if (delRes.success) return getAllClasses();
    if (delRes.success === false && delRes?.message) {
      return toast.info(delRes?.message);
    }
    console.log(delRes);
    return toast.error("Something went wrong");
  };
  const handleDetail = (id) => {
    router.push(`/classes/detail/${id}`);
  };
  const handleEdit = (id) => {
    router.push(`/classes/add-classes/?classId=${id}`);
  };
  return (
    <>
      <Navbar ClassesActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto w-100">
              <h1 className="app-page-title main-title d-flex align-items-center justify-content-between">
                Classes{" "}
                <Link href="/classes/add-classes">
                  <a className="btn">Add Class</a>
                </Link>
              </h1>
            </div>
          </div>

          {/* <nav id="orders-table-tab" className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
				    <a className="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</a>
				    <a className="flex-sm-fill text-sm-center nav-link"  id="orders-paid-tab" data-bs-toggle="tab" href="#orders-paid" role="tab" aria-controls="orders-paid" aria-selected="false">Paid</a>
				    <a className="flex-sm-fill text-sm-center nav-link" id="orders-pending-tab" data-bs-toggle="tab" href="#orders-pending" role="tab" aria-controls="orders-pending" aria-selected="false">Pending</a>
				    <a className="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab" href="#orders-cancelled" role="tab" aria-controls="orders-cancelled" aria-selected="false">Cancelled</a>
				</nav> */}

          <div className="app-card app-card-orders-table mb-5">
            <div className="app-card-body p-4 ">
              {!tableLoading ? (
                <div className="table-responsive">
                  <table className="table mb-0 text-left">
                    <thead>
                      <tr>
                        <th className="cell">Id</th>
                        <th className="cell">Name</th>
                        <th className="cell">Attributes</th>
                        <th className="cell">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes &&
                        classes.map((data, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td className="cell">
                              {data?.name?.toUpperCase()}
                            </td>
                            <td className="cell">
                              {data?.classAttributes?.map((attr) => (
                                <span style={{ marginRight: "10px" }}>
                                  {attr.name.toUpperCase()}
                                </span>
                              ))}
                            </td>

                            <td className="cell">
                              <button
                                onClick={() => handleEdit(data.id)}
                                style={{
                                  borderRadius: "50%",
                                  width: "35px",
                                  height: "35px",
                                  marginLeft: "10px",
                                  backgroundColor: "white",
                                  borderColor: "rgb(102,153,204)",
                                }}
                              >
                                <FontAwesomeIcon
                                  style={{ color: "rgb(102,153,204)" }}
                                  icon={faEdit}
                                />
                              </button>
                              <button
                                onClick={() => handleDetail(data.id)}
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  backgroundColor: "white",
                                  borderRadius: "50%",
                                  marginLeft: "10px",
                                  borderColor: "green",
                                }}
                              >
                                <FontAwesomeIcon
                                  style={{ color: "green" }}
                                  icon={faEye}
                                />
                              </button>
                              <button
                                onClick={() => handleDelete(data.id)}
                                style={{
                                  borderRadius: "50%",
                                  backgroundColor: "white",
                                  marginLeft: "10px",
                                  borderColor: "orange",
                                }}
                              >
                                <FontAwesomeIcon
                                  style={{
                                    color: "red",
                                    // textshadow: " 0 0 100px blue",
                                  }}
                                  icon={faTrash}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="spinner-grow text-warning" role="status"></div>
              )}
            </div>
          </div>
          <Pagination
            postsPerPage={userPerPage}
            totalPosts={total}
            paginate={paginate}
            previous={previous}
            next={next}
          />
        </div>
      </div>
    </>
  );
};
export default Cars;
