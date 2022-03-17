import React from "react";
import "./Input.scss";

export const Input = ({
  name = "input",
  value = "",
  onChange = () => {},
  htmlForText = "",
  type = "text",
  className = "input",
  placeholder = "",
}) => (
  <div>
    <label htmlFor={name}>{htmlForText}</label>
    <input
      className={className}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  </div>
);
