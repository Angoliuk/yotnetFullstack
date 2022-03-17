import React from "react";
import "./Alert.scss";

export const Alert = ({
  type = "success",
  text = "Все готово",
  onClick = () => {},
}) => (
  <div onClick={() => onClick()} className="alertBlock">
    <div className="background"></div>

    <div className={`alert ${type}`}>
      <span className="closeAlert">&times;</span>
      {text}
    </div>
  </div>
);
