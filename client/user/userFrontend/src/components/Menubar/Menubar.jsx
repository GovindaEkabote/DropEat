import React, { useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Menubar = () => {
    const [active, setActive] = useState("home");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <img
          src={assets.logo}
          alt="logo"
          className="mx-4"
          height={48}
          width={48}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link
          className={active === "home" ? "nav-link fw-bold active" : "nav-link"}
          aria-current="pFage"
          to="/"
          onClick={() => setActive("home")}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={active === "explore" ? "nav-link fw-bold " : "nav-link"}
          aria-current="page"
          to="/explore"
          onClick={() => setActive("explore")}
        >
          Explore
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={active === "contact-us" ? "nav-link fw-bold " : "nav-link"}
          aria-current="page"
          to="/contact"
          onClick={() => setActive("contact-us")}
        >
          Contact Us
        </Link>
      </li>
    </ul>
          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <img
                src={assets.cart}
                alt="logo"
                className="position-relative"
                height={32}
                width={32}
              />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                5
              </span>
            </div>
            <button className="btn btn-outline-primary">Login</button>
            <button className="btn btn-outline-success">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
