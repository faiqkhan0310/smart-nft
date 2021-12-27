/*eslint-disable*/

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { useRouter } from "next/router";
import Pagination from "@/components/Paginate/Paginate";
import { Navbar } from "../../components/layout/Navbar";
import { toast } from "react-toastify";

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
  const [deleting, setDeleting] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState("");
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
  const handleExhibitionDel = async (data, index) => {
    setDeleting(true);
    setDeletingIndex(index);
    try {
      const res = await fetch(
        `${process.env.BASE_URl}/api/exhibiton/update/${data._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const createDeleteJson = await res.json();

      if (createDeleteJson.success) {
        const url = `${process.env.BASE_URl}/api/exhibiton`;
        const currentPage = 1;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const arts = await res.json();
        setpostsPaginated(arts);
        toast.success("Exhibition deleted");
        setDeleting(false);
        setDeletingIndex("");
        return;
      } else {
        toast.error("Error");
        setDeleting(false);
        setDeletingIndex("");
        return;
      }
    } catch (err) {
      setDeleting(false);
      setDeletingIndex("");
      console.log(err);
      toast.error("Network error");
    }
  };
  const handleExhibitionEdit = (data) => {
    router.push({
      pathname: "/exhibition/new",
      query: { data: JSON.stringify(data) },
    });
  };

  // useEffect(() => {
  // 	// fetch(`${process.env.BASE_URl}/api/admin/art`, {
  // 	// 	method: "POST",
  // 	// 	headers: { "Content-Type": "application/json" },
  // 	// 	body: JSON.stringify({ currentPage }),
  // 	// })
  // 	// 	.then(async (res) => {
  // 	// 		let { arts, totalRecord } = await res.json();
  // 	// 		setpostsPaginated(arts);
  // 	// 		setfilterArray(arts);
  // 	// 	})
  // 	// 	.catch((err) => {
  // 	// 		console.log(err);
  // 	// 	});

  // 	//  console.log("Paginations",currentPage)
  // }, [currentPage]);
  return (
    <>
      {user != null && (
        <>
          <Navbar />
          <div>
            <div className="app-content">
              <div className="container-fluid">
                <div className="row">
                  <button
                    className="newexh"
                    onClick={() => {
                      router.push("/exhibition/new");
                    }}
                  >
                    New Exhibition
                  </button>
                </div>
                <div className="row g-3 mb-4 align-items-center justify-content-between">
                  <div className="col-auto">
                    <h1 className="app-page-title mb-0">Exhibiton</h1>
                  </div>

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
                  </div>
                </div>

                {/* <nav id="orders-table-tab" className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
				    <a className="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</a>
				    <a className="flex-sm-fill text-sm-center nav-link"  id="orders-paid-tab" data-bs-toggle="tab" href="#orders-paid" role="tab" aria-controls="orders-paid" aria-selected="false">Paid</a>
				    <a className="flex-sm-fill text-sm-center nav-link" id="orders-pending-tab" data-bs-toggle="tab" href="#orders-pending" role="tab" aria-controls="orders-pending" aria-selected="false">Pending</a>
				    <a className="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab" href="#orders-cancelled" role="tab" aria-controls="orders-cancelled" aria-selected="false">Cancelled</a>
				</nav> */}

                <div className="app-card app-card-orders-table mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table mb-0 text-left">
                        <thead>
                          <tr>
                            <th className="cell">Title</th>
                            <th className="cell">Starting Date</th>
                            <th className="cell">Ending Date</th>
                            <th className="cell">Location</th>
                            <th className="cell">Action</th>
                            {/* <th className="cell">description</th> */}
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
                                    {data.title}
                                  </a>
                                </td>
                                <td className="cell">
                                  <span className="truncate">
                                    {data.startingDate}
                                  </span>
                                </td>
                                <td className="cell">
                                  <span className="truncate">
                                    {data.endingDate}
                                  </span>
                                </td>
                                <td className="cell">{data.location}</td>
                                <td className="cell">
                                  <button
                                    onClick={() => handleExhibitionEdit(data)}
                                    style={{
                                      border: "none",
                                      outline: "none",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="green"
                                      className="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                      />
                                    </svg>
                                  </button>
                                  {deleting && deletingIndex == i ? (
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    ></div>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleExhibitionDel(data, i)
                                      }
                                      style={{
                                        border: "none",
                                        outline: "none",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="red"
                                        className="bi bi-trash2-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                      </svg>
                                    </button>
                                  )}
                                </td>
                                {/* <td className="cell">
                                  <span className="badge bg-success">
                                    {data.description}
                                  </span>
                                </td> */}
                                {/* <td className="cell">$259.35</td> */}
                                {/* <td className="cell">
                                  <span className="btn-sm app-btn-secondary">
                                    <Link
                                      href={{
                                        pathname: "/art/[id]",
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
                                    <Link href={"/art/edit/" + data._id}>
                                      Edit
                                    </Link>
                                  </span>
                                </td> */}
                                {/* <td>
                                  <input
                                    type="checkbox"
                                    name="featured"
                                    id="featured"
                                    onClick={() =>
                                      handleFeatured(data._id, data.Featured)
                                    }
                                    checked={data.Featured}
                                  />
                                  {featuredLoading &&
                                    loadingId === data._id && (
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      ></div>
                                    )}
                                </td> */}
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
          <ToastContainer />
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.BASE_URl}/api/exhibiton`;
  const currentPage = 1;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const arts = await res.json();
  console.log("therer");
  console.log(arts);
  return {
    props: { posts: arts },
  };
}
