import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Img2 from "../../assets/img2.png";
import Slogan from "../../assets/slogan.png";
// import Nav from './Nav';

const HeaderOne = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="header-style-1">
        <div className="header-topbar topbar-style-2">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-xl-8 col-lg-6 col-md-12">
                <div className="header-contact text-center text-lg-start d-none d-sm-block">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <span className="text-color me-2">
                        <i className="fa fa-phone-alt"></i>
                      </span>
                      <a href="tel:+(354) 6800 37849"> +(354) 6800 37849</a>
                    </li>

                    <li className="list-inline-item">
                      <span className="text-color me-2">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <a href="malito:hello@edumel.com"> hello@edumel.com</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="d-sm-flex justify-content-center justify-content-lg-end">
                  <div className="header-socials text-center text-lg-end">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link to="#">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="#">
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="#">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="#">
                          <i className="fab fa-pinterest"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="#">
                          <i className="fab fa-youtube"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="header-btn text-center text-lg-end">
                    <a href="/login">
                      {" "}
                      <i className="fa fa-user-alt"></i> Login/Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`header-navbar navbar-sticky ${
            windowWidth <= 991 ? "mobile-menu" : ""
          }`}
        >
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <div className="site-logo">
                <div className="flex justify-center items-center my-5 static">
                  <img src={Img2} alt="" />
                  <img src={Slogan} alt="" />
                </div>
              </div>

              <div className="offcanvas-icon d-block d-lg-none">
                <a href="#" onClick={openMenu} className="nav-toggler">
                  <i className="fal fa-bars"></i>
                </a>
              </div>

              <div className="header-category-menu d-none d-xl-block">
                <ul>
                  <li className="has-submenu">
                    <Link to="#">
                      <i className="fa fa-th me-2"></i>Categories
                    </Link>

                    <ul className="submenu">
                      <li>
                        <Link to="#">Design</Link>
                        <ul className="submenu">
                          <li>
                            <Link to="#">Design Tools</Link>
                          </li>
                          <li>
                            <Link to="#">Photoshop mastering</Link>
                          </li>
                          <li>
                            <Link to="#">Adobe Xd Deisgn</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="#">Developemnt</Link>
                      </li>
                      <li>
                        <Link to="#">Marketing</Link>
                      </li>
                      <li>
                        <Link to="#">Freelancing</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="header-search-bar d-none d-xl-block ms-4">
                <form action="#">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Course"
                  />
                  <Link to="#" className="search-submit">
                    <i className="far fa-search"></i>
                  </Link>
                </form>
              </div>

              <nav
                className={`site-navbar ms-auto ${isMenuOpen ? "menu-on" : ""}`}
              >
                {/* <Nav /> */}

                {isMenuOpen && (
                  <a href="#" onClick={closeMenu} className="nav-close">
                    <i className="fal fa-times"></i>
                  </a>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderOne;
