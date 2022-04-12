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
  deleteOnClick = false,
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

  const deleteImage = (file, field) => {
    console.log(
      file,
      formikProps.values[fieldName],
      formikProps.values["oldPhotos"]
    );
    const newPhotos = formikProps.values[field].filter(
      (fieldFile) => fieldFile.path !== file.path
    );
    console.log(newPhotos);
    formikProps.setFieldValue(field, newPhotos);
    setFiles(files.filter((fieldFile) => fieldFile.path !== file.path));
  };

  return (
    <>
      <div className={dropZoneClassname} {...getRootProps()}>
        <div className={filesInputClassname}>
          <input name={fieldName} {...getInputProps()} />
          {isDragActive ? elemOnActive : elemOnPassive}
        </div>
      </div>
      <div className={filesBlockClassname}>
        {files.map((file) => (
          <img
            key={file.size + file.path}
            className={filesClassname}
            alt="uploaded files"
            onClick={() =>
              deleteOnClick &&
              deleteImage(
                file,
                file.exactPath
                  ? `old${
                      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                    }`
                  : fieldName
              )
            }
            src={file.exactPath ? file.exactPath : URL.createObjectURL(file)}
          />
        ))}
      </div>
    </>
  );
};
