"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import dynamic from "next/dynamic";

const FilePreview = dynamic(() => import("reactjs-file-preview"), {
  ssr: false,
});

export default function ShowFiles({
  file,
  open,
  setOpen,
}: {
  file: { name: string; url: string };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const lowerName = file.name.toLowerCase();

  const audioExtensions = [".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac"];
  const isAudio = audioExtensions.some((ext) => lowerName.endsWith(ext));

  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
  const isVideo = videoExtensions.some((ext) => lowerName.endsWith(ext));

  const documentExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
  ];
  const isDocument = documentExtensions.some((ext) => lowerName.endsWith(ext));

  const fileUrl =
    typeof window !== "undefined"
      ? window.location.origin + file.url
      : file.url;

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-10">
          <div className="bg-white p-4 rounded space-y-2 w-11/12 md:w-3/4 lg:w-1/2 h-3/4 relative my-10">
            <IoIosCloseCircleOutline
              onClick={() => setOpen(false)}
              className="absolute top-2 right-1 text-red-500 cursor-pointer"
            />

            {isDocument && (
              <iframe
                src={fileUrl}
                className="w-full h-full border rounded mt-3"
                title={file.name}
              />
            )}

            {isAudio && (
              <audio
                controls
                className="w-full h-12 my-4 "
                style={{ marginTop: "50px !important" }}
              >
                <source src={fileUrl} />
                Your browser does not support the audio element.
              </audio>
            )}

            {isVideo && (
              <video controls className="w-full h-full rounded">
                <source src={fileUrl} />
                Your browser does not support the video element.
              </video>
            )}

            {!isDocument && !isAudio && !isVideo && (
              <FilePreview
                preview={fileUrl}
                placeHolderImage="https://via.placeholder.com/150"
                errorImage="https://via.placeholder.com/150/FF0000/FFFFFF?text=Error"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import { Dispatch, SetStateAction } from "react";
// // import FilePreview from "reactjs-file-preview";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import dynamic from "next/dynamic";

// const FilePreview = dynamic(() => import("reactjs-file-preview"), {
//   ssr: false,
// });

// export default function ShowFiles({
//   file,
//   open,
//   setOpen,
// }: {
//   file: { name: string; url: string };
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   // audio types
//   const audioExtensions = [".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac"];
//   const isAudio = audioExtensions.some((ext) =>
//     file.name.toLowerCase().endsWith(ext)
//   );
//   // document types
//   const documentExtensions = [
//     ".pdf",
//     ".doc",
//     ".docx",
//     ".xls",
//     ".xlsx",
//     ".ppt",
//     ".pptx",
//     ".txt",
//   ];
//   const isDocument = documentExtensions.some((ext) =>
//     file.name.toLowerCase().endsWith(ext)
//   );
//   return (
//     <>
//       {open && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-10">
//           <div className="bg-white p-4 rounded space-y-2 w-1/2 h-3/4 relative">
//             <IoIosCloseCircleOutline
//               onClick={() => setOpen(false)}
//               className="absolute top-0 right-1 text-red-500 cursor-pointer"
//               size={25}
//             />
//             {/* Document */}
//             {isDocument && (
//               <iframe
//                 src={window.location.origin + file.url}
//                 className="w-full h-full border rounded"
//                 title={file.name}
//               />
//             )}
//             {isAudio ? (
//               <audio controls className="w-full">
//                 <source src={window.location.origin + file.url} />
//                 Your browser does not support the audio element.
//               </audio>
//             ) : (
//               <FilePreview
//                 preview={window.location.origin + file.url}
//                 placeHolderImage="https://example.com/placeholder.png"
//                 errorImage="https://example.com/error.png"
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
