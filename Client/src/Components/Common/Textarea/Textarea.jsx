import React from "react";
import "./Textarea.css";

export const Textarea = ({
  name = "textarea",
  value = "",
  onChange = () => {},
  rows = 1,
  cols = 1,
  className = "textarea",
  placeholder = "",
}) => (
  <textarea
    className={className}
    placeholder={placeholder}
    name={name}
    id={name}
    value={value}
    onChange={onChange}
    rows={rows}
    cols={cols}
  />
);
