import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuItem, } from "@mui/material";
import { useState } from "react";


const SendFiles = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
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