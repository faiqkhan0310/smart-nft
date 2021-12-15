/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import {
  faChevronCircleLeft,
  faChevronLeft,
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
import { getClasses, delClass } from "service/class-service";
import { useContext } from "react";
import { genContext } from "pages/_app";

const Cars = ({ users, totalRecord, handleChange, form }) => {
  const context = useContext(genContext);
  const router = useRouter();
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
    const allCls = await getClasses();
    console.log(allCls);
    if (allCls.success) setClasses(allCls.classes);
    setTableLoading(false);
  };
  useEffect(() => {
    getAllClasses();
    if (user === null) router.replace("/login");
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
    context.setLoading(true);
    const delRes = await delClass(id);
    console.log(delRes);
    context.setLoading(false);
    if (delRes.success) getAllClasses();
  };
  return (
    <>
      <Navbar ClassesActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto w-100">
              <h1 class="app-page-title main-title d-flex align-items-center justify-content-between">
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
                            <td>1</td>
                            <td className="cell">{data.name}</td>
                            <td className="cell">
                              {data.attributes?.map((attr) => (
                                <span>{attr.name}</span>
                              ))}
                            </td>

                            <td className="cell">
                              {/* <span className="btn-sm btn app-btn-secondary me-3">
                              {" "}
                              <Link
                                href={`/users/details/${data._id}`}
                                as={`/users/details/${data._id}`}
                                href=""
                              >
                                {" View "}
                              </Link>
                            </span> */}
                              {/* <span className="btn-sm btn app-btn-secondary">
                              <Link
                                href=""
                                 href={`/users/edit/${data._id}`}
                                 as={`/users/edit/${data._id}`}
                              >
                                {"Edit"}
                              </Link>
                            </span> */}
                              <button
                                onClick={() => handleDelete(data._id)}
                                style={{
                                  borderRadius: "50%",
                                  marginLeft: "10px",
                                  borderColor: "orange",
                                }}
                              >
                                <FontAwesomeIcon
                                  style={{ color: "red" }}
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
                <div className="spinner-grow text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
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
