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

export default function AddProduct() {
  return (
    <>
      <Navbar 
      ProductsActive="active"
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
                  Add Product{" "}
                </span>
              </h1>

              <div class="app-card  h-100">
                <div class="app-card-body p-4 p-lg-5 ">
                  <div className="row">
                    <div className="col-md-12 col-12 product-col-form">
                      <form>
                        <div className="product-form w-50">
                          <div className="form-group mb-4">
                          <label className="d-block mb-3">Select Class</label>
                            <select
                              className="form-select form-control pt-2"
                              aria-label="Default select example"
                            >
                              <option selected disabled></option>
                              <option value={1}>Car</option>
                              <option value={2}>Shirt</option>
                              <option value={3}>Shoes</option>
                            </select>
                          </div>

                          <div className="form-group mb-4">
                            <label className="d-block mb-3">Name</label>
                            <input className="form-control" type="text" />
                          </div>

                          <div className="form-group mb-4">
                            <label className="d-block mb-3">Desc</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" style={{minHeight: "150px !important",borderRadius: "20px"}}></textarea>
                          </div>
                          <div className="form-group mb-5">
                            <label className="d-block mb-3">Price</label>
                            <input className="form-control" type="number" />
                          </div>

                          <div className="form-group mb-5">
                          <div className="form-check me-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="flexCheckDefault4"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault4"
                                >
                                  List on Shoes
                                </label>
                              </div>
                              </div>

                          <div className="form-group add-attr-col mb-5">
                            <label className="d-block mb-4">
                              Attributes{" "}
                           
                            </label>

                            <div className="form-group mb-4">
                              <label className="d-block mb-3">Color</label>

                              <input
                                type="text"
                                className="form-control me-2"
                                placeholder=""
                              />

                    
                            </div>

                            <div className="form-group mb-4">
                              <label className="d-block mb-3">Size</label>

                              <input
                                type="text"
                                className="form-control me-2"
                                placeholder=""
                              />

                    
                            </div>

                           


                            <div className="form-group type-btn mt-5">
                              <button
                                type="button"
                                className="add-attr-btn btn ms-auto d-block"
                              >
                                Save
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
