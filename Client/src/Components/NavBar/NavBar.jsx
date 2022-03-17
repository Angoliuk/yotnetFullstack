import React from "react";
import "./NavBar.css";
import NavBarDesktop from "./NavBarDesktop/NavBarDesktop";
import NavBarMobile from "./NavBarMobile/NavBarMobile";

const NavBar = (props) => {
  const { showAlertHandler } = props;
  return window.innerWidth > 768 ? (
    <NavBarDesktop showAlertHandler={showAlertHandler} />
  ) : (
    <NavBarMobile showAlertHandler={showAlertHandler} />
  );
};

export default NavBar;
