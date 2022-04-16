import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../ReduxStorage/actions/userActions";
import "./NavBarDesktop.scss";
import AnnouncementsBlock from "../../UploadBlocks/AnnouncementsBlock/AnnouncementsBlock";
const NavBarDesktop = (props) => {
  const { isAuth, id, logout, avatar, showAlertHandler } = props;
  return isAuth ? (
    <nav className="loggedNavBar">
      <NavLink className="navElem" to="/home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="46px"
          height="46px"
          viewBox="0 0 32 32"
        >
          <path d="M 16 2.5859375 L 2.2929688 16.292969 L 3.7070312 17.707031 L 5 16.414062 L 5 28 L 27 28 L 27 16.414062 L 28.292969 17.707031 L 29.707031 16.292969 L 16 2.5859375 z M 16 5.4140625 L 25 14.414062 L 25 26 L 7 26 L 7 14.414062 L 16 5.4140625 z M 11 16 L 11 18 L 21 18 L 21 16 L 11 16 z M 11 20 L 11 22 L 21 22 L 21 20 L 11 20 z"></path>
        </svg>
      </NavLink>

      <AnnouncementsBlock text={true} showAlertHandler={showAlertHandler} />

      <NavLink to={`/profile/${id}`}>
        <img
          className="profilePicNavBar"
          alt="profile pic"
          src={avatar ? avatar : "https://picsum.photos/60"}
        />
      </NavLink>

      <p
        className="navElem navElemLogout"
        onClick={() => {
          logout();
        }}
      >
        <svg
          width="36px"
          height="36px"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 1L8 1V2L2 2L2 13H8V14H1L1 1ZM10.8536 4.14645L14.1932 7.48614L10.8674 11.0891L10.1326 10.4109L12.358 8L4 8V7L12.2929 7L10.1464 4.85355L10.8536 4.14645Z"
            fill="black"
          />
        </svg>
      </p>
    </nav>
  ) : (
    <nav className="notLoggedNavBar">
      <NavLink to="/home">Home</NavLink>
      <AnnouncementsBlock text={false} showAlertHandler={showAlertHandler} />
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuth: !!state.userReducers.accessToken,
  id: state.userReducers.id,
  avatar: state.userReducers.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarDesktop);
