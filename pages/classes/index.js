/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import { faChevronCircleLeft, faChevronLeft, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Paginate/Paginate";
import { router } from "next/router";
import { DashboardComponent } from "../../components/dashboard-component/DashboardComponent";
import { Navbar } from "../../components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

const Cars = ({ users, totalRecord, handleChange, form }) =>  {

    const [total, setTotal] = useState(totalRecord);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const indexOflastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOflastPost - userPerPage;
  const [usersPaginated, setpostsPaginated] = useState(users);
  const [filterArray, setfilterArray] = useState([]);
  const [search, setSearch] = useState("");
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
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
         <Navbar
         ClassesActive="active"
          />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto w-100">
            <h1 class="app-page-title main-title d-flex align-items-center justify-content-between">
               Classes{" "}
                <Link href="/classes/add-classes">
                <a className="btn">
                 Add Class
                </a>
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
            <div className="app-card-body p-4">
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
                    {usersPaginated &&
                      usersPaginated.map((data, index) => (
                        <tr>
                          <td>
                            1
                          </td>
                          <td className="cell">Car</td>
                          <td className="cell">
                            Size , color , model 
                          </td>


                          <td className="cell">
                            <span className="btn-sm btn app-btn-secondary me-3">
                              {" "}
                              <Link
                                // href={`/users/details/${data._id}`}
                                // as={`/users/details/${data._id}`}
                                href=""
                              >
                                {" View "}
                              </Link>
                            </span>
                            <span className="btn-sm btn app-btn-secondary">
                              <Link
                              href=""
                                // href={`/users/edit/${data._id}`}
                                // as={`/users/edit/${data._id}`}
                              >
                                {"Edit"}
                              </Link>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
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
}
export default Cars;