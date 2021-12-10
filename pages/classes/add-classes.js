/*eslint-disable*/

import { useCurrentUser } from "@/hooks/index";
import {
  faChevronCircleLeft,
  faChevronLeft,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { router } from "next/router";
import { DashboardComponent } from "../../components/dashboard-component/DashboardComponent";
import { Navbar } from "../../components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Addcar() {
  return (
    <>
      <Navbar
      ClassesActive="active"
       />
      <div className="app-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 class="app-page-title mb-5 main-title d-flex align-items-center justify-content-between">
                <span className="d-flex align-items-center">
                  {" "}
                  <Link href="/classes">
                    <a className="back-btn me-4">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                  </Link>
                  Add Classes{" "}
                </span>
              </h1>

              <div class="app-card  h-100">
                <div class="app-card-body p-4 p-lg-5 ">
                  <div className="row">
                    <div className="col-md-12 col-12 mint-nft-form">
                      <form>
                        <div className="mint-nft-form w-50">
                          <div className="form-group mb-5">
                            <label className="d-block mb-3">Name</label>
                            <input className="form-control" type="text" />
                          </div>

                          <div className="form-group type-btn mb-5">
                            <label className="d-block mb-4">Type</label>
                            <button type="button" className="btn me-3">
                              Sale
                            </button>
                            <button type="button" className="btn">
                              Sale
                            </button>
                          </div>

                          <div className="form-group add-attr-col mb-5">
                            <label className="d-block mb-4">
                              Add Attributes{" "}
                              <small>(You can add upto 10 attribute)</small>
                            </label>

                            <div className="d-flex align-items-center mb-4">
                              <label className="me-4">01</label>

                              <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Enter Attribute Name"
                              />

                              <div className="form-check ms-3 me-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="flexCheckDefault3"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault3"
                                >
                                  Mutable
                                </label>
                              </div>

                              <input
                                type="text"
                                className="form-control ms-2"
                                placeholder="Enter Attribute Type"
                              />
                            </div>

                            <div className="d-flex align-items-center mb-4">
                              <label className="me-4">02</label>

                              <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Enter Attribute Name"
                              />
                              <div className="form-check ms-3 me-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="flexCheckDefault2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault2"
                                >
                                  Mutable
                                </label>
                              </div>

                              <input
                                type="text"
                                className="form-control ms-2"
                                placeholder="Enter Attribute Type"
                              />
                            </div>

                            <div className="d-flex align-items-center mb-4">
                              <label className="me-4">03</label>

                              <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Enter Attribute Name"
                              />
                              <div className="form-check ms-3 me-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  Mutable
                                </label>
                              </div>

                              <input
                                type="text"
                                className="form-control ms-2"
                                placeholder="Enter Attribute Type"
                              />
                            </div>

                            <div className="form-group type-btn mt-5">
                              <button
                                type="button"
                                className="add-attr-btn btn me-3"
                              >
                                Add More Attribute
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
