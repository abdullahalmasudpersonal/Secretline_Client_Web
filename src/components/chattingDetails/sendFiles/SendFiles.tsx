import { faAddressBook, faCamera, faFile, faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuItem, } from "@mui/material";
import { useState } from "react";

type SendFilesProps = {
    onFileSelect: (file: File) => void;
};

const SendFiles = ({ onFileSelect }: SendFilesProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [file, setFile] = useState<File | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    /////////////////// images upload /////////////
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            if (file) {
                onFileSelect(file);
            }
        }
        setAnchorEl(null);
    };

    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            padding: "10px",
                            borderRadius: "5px", // বর্ডার রেডিয়াস সরানো
                            mt: -3,
                            backgroundColor: "rgb(69, 68, 76)",
                            color: "white"
                        }
                    }
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    sx: {
                        padding: 0, // মেনুর আইটেমগুলোর আশেপাশের প্যাডিং সরানো
                    }
                }}
                anchorOrigin={{
                    vertical: 'top', // মেনুর শুরু হবে anchorEl এর **উপরে**
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom', // মেনুর শেষ হবে anchorEl এর **নিচে**
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={handleClose}><FontAwesomeIcon icon={faFile} /> &nbsp;Document</MenuItem>
                <MenuItem component="label">
                    <input
                        accept="image/*,video/*"
                        style={{ display: "none" }}
                        id="upload-input"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                    <FontAwesomeIcon icon={faImage} /> &nbsp; Photo & Video
                </MenuItem>

                <MenuItem onClick={handleClose}><FontAwesomeIcon icon={faCamera} /> &nbsp;Camera</MenuItem>
                <MenuItem onClick={handleClose}><FontAwesomeIcon icon={faAddressBook} /> &nbsp;Contact</MenuItem>
            </Menu>


            <Button onClick={handleClick} style={{ width: "20px" }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}>
                <FontAwesomeIcon
                    className="chatting-details-add-item-icon"
                    icon={faPlus}
                />
            </Button>
        </>
    );
};

export default SendFiles;