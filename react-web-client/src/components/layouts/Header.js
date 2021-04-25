import React from "react";

import { Link, withRouter } from "react-router-dom";
const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/">
        <img
          src="/assets/images/gc_logo-270.png"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Link>
    </nav>
  );
};

export default Header;
