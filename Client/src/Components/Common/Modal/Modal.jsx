import React from "react";
import "./Modal.scss";

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
