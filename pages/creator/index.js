/*eslint-disable*/

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { useRouter } from "next/router";
import Pagination from "@/components/Paginate/Paginate";
import { Navbar } from "../../components/layout/Navbar";

// import searchedValue from "./../../hooks/filter";
export default function Art({ posts, totalRecord }) {
  const [total, setTotal] = useState(totalRecord);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOflastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOflastPost - postsPerPage;
  const [postsPaginated, setpostsPaginated] = useState(posts);
  const [filterArray, setfilterArray] = useState([]);
  const [user, { mutate }] = useCurrentUser();
  const [search, setSearch] = useState("");
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [loadingId, setLoadingId] = useState("");
  const router = useRouter();
  //const [Auctioned, setAuctioned] = useState()

  useEffect(() => {
    // if (user === null) router.replace("/login");
  }, [user]);
  const paginate = (e, pageNumber) => {
    e.preventDefault();
    const Auctioned = e.target.value;
    fetch(
      `${process.env.BASE_URl}/api/admin/art?currentPage=${pageNumber}&search=${search}&Auctioned=${Auctioned}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ currentPage }),
      }
    )
      .then(async (res) => {
        let { arts, totalRecord } = await res.json();
        setpostsPaginated(arts);
        setTotal(totalRecord);
        setfilterArray(arts);
      })
      .catch((err) => {
        console.log(err);
      });
    //	setCurrentPage(pageNumber);
  };
  const previous = (e) => {
    if (currentPage > 1) {
      let number = currentPage - 1;
      paginate(e, number);
      setCurrentPage(number);
    }
  };
  const next = (e) => {
    let totalpage = total / postsPerPage;
    if (currentPage < Math.ceil(totalpage)) {
      let number = currentPage + 1;
      paginate(e, number);
      setCurrentPage(number);
    }
  };
  const getStatus = (status) => {
    if (status === 0) return "Pending";
    if (status === 1) return "Accepted";
    if (status === 2) return "Rejected";
  };
  const handleAuctioned = async (e) => {
    e.preventDefault();
    //	Auctioned=e.target.value
    //  setAuctioned(Auctioned)
    paginate(e, 1);
  };
  const handleSearch = (e) => {
    // const { filterArray } = searchedValue(e.target.value, postsPaginated);
    const regex = new RegExp(`${e.target.value}`, "gi");
    if (e.target.value === "") {
      setpostsPaginated(filterArray);
    } else {
      let arr = postsPaginated.filter((prev) => {
        if (prev.name.match(regex)) {
          return prev;
        }
      });
      setpostsPaginated(arr);
    }
  };

  const handleFeatured = (id, prevFea) => {
    setLoadingId(id);
    setFeaturedLoading(true);

    fetch(`${process.env.BASE_URl}/api/admin/art/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Featured: !prevFea }),
    })
      .then(async (res) => {
        fetch(`${process.env.BASE_URl}/api/admin/art`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPage }),
        })
          .then(async (res) => {
            setFeaturedLoading(false);
            let { arts, totalRecord } = await res.json();
            setpostsPaginated(arts);
            setfilterArray(arts);
            setTotal(totalRecord);
          })
          .catch((err) => {
            setFeaturedLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setFeaturedLoading(false);
        console.log(err);
      });
  };
  const statusBadge = (status) => {
    if (status === 0)
      return <span className="badge bg-primary">{getStatus(status)}</span>;
    if (status === 1)
      return <span className="badge bg-success">{getStatus(status)}</span>;
    if (status === 2)
      return <span className="badge bg-danger">{getStatus(status)}</span>;
  };

  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div>
            <div className="app-content">
              <div className="container-fluid">
                <div className="row g-3 mb-4 align-items-center justify-content-between">
                  <div className="col-auto">
                    <h1 className="app-page-title mb-0">Creator Request's</h1>
                  </div>
                  {/* 
                  <div className="col-auto d-flex flex-wrap align-items-center search-box col-md-6 justify-content-between">
                    <div className="col-md-5">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => handleAuctioned(e)}
                      >
                        <option disabled hidden selected>
                          Please Select Auctioned{" "}
                        </option>
                        <option key="1" value={"none"}>
                          All Auctioned{" "}
                        </option>
                        <option key="2" value={true}>
                          Auctioned
                        </option>
                        <option key="3" value={false}>
                          UnAuctioned
                        </option>
                      </select>
                    </div>

                    <form className="table-search-form  col-md-6 d-flex flex-wrap gx-1 align-items-center justify-content-between">
                      <div className="col-md-8">
                        <input
                          type="text"
                          id="search-orders"
                          name="searchorders"
                          className="form-control search-orders"
                          placeholder="Search"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className="col-auto">
                        <button
                          type="button "
                          className="btn app-btn-secondary"
                          onClick={(e) => paginate(e, 1)}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div> */}
                </div>

                <div className="app-card app-card-orders-table mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table mb-0 text-left">
                        <thead>
                          <tr>
                            <th className="cell">OwnerId</th>
                            <th className="cell">Name</th>
                            <th className="cell">Status</th>
                            <th className="cell">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {postsPaginated &&
                            !!postsPaginated.length &&
                            postsPaginated.map((data, i) => (
                              <tr key={i}>
                                <td className="cell">
                                  <a
                                    href={`https://www.bxminft.com/art/${data._id}`}
                                    target="_blank"
                                  >
                                    {data.artistId}
                                  </a>
                                </td>
                                <td className="cell">{data.name}</td>
                                <td className="cell">
                                  {statusBadge(data.status)}
                                </td>
                                <td className="cell">
                                  <span className="btn-sm app-btn-secondary">
                                    <Link
                                      href={{
                                        pathname: `/creator/${data._id}?CId=${data.artistId}`,
                                        query: {
                                          id: data._id,
                                          OId: data.OwnerId,
                                          CId: data.CreatorId,
                                        },
                                      }}
                                    >
                                      View
                                    </Link>
                                  </span>{" "}
                                  <span className="btn-sm app-btn-secondary">
                                    <Link
                                      href={`/creator/edit/${data._id}?CId=${data.artistId}&Email=${data.email}`}
                                    >
                                      Edit
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
                  postsPerPage={postsPerPage}
                  totalPosts={total}
                  paginate={paginate}
                  previous={previous}
                  next={next}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.BASE_URl}/api/creator`;
  const currentPage = 1;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const { creator } = await res.json();
  return {
    props: { posts: creator },
  };
}
