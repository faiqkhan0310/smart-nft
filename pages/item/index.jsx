import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import router from "next/router";
import Pagination from "@/components/Paginate/Paginate";
import { Navbar } from "../../components/layout/Navbar";

// import searchedValue from "./../../hooks/filter";
export default function Item({ posts, totalRecord }) {
  const [total, setTotal] = useState(totalRecord);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOflastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOflastPost - postsPerPage;
  const [postsPaginated, setpostsPaginated] = useState(posts);
  const [filterArray, setfilterArray] = useState([]);
  const [user, { mutate }] = useCurrentUser();
  const [search, setSearch] = useState("");
  //const [Auctioned, setAuctioned] = useState()
  useEffect(() => {
    if (user === null) router.replace("/login");
  }, [user]);
  const paginate = (e, pageNumber) => {
    e.preventDefault();
    const Auctioned = e.target.value;
    fetch(
      `${process.env.BASE_URl}/api/admin/item?currentPage=${pageNumber}&search=${search}&Auctioned=${Auctioned}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ currentPage }),
      }
    )
      .then(async (res) => {
        let { items, totalRecord } = await res.json();
        setpostsPaginated(items);
        setTotal(totalRecord);
        setfilterArray(items);
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

  // useEffect(() => {
  // 	// fetch(`${process.env.BASE_URl}/api/admin/item`, {
  // 	// 	method: "POST",
  // 	// 	headers: { "Content-Type": "application/json" },
  // 	// 	body: JSON.stringify({ currentPage }),
  // 	// })
  // 	// 	.then(async (res) => {
  // 	// 		let { items, totalRecord } = await res.json();
  // 	// 		setpostsPaginated(items);
  // 	// 		setfilterArray(items);
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
            <div class="app-content">
              <div class="container-fluid">
                <div class="row g-3 mb-4 align-items-center justify-content-between">
                  <div class="col-auto">
                    <h1 class="app-page-title mb-0">Items</h1>

                    <button>
                      <a href="../../item/new" alt="Add items">
                        add Item{" "}
                      </a>
                    </button>
                  </div>

                  <div className="col-auto d-flex flex-wrap align-items-center search-box col-md-6 justify-content-between">
                    <div className="col-md-5">
                      <select
                        class="form-select"
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

                    <form class="table-search-form  col-md-6 d-flex flex-wrap gx-1 align-items-center justify-content-between">
                      <div class="col-md-8">
                        <input
                          type="text"
                          id="search-orders"
                          name="searchorders"
                          class="form-control search-orders"
                          placeholder="Search"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div class="col-auto">
                        <button
                          type="button "
                          class="btn app-btn-secondary"
                          onClick={(e) => paginate(e, 1)}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <nav id="orders-table-tab" class="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
				    <a class="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</a>
				    <a class="flex-sm-fill text-sm-center nav-link"  id="orders-paid-tab" data-bs-toggle="tab" href="#orders-paid" role="tab" aria-controls="orders-paid" aria-selected="false">Paid</a>
				    <a class="flex-sm-fill text-sm-center nav-link" id="orders-pending-tab" data-bs-toggle="tab" href="#orders-pending" role="tab" aria-controls="orders-pending" aria-selected="false">Pending</a>
				    <a class="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab" href="#orders-cancelled" role="tab" aria-controls="orders-cancelled" aria-selected="false">Cancelled</a>
				</nav> */}

                <div class="app-card app-card-orders-table mb-5">
                  <div class="app-card-body">
                    <div class="table-responsive">
                      <table class="table mb-0 text-left">
                        <thead>
                          <tr>
                            <th class="cell">OwnerId</th>
                            <th class="cell">Name</th>
                            <th class="cell">Discription</th>
                            <th class="cell">Category</th>
                            <th class="cell">Price</th>
                            <th class="cell">NFTId</th>
                            <th class="cell">Status</th>
                            <th class="cell">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {postsPaginated &&
                            !!postsPaginated.length &&
                            postsPaginated.map((data, i) => (
                              <tr key={i}>
                                <td class="cell">
                                  <a
                                    href={`${process.env.BASE_URl}/item/${data._id}`}
                                    target="_blank"
                                  >
                                    {data.CreatorId}
                                  </a>
                                </td>
                                <td class="cell">{data.name}</td>
                                <td class="cell">
                                  <span class="truncate">
                                    {data.Description}
                                  </span>
                                </td>
                                <td class="cell">
                                  <span class="truncate">{data.Category}</span>
                                </td>
                                <td class="cell">{data.Price}</td>
                                <td class="cell">
                                  <span>{data.NFTId ? data.NFTId : "-"}</span>
                                </td>
                                <td class="cell">
                                  <span class="badge bg-success">
                                    {data.Status ? "Active" : "Deactive"}
                                  </span>
                                </td>
                                {/* <td class="cell">$259.35</td> */}
                                <td class="cell">
                                  <span class="btn-sm app-btn-secondary">
                                    <Link
                                      href={{
                                        pathname: "/item/[id]",
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
                                  <span class="btn-sm app-btn-secondary">
                                    <Link href={"/item/edit/" + data._id}>
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
  const url = `${process.env.BASE_URl}/api/admin/item`;
  const currentPage = 1;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPage }),
  });
  const { items, totalRecord } = await res.json();
  return {
    props: { posts: items, totalRecord },
  };
}
