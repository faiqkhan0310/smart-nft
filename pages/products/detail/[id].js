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
import { DashboardComponent } from "../../../components/dashboard-component/DashboardComponent";
import { Navbar } from "../../../components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { getOneProduct } from "service/product-service";
import { useContext } from "react";
import { genContext } from "pages/_app";
import { toast } from "react-toastify";

const Cars = ({ users, totalRecord, handleChange, form }) => {
  const context = useContext(genContext);
  const router = useRouter();
  const [total, setTotal] = useState(totalRecord);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const indexOflastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOflastPost - userPerPage;
  const [usersPaginated, setpostsPaginated] = useState(users);
  const [products, setProducts] = useState([]);
  const [filterArray, setfilterArray] = useState([]);
  const [search, setSearch] = useState("");
  const [user, { mutate }] = useCurrentUser();
  const [tableLoading, setTableLoading] = useState(false);

  const getProduct = async (id) => {
    setTableLoading(true);
    const allCls = await getOneProduct(id);
    console.log(allCls);
    console.log(allCls?.products);
    if (allCls.success) setProducts(allCls.products);
    setTableLoading(false);
  };
  useEffect(() => {
    const productId = router.query.id;
    getProduct(productId);
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

  return (
    <>
      <Navbar ClassesActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          {/* <div className="row mb-5">
            <h1 className="app-page-title main-title text-center ">
              Class Products{" "}
            </h1>
          </div> */}
          <div className="row g-3  mb-4 align-items-center justify-content-between ">
            <div className="col-6   ">
              {/* <h1>Name</h1> */}
              <h1 className="app-page-title  ">Product Name</h1>
            </div>
            <div className="col-6  ">
              <div className="row pr-5 ">
                <div className="col-12  text-center"></div>
                <h1 className="app-page-title">{products[0]?.name}</h1>
              </div>
            </div>
          </div>

          <div className="row g-3  mb-4 align-items-center justify-content-between ">
            <div className="col-6   ">
              {/* <h1>Name</h1> */}
              <h1 className="app-page-title">Attributes</h1>
            </div>
            <div className="col-6  ">
              <div className="row ">
                <div className="row pr-5 mt-5 w-50">
                  {products[0]?.attributes?.map((att) => {
                    return (
                      <span className="bg-dark text-white py-2 text-center rounded-1 mb-3">
                        {att.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cars;
