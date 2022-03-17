import React from "react";
import "./Modal.css";

export const Modal = (
  Component,
  onClick = () => {},
  classNameBackground = "modalBackground",
  className = "modal"
) => (
  <div className={className}>
    {Component}
    <div onClick={onClick} className={classNameBackground}></div>
  </div>
);
