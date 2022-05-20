import React, { useMemo, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Context from "../../App.context";

import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle
} from "./DropZone.style";

const DropZone = () => {
  const { setRawXML } = useContext(Context);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/xml": [],
      "text/xml": []
    }
  });

  useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const [file] = acceptedFiles;
      getXMLFileContent(file);
    }
  }, [acceptedFiles]);

  const getXMLFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setRawXML(e.currentTarget.result);
    };

    reader.onerror = function () {
      console.error("reading failed");
    };

    reader.readAsText(file);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div>
        {(acceptedFiles && acceptedFiles.length > 0 && (
          <p className={"uploaded-message"}>
            Showing <b>{acceptedFiles[0].name}</b> as tree diagram
          </p>
        )) ||
          (fileRejections &&
            fileRejections.length > 0 &&
            fileRejections.map(({ file, errors }) => (
              <ul key={file.path} className={"error-list"}>
                {errors.map((e) => (
                  <li key={e.code}>{e.message}</li>
                ))}
              </ul>
            )))}
      </div>
    </section>
  );
};

export default DropZone;
