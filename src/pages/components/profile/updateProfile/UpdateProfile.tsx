import { Button } from '@mui/material';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../../redux/features/profile/profileApi';
import './UpdateProfile.css'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UpdateProfileProps {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ setEdit }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data } = useGetProfileQuery({});
    const profileData = data?.data || "";
    const [updateProfile] = useUpdateProfileMutation();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };
    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get("name"),
            about: formData.get("about"),
        };

        formData.append("data", JSON.stringify(data));
        if (file) {
            formData.append("file", file);
        }

        const res = await updateProfile(formData).unwrap();
        if (res?.success) {
            setEdit(false)
            toast.success(res?.message, { position: "top-right" });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='updateProfileImg'>
                    {
                        profileData?.profileImg ? <img style={{ height: "200px", width: "200px", borderRadius: "50%" }} src={previewUrl || profileData?.profileImg} /> : <>
                            <svg
                                className="subManuBigProfileIcon"
                                xmlns="http://www.w3.org/2000/svg"
                                width={190}
                                height={195}
                                viewBox="0 0 448 512"
                            >
                                <path
                                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                                    fill="rgb(92, 92, 92)"
                                />
                            </svg>
                        </>
                    }
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'center', marginBottom: "40px"
                }}>
                    {previewUrl ? <label htmlFor="upload-input">
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="upload-input"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                backgroundColor: "rgb(65, 44, 85)",
                                "&:hover": { backgroundColor: "rgb(75, 58, 91)" },
                            }}
                        >
                            Change  Profile
                        </Button>
                    </label> : <label htmlFor="upload-input">
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="upload-input"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                backgroundColor: "rgb(65, 44, 85)",
                                "&:hover": { backgroundColor: "rgb(75, 58, 91)" },
                            }}
                        >
                            Profile Image
                        </Button >
                    </label>}
                </div>
                <div className='updateProfileInputDiv'>
                    <label><small>Name</small></label>
                    <input name='name' defaultValue={profileData?.name} type='text' maxLength={30} className="updateProfileInput" required />
                </div>
                <div className='updateProfileInputDiv'>
                    <label><small>About</small></label>
                    <input name='about' defaultValue={profileData.about} type='text' maxLength={35} className="updateProfileInput" required />
                </div>
                <button className='updateProfileSubmitBtn' type='submit' >  {isLoading ? "Submitting..." : "Submit"}</button>
            </form>
        </div>
    );
};

export default UpdateProfile;