import React from "react";
import "./Input.scss";
import { useField } from "formik";

export const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <p className="errorFieldInput">{meta.error}</p>
      )}
    </div>
  );
};
