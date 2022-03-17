import React, { useState } from "react";
import { Alert } from "../../Components/Common/Alert/Alert";
import NavBar from "../../Components/NavBar/NavBar";
import "./PagesWrapper.scss";

export const PagesWrapper = (Component) => {
  const WrappingWithAlert = (props) => {
    const [showAlert, setShowAlert] = useState({
      show: false,
      text: "everything is okay",
      type: "success",
    });

    return (
      <div>
        {showAlert.show && (
          <Alert
            onClick={() => {
              setShowAlert({ ...showAlert, show: false });
            }}
            type={showAlert.type}
            text={showAlert.text}
          />
        )}

        <NavBar
          showAlertHandler={(alert) => {
            setShowAlert(alert);
          }}
        />

        <div className="mainWrapper">
          <Component
            showAlertHandler={(alert) => {
              setShowAlert(alert);
            }}
            {...props}
          />
        </div>
      </div>
    );
  };

  return (props) => WrappingWithAlert(props);
};
