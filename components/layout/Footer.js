export function Footer() {
  return (
    <>
      <section className="py-5">
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 mb-4">
              <a className="d-inline-block mb-4" href="#">
                <img
                  className="img-fluid"
                  src="bootstrap5-plain-assets/logos/plainb-logo.svg"
                  alt=""
                  width="96px"
                ></img>
              </a>
              <p className="d-none d-lg-block">
                All rights reserved © NIFTY-SCOTT 2021
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex">
                <a className="ms-lg-auto d-inline-block me-4" href="#">
                  <img
                    src="bootstrap5-plain-assets/socials/facebook.svg"
                    alt=""
                  ></img>
                </a>
                <a className="d-inline-block me-4" href="#">
                  <img
                    src="bootstrap5-plain-assets/socials/twitter.svg"
                    alt=""
                  ></img>
                </a>
                <a className="d-inline-block me-4" href="#">
                  <img
                    src="bootstrap5-plain-assets/socials/github.svg"
                    alt=""
                  ></img>
                </a>
                <a className="d-inline-block me-4" href="#">
                  <img
                    src="bootstrap5-plain-assets/socials/instagram.svg"
                    alt=""
                  ></img>
                </a>
                <a className="d-inline-block" href="#">
                  <img
                    src="bootstrap5-plain-assets/socials/linkedin.svg"
                    alt=""
                  ></img>
                </a>
              </div>
            </div>
            <p className="mt-4 d-lg-none">
              All rights reserved © Wireframes Corporation 2021
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
