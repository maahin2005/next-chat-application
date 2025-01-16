"use client";
import { useEdgeStore } from "@/lib/edgestore";
import React from "react";
import { SingleImageDropzone } from "../SingleImageDropZone";

export default function ImageUpload({ getImgURL }: any) {
  const [file, setFile] = React.useState<File>();
  const [urls, setUrls] = React.useState<string>();
  const [progressBar, setProgressBar] = React.useState<number>(0);
  const { edgestore } = useEdgeStore();

  const handleUploadButtonClick = async () => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        input: { type: "post" },
        onProgressChange: (progress) => {
          setProgressBar(progress);
        },
      });
      setUrls(res.url);
      getImgURL(res.url);
    } else {
      alert("Please select a Image");
    }
  };

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1, // 1 MB
        }}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <div className="h-[6px] w-44 border rounded overflow-hidden">
        <div
          className="h-full bg-gradient-to-r text-lg from-blue-500 to-purple-500 transition-all duration-150"
          style={{
            width: `${progressBar}%`,
          }}
        />
      </div>
      <button
        className={`${
          urls ? "text-green-500" : "text-black"
        } bg-white px-3 py-2 rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all`}
        onClick={handleUploadButtonClick}
        disabled={urls ? true : false}
      >
        {urls ? "Uploaded Successfully" : "Upload"}
      </button>
    </div>
  );
}
