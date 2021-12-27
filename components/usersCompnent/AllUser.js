/*eslint-disable*/

import React, { useEffect, useState } from "react";
import { Navbar } from "../layout/Navbar";
import Pagination from "@/components/Paginate/Paginate";
import { useCurrentUser } from "@/hooks/user";
import Link from "next/link";

const AllUser = ({ users, totalRecord, handleChange, form }) => {
  const [total, setTotal] = useState(totalRecord);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const indexOflastPost = currentPage * userPerPage;
  const indexOfFirstPost = indexOflastPost - userPerPage;
  const [usersPaginated, setpostsPaginated] = useState(users);
  const [filterArray, setfilterArray] = useState([]);
  const [search, setSearch] = useState("");
  const [user, { mutate }] = useCurrentUser();
  // useEffect(() => {
  //   if (user === null) router.replace("/login");
  // }, [user]);
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
      <Navbar UsersActive="active" />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto">
              <h1 className="app-page-title main-title mb-0">All Users</h1>
            </div>

            <div className="col-auto">
              <div className="page-utilities">
                <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                  <div className="col-auto">
                    <form className="table-search-form row gx-1 align-items-center">
                      <div className="col-auto">
                        <input
                          type="text"
                          id="search-orders"
                          name="search"
                          className="form-control search-orders"
                          placeholder="Search"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className="col-auto">
                        <button
                          type="button "
                          className="btn app-btn-secondary"
                          onClick={(e) => {
                            paginate(e, 1);
                          }}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <div className="col-auto">
								    
								    <select className="form-select w-auto" >
										  <option selected value="option-1">All</option>
										  <option value="option-2">This week</option>
										  <option value="option-3">This month</option>
										  <option value="option-4">Last 3 months</option>
										  
									</select>
							    </div>  */}
                  {/* <div className="col-auto">						    
								    <a className="btn app-btn-secondary" href="#">
									    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		  <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
		  <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
		</svg>
									    Download CSV
									</a>
							    </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* <nav id="orders-table-tab" className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
				    <a className="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</a>
				    <a className="flex-sm-fill text-sm-center nav-link"  id="orders-paid-tab" data-bs-toggle="tab" href="#orders-paid" role="tab" aria-controls="orders-paid" aria-selected="false">Paid</a>
				    <a className="flex-sm-fill text-sm-center nav-link" id="orders-pending-tab" data-bs-toggle="tab" href="#orders-pending" role="tab" aria-controls="orders-pending" aria-selected="false">Pending</a>
				    <a className="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab" href="#orders-cancelled" role="tab" aria-controls="orders-cancelled" aria-selected="false">Cancelled</a>
				</nav> */}

          <div className="app-card app-card-orders-table p-4 mb-5">
            <div className="app-card-body">
              <div className="table-responsive">
                <table className="table mb-0 text-left">
                  <thead>
                    <tr>
                      <th className="cell">Name</th>
                      <th className="cell">Public Address</th>
                      <th className="cell">Minted</th>
                      <th className="cell">Email Verification</th>
                      <th className="cell">Membership Status</th>
                      <th className="cell">Is Creator?</th>
                      <th className="cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersPaginated &&
                      usersPaginated.map((data, index) => (
                        <tr>
                          <td className="cell">{data.ArtistName}</td>
                          <td className="cell">
                            <span
                              className="d-inline-block text-truncate"
                              style={{ "max-width": "150px" }}
                            >
                              {data.PublicAddress}
                            </span>
                          </td>

                          <td className="cell">{data.totalMinted}</td>
                          <td className="cell">
                            {data.isEmailVerified == true ? (
                              <strong className="text-success">Verified</strong>
                            ) : (
                              <strong className="text-danger">
                                Not Verified
                              </strong>
                            )}
                          </td>
                          <td className="cell">
                            {data.memberStatus == true ? (
                              <strong className="text-success">Active</strong>
                            ) : (
                              <strong className="text-danger"> Pending</strong>
                            )}
                          </td>
                          <td className="cell">
                            {data.isCreator == true ? (
                              <strong className="text-success">Yes</strong>
                            ) : (
                              <strong className="text-danger"> No</strong>
                            )}
                          </td>

                          {/* <td className="cell">
                            <div className="form-check form-switch mb-3">
                              <form>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="block"
                                  name="block"
                                  onChange={()=>{handleChange()}}
                                  
                                />
                              </form>
                            </div>{" "}
                          </td> */}
                          <td className="cell">
                            <span className="btn-sm btn app-btn-secondary me-3">
                              {" "}
                              <Link
                                href={`/users/details/${data._id}`}
                                as={`/users/details/${data._id}`}
                              >
                                {" View "}
                              </Link>
                            </span>
                            <span className="btn-sm btn app-btn-secondary">
                              <Link
                                href={`/users/edit/${data._id}`}
                                as={`/users/edit/${data._id}`}
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
};

export default AllUser;
