import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "../Components/Common/Loader/Loader";
import { Modal } from "../Components/Common/Modal/Modal";

const HomePage = lazy(() => import("./HomePage/HomePage"));
const LoginPage = lazy(() => import("./LoginPage/LoginPage"));
const ProfilePage = lazy(() => import("./ProfilePage/ProfilePage"));
const RegisterPage = lazy(() => import("./RegisterPage/RegisterPage"));
const EditPage = lazy(() => import("./EditPage/EditPage"));

const RoutesList = (props) => (
  <Router>
    <Suspense fallback={Modal(<Loader />)}>
      {props.isAuth ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route path="/profile/:id" element={<ProfilePage />} />

          <Route path="/edit/:uploadType/:id" element={<EditPage />} />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      )}
    </Suspense>
  </Router>
);

const mapStateToProps = (state) => ({
  isAuth: !!state.userReducers.accessToken,
});

export default connect(mapStateToProps)(RoutesList);
