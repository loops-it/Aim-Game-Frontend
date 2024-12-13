/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentIcon } from "@heroicons/react/24/solid";

export default function MainImageInput({ type, onChange, value }) {
  const [image, setImage] = useState(null);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file) return;

      // Validate file type
      const validFormats = ["image/png", "image/jpeg", "image/jpg"];
      if (!validFormats.includes(file.type)) {
        alert("Invalid file format. Only PNG, JPG, and JPEG are allowed.");
        return;
      }

      // Optional: Check image dimensions if needed
      const imageValidation = new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width >= 300 && img.height >= 300) {
            resolve(true);
          } else {
            reject(
              new Error("Image dimensions must be at least 300x300 pixels.")
            );
          }
        };
        img.onerror = () => reject(new Error("Invalid image file."));
      });

      try {
        await imageValidation;
        setImage(file);
        onChange(file);
      } catch (error) {
        alert(error.message); // Notify the user about the validation error
      }
    },
    [onChange]
  );

  useEffect(() => {
    setImage(value);
  }, [value]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept:
        type == "taskView"
          ? {
              "pdf/*": [],
              "image/*": [],
            }
          : {
              "image/*": [],
            },
      maxSize: 5242880,
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <ul className="text-red-500">
        {errors.map((e) => {
          console.log(e.code);
          let message = e.message;
          if (e.code == "file-too-large") {
            message = "File is larger than 5MB";
          }
          if (e.code == "file-invalid-type") {
            message = "File must be an image";
          }
          return <li key={e.code}>{message}</li>;
        })}
      </ul>
    );
  });

  if (type == "taskView") {
    return (
      <div className="flex flex-col gap-5 text-xs ">
        <div
          className="flex flex-col justify-center items-center gap-4 text-sm text-[#5A618159] bg-[#F8F8F8] h-[18rem]"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <DocumentIcon className={"w-16 h-16 "} />
          <div>No Attachments</div>
        </div>
        <div className="text-center">{fileRejectionItems}</div>
      </div>
    );
  }

  if (type == "client") {
    return (
      <div className="flex flex-col gap-5 text-xs">
        <div
          className="flex gap-4 items-center text-sm text-app-blue"
          {...getRootProps()}
        >
          <input {...getInputProps()} type="file" />
          <div>Profile Picture</div>
          <Avatar
            src={
              image && typeof image == "object"
                ? URL.createObjectURL(image)
                : image
            }
            sx={{ height: "70px", width: "70px" }}
          />
          <div className="flex flex-col gap-1">
            <div>Upload your profile picture</div>
            <div className="text-xs text-app-gray-3">
              Photo should be at least 300px x 300px <br></br>Photos should be
              in PNG, JPG, or JPEG format
            </div>
            <button
              onClick={() => []}
              className="disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-5 py-1 text-white"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="text-center">{fileRejectionItems}</div>
      </div>
    );
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
}
