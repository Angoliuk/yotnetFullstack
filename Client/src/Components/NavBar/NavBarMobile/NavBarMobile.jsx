import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./NavBarMobile.scss";
import AnnouncementsBlock from "../../UploadBlocks/AnnouncementsBlock/AnnouncementsBlock";
import { useUserService } from "../../../Service/Requests/useUserService";
const NavBarMobile = (props) => {
  const { isAuth, id, showAlertHandler } = props;
  const [showMenu, setShowMenu] = useState(false);
  const userService = useUserService();
  const handleShowMenu = () => setShowMenu(!showMenu);

  const logout = async () => {
    try {
      await userService.logout();
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e.message}`,
        type: "error",
      });
    } finally {
      handleShowMenu();
    }
  };

  return isAuth ? (
    <>
      <nav className="loggedNavBarMobile">
        <AnnouncementsBlock text={true} showAlertHandler={showAlertHandler} />
        <p onClick={handleShowMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0 0 50 50"
          >
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </p>
      </nav>
      {showMenu && (
        <div className="menuModalNavBarMobile">
          <NavLink to="/home">Home</NavLink>
          <hr className="hrMenuNavBarMobile" />
          <NavLink to={`/profile/${id}`}>Profile</NavLink>
          <hr className="hrMenuNavBarMobile" />
          <p onClick={logout}>Logout</p>
          <hr className="hrMenuNavBarMobile" />
          <p onClick={handleShowMenu}>Back</p>
          <hr className="hrMenuNavBarMobile" />
        </div>
      )}
    </>
  ) : (
    <>
      <nav className="notLoggedNavBarMobile">
        <AnnouncementsBlock text={true} showAlertHandler={showAlertHandler} />
        <p onClick={handleShowMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0 0 50 50"
          >
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </p>
      </nav>
      {showMenu && (
        <div className="menuModalNavBarMobile">
          <NavLink to="/home">Home</NavLink>
          <hr className="hrMenuNavBarMobile" />
          <NavLink to="/login">Login</NavLink>
          <hr className="hrMenuNavBarMobile" />
          <NavLink to="/register">Register</NavLink>
          <hr className="hrMenuNavBarMobile" />
          <p onClick={handleShowMenu}>Back</p>
          <hr className="hrMenuNavBarMobile" />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: !!state.userReducers.accessToken,
  id: state.userReducers.id,
});

export default connect(mapStateToProps)(NavBarMobile);
