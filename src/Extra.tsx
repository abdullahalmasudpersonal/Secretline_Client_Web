// import { Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { useDropzone } from "react-dropzone";
// import { useState } from "react";

// interface UploadFile {
//     uid: string;
//     name: string;
//     file: File;
//     preview: string;
// }

// const MAX_FILES = 10;

// const Extra = () => {
//     const [fileList, setFileList] = useState<UploadFile[]>([]);
//     const [previewOpen, setPreviewOpen] = useState(false);
//     const [previewImage, setPreviewImage] = useState("");
//     const [previewTitle, setPreviewTitle] = useState("");

//     const handlePreview = (file: UploadFile) => {
//         setPreviewImage(file.preview);
//         setPreviewTitle(file.name);
//         setPreviewOpen(true);
//     };

//     const handleCancel = () => {
//         setPreviewOpen(false);
//     };

//     const onDrop = (acceptedFiles: File[]) => {
//         const newFiles = acceptedFiles.slice(0, MAX_FILES - fileList.length).map((file) => ({
//             uid: URL.createObjectURL(file),
//             name: file.name,
//             file,
//             preview: URL.createObjectURL(file),
//         }));
//         setFileList((prev) => [...prev, ...newFiles]);
//     };

//     const { getRootProps, getInputProps } = useDropzone({
//         accept: {
//             "image/*,video/*": []
//         },
//         onDrop,
//         multiple: true,
//     });

//     const uploadButton = (
//         <Box
//             sx={{
//                 border: "1px dashed #ccc",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: 120,
//                 height: 120,
//                 cursor: "pointer",
//             }}
//             {...getRootProps()}
//         >
//             <input {...getInputProps()} />
//             <span>Upload</span>
//         </Box>
//     );
//     return (
//         <div>
//             <Box>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//                     {fileList.map((file) => (
//                         <Box key={file.uid} sx={{ position: "relative" }}>
//                             <img
//                                 src={file.preview}
//                                 alt={file.name}
//                                 style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 4 }}
//                                 onClick={() => handlePreview(file)}
//                             />
//                         </Box>
//                     ))}
//                     {fileList.length < MAX_FILES && uploadButton}
//                 </Box>

//                 <Dialog open={previewOpen} onClose={handleCancel} maxWidth="md" fullWidth>
//                     <DialogTitle>
//                         {previewTitle}
//                         <IconButton
//                             aria-label="close"
//                             onClick={handleCancel}
//                             sx={{
//                                 position: "absolute",
//                                 right: 8,
//                                 top: 8,
//                             }}
//                         >
//                             <CloseIcon />
//                         </IconButton>
//                     </DialogTitle>
//                     <DialogContent dividers>
//                         <img src={previewImage} alt={previewTitle} style={{ width: "100%" }} />
//                     </DialogContent>
//                 </Dialog>
//             </Box>
//         </div>
//     );
// };

// export default Extra;
