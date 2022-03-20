import { useField } from "formik";
import React from "react";
import "./Textarea.scss";

export const Textarea = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <textarea {...props} {...field} />
      {meta.touched && meta.error && (
        <p className="errorFieldTextarea">{meta.error}</p>
      )}
    </>
  );
};
