/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Paginate/Paginate";
import { useRouter } from "next/router";
import { Navbar } from "../../../components/layout/Navbar";
import Link from "next/link";
import { getOneClass } from "../../../service/class-service";
import { useSelector } from "react-redux";

const Cars = ({ users, totalRecord, handleChange, form }) => {
  const router = useRouter();
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
  const getFileName = (fullLink) => {
    const arry = fullLink.split("/");
    return arry[arry.length - 1];
  };
  const getClass = async (id) => {
    setTableLoading(true);
    const allCls = await getOneClass(id, state.token);
    console.clear();
    console.log(allCls);
    console.log(allCls?.products);
    if (allCls.success) setClasses(allCls.classes);
    setTableLoading(false);
  };

  useEffect(() => {
    const classId = router.query.id;
    getClass(classId);
  }, [router]);
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

  return (
    <>
      <Navbar ClassesActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              paddingLeft: "15px",
              boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            {!tableLoading ? (
              <>
                <div className="row g-3  mb-4 align-items-center  ">
                  <div className="col-12 d-flex">
                    <Link href="/classes">
                      <a className="back-btn me-4 mt-2">
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </a>
                    </Link>
                    <h1 className="app-page-title main-title">
                      Class Details{" "}
                    </h1>
                  </div>
                  <div className="col-6 col-md-4  col-lg-3  ">
                    <h1 className="app-page-title  ">Class Name</h1>
                  </div>
                  <div className="col-6 col-md-4  col-lg-3  ">
                    <div className="row pr-5 ">
                      <div className="col-12  text-center"></div>
                      <h1 className="app-page-title">{classes?.name}</h1>
                    </div>
                  </div>
                </div>

                <div className="row g-3  mb-4 align-items-center  ">
                  <div className="col-6 col-md-4  col-lg-3 ">
                    <h1 className="app-page-title">Attributes</h1>
                  </div>
                  <div className="col-6 col-md-4 col-lg-9 ">
                    <div className="row mb-3 ">
                      <div className="row pr-5 mt-3 w-50">
                        <div className="chip-parent">
                          {classes?.classAttributes?.map((att) => {
                            return (
                              <>
                                <div
                                  style={{
                                    backgroundColor: "white",
                                    marginRight: "20px",
                                    marginBottom: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    alignContent: "center",
                                    borderRadius: "10px",
                                    boxShadow:
                                      " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                  }}
                                >
                                  <span className="att_chip">{att.name}</span>
                                  <span className="att_info mt-3">
                                    {att.type}
                                  </span>
                                  <span className="att_info">
                                    {att.type !== "text_number" ? (
                                      <a href={att.value}>Image Link</a>
                                    ) : (
                                      att.value
                                    )}
                                  </span>
                                  <span className="att_info">
                                    {att.immutable ? "IMmutable" : "Mutable"}
                                  </span>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </div>

          <div className="row g-3  mt-5 align-items-center justify-content-between">
            <div className="col-auto w-100">
              <h1 className="app-page-title  d-flex align-items-center justify-content-between">
                Class Products{" "}
              </h1>
            </div>
          </div>

          {classes?.products?.length && (
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
                        </tr>
                      </thead>
                      <tbody>
                        {classes &&
                          classes?.products?.map((data, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td className="cell">
                                {data?.name?.toUpperCase()}
                              </td>
                              <td className="cell">
                                {data.attributes?.map((attr) => (
                                  <>
                                    <span
                                      style={{
                                        marginRight: "5px",
                                      }}
                                    >
                                      {attr.name}
                                    </span>
                                  </>
                                ))}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div
                    className="spinner-grow text-warning"
                    role="status"
                  ></div>
                )}
              </div>
            </div>
          )}
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
