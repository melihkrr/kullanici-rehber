import React from "react";
import { Link } from "react-router-dom";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const Navbar = () => {
  return (
    <nav className="navbar bg-primary navbar-expand-sm fixed-top position-relative">
      <div className="container-fluid d-flex justify-content-center">
        <Link
          to={"/"}
          className="navbar-brand mb-0 text-white d-flex align-items-center ms-2 fs-2"
        >
          <ContactPhoneIcon className="me-3 fs-1" />
          REHBERİM
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
