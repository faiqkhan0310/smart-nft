/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import {
  faChevronCircleLeft,
  faChevronLeft,
  faEdit,
  faEye,
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
import { useContext } from "react";
import { delProduct, getProducts } from "service/product-service";
import { genContext } from "pages/_app";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "store/admin-slice";

const Products = ({ users, totalRecord, handleChange, form }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);
  const [total, setTotal] = useState(totalRecord);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const indexOflastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOflastPost - userPerPage;
  const [usersPaginated, setpostsPaginated] = useState(users);
  const [filterArray, setfilterArray] = useState([]);
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

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
  const getAllProducts = async () => {
    setTableLoading(true);
    const allCls = await getProducts(state.token);
    console.log(allCls);
    if (allCls.success) setClasses(allCls.classes);
    setTableLoading(false);
  };
  useEffect(async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getAllProducts();
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
    const delRes = await delProduct(id, state.token);
    console.log(delRes);
    dispatch(stopLoading());
    if (delRes.success) getAllProducts();
  };
  const handleDetail = (id) => {
    router.push(`/products/detail/${id}`);
  };
  const handleEdit = (id) => {
    router.push(`/products/update/${id}`);
  };
  return (
    <>
      <Navbar ProductsActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto w-100">
              <h1 className="app-page-title main-title d-flex align-items-center justify-content-between">
                Products{" "}
                <Link href="/products/add-product">
                  <a className="btn"> Add Product</a>
                </Link>
              </h1>
            </div>
          </div>

          <div className="app-card app-card-orders-table mb-5">
            <div className="app-card-body p-4">
              {!tableLoading ? (
                <div className="table-responsive">
                  <table className="table mb-0 text-left">
                    <thead>
                      <tr>
                        <th className="cell">Id</th>
                        <th className="cell">Name</th>
                        <th className="cell">Class</th>
                        <th className="cell">Desc</th>
                        <th className="cell">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes &&
                        classes.map((data, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td className="cell">{data?.name}</td>
                            <td className="cell">{data?.class?.name}</td>

                            <td className="cell w-50">{data?.desc}</td>

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
export default Products;
