import React, { FunctionComponent } from "react";
import { Search } from "../Search/Search";
import "./header.scss";
import logo from "../../images/Stock-icon.png";

const Header: FunctionComponent = () => {
  return (
    <div className="header">
      <div className="container row align-items-center">
        <div className="col-md-8">
          <img src={logo} className="logo" alt="Stock Icon" />{" "}
          <h2>Stock Updates</h2>
        </div>
        <div className="col-md-4 translate-middle">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
