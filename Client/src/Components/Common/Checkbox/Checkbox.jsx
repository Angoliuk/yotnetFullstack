import { useField } from "formik";
import React from "react";
import "./Checkbox.scss";

export const Checkbox = ({ label, classNameBlock, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={classNameBlock}>
      <input type="checkbox" {...field} {...props} />
      <label>{label}</label>
      {meta.error && meta.touched && <p>{meta.error}</p>}
    </div>
  );
};
