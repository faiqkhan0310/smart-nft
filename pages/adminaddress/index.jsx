import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import router from "next/router";
import { Navbar } from "../../components/layout/Navbar";

export default function AdminAddress({ posts }) {
  const [user, { mutate }] = useCurrentUser();

  useEffect(() => {
    if (user === null) router.replace("/login");
  }, [user]);

  // delete address
  const deleteAddress = async (id) => {
    const body = id;
    const res = await fetch(`${process.env.BASE_URl}/api/admin/adminaddress`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });

    if (res.status === 200) {
      window.location.reload();
    }
  };
  return (
    <>
      {user != null && (
        <>
          <Navbar
          AddressesActive="active"
           />

          <div>
            <div class="app-content">
              <div class="container-fluid">
                <div class="row g-3 mb-4 align-items-center justify-content-between">
                  
                <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto w-100">
            <h1 class="app-page-title main-title d-flex align-items-center justify-content-between">
               Products{" "}
                <Link href="/adminaddress/creation">
                <a className="btn">
                 Add Product
                </a>
                </Link>
              </h1>
            </div>

          </div>
                </div>

                {/* <nav id="orders-table-tab" class="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
				<a class="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</a>
				<a class="flex-sm-fill text-sm-center nav-link"  id="orders-paid-tab" data-bs-toggle="tab" href="#orders-paid" role="tab" aria-controls="orders-paid" aria-selected="false">Paid</a>
				<a class="flex-sm-fill text-sm-center nav-link" id="orders-pending-tab" data-bs-toggle="tab" href="#orders-pending" role="tab" aria-controls="orders-pending" aria-selected="false">Pending</a>
				<a class="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab" href="#orders-cancelled" role="tab" aria-controls="orders-cancelled" aria-selected="false">Cancelled</a>
			</nav> */}

                <div class="app-card app-card-orders-table p-4 mb-5">
                  <div class="app-card-body">
                    <div class="table-responsive">
                      <table class="table mb-0 text-left">
                        <thead>
                          <tr>
                            <th class="cell">ID</th>
                            <th class="cell">Public Address</th>
                            <th class="cell">Action</th>
                            {/* <th class="cell"></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {posts &&
                            !!posts.length &&
                            posts.map((data, i) => (
                              <tr>
                                <td class="cell">{data._id}</td>
                                <td class="cell">
                                  <span class="truncate">
                                    {data.PublicAddress}
                                  </span>
                                </td>
                                {/* <td class="cell">$259.35</td> */}
                                <td class="cell">
                                  <a
                                    class="btn-sm app-btn-secondary"
                                    href=""
                                    onClick={() => {
                                      deleteAddress(data._id);
                                    }}
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.BASE_URl}/api/admin/adminaddress`;
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: { posts },
  };
}
