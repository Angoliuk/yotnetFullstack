import React from "react";
import "./Button.scss";

export const Button = ({
  name = "button",
  text = "button",
  onClick = () => {},
  type,
  className = "button",
  classNameBlock = "",
}) => (
  <div className={classNameBlock}>
    <button
      name={name}
      id={name}
      type={type}
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  </div>
);
