import { useFormikContext } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.scss";

export const DropZone = ({
  fieldName,
  acceptedTypes,
  dropZoneClassname,
  filesClassname,
  elemOnActive,
  elemOnPassive,
  filesBlockClassname,
  filesInputClassname,
  startingFiles = [],
}) => {
  const formikProps = useFormikContext();
  const [files, setFiles] = useState(startingFiles);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newPhotos = [...formikProps.values[fieldName], ...acceptedFiles];
      formikProps.setFieldValue(fieldName, newPhotos);

      setFiles([...files, ...acceptedFiles]);
    },
    [formikProps, fieldName]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedTypes,
    onDrop,
  });

  return (
    <div className={dropZoneClassname} {...getRootProps()}>
      <div className={filesInputClassname}>
        <input name={fieldName} {...getInputProps()} />
        {isDragActive ? elemOnActive : elemOnPassive}
      </div>

      <div className={filesBlockClassname}>
        {files.map((file) => (
          <img
            key={file.size + file.path}
            className={filesClassname}
            alt="uploaded files"
            src={file.exactPath ? file.exactPath : URL.createObjectURL(file)}
          />
        ))}
      </div>
    </div>
  );
};
