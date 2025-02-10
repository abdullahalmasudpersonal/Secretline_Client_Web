import {
  faMicrophoneSlash,
  faPhoneFlip,
  faUserPlus,
  faVideo,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import "./OutGoingAudioCallModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { Dispatch, SetStateAction, } from "react";
import { useGetSingleUserQuery } from "../../../../../redux/features/user/userApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  height: 350,
  borderRadius: "5px",
  color: "white",
  backgroundImage:
    "linear-gradient(62deg,rgb(33, 59, 94) 0%,rgb(41, 16, 65) 100%)",
  boxShadow: 24,
  boxSizing: "border-box",
  border: "none",
};

type TOutGoingAudioCallModalProps = {
  activeUserId: string,
  OutGoingAudioCallModalOpen: boolean;
  setOutGoingAudioCallModalOpen: Dispatch<SetStateAction<boolean>>;
};

const OutGoingAudioCallModal = ({ activeUserId,
  OutGoingAudioCallModalOpen, setOutGoingAudioCallModalOpen
}: TOutGoingAudioCallModalProps) => {
  const { data } = useGetSingleUserQuery(activeUserId, {
    pollingInterval: 1000,
    skipPollingIfUnfocused: true,
  });
  const { name, user } = data?.data || {};


  return (
    <>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={OutGoingAudioCallModalOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={OutGoingAudioCallModalOpen}>
          <Box sx={style}>
            <div className="outGoingAudioCallInfoDiv">
              <p style={{ margin: "0", fontSize: "18px", marginTop: "15px" }}>
                {name}
              </p>
              <svg
                className="outGoingAudioCallUserIcon"
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                viewBox="0 0 448 512"
              >
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                  fill="rgb(63, 63, 63)"
                />
              </svg>
              <p style={{ margin: "0", marginBottom: "5px" }}>
                <small>{user?.isOnline ? "Ringing..." : "CALLING..."}</small>
              </p>
            </div>
            <div className="outGoingAudioCallDetailsBtnDiv">
              <FontAwesomeIcon
                className="outGoingAudioCallDetailsBtn"
                icon={faVolumeHigh}
              />
              <FontAwesomeIcon
                className="outGoingAudioCallDetailsBtn"
                icon={faVideo}
              />
              <FontAwesomeIcon
                className="outGoingAudioCallDetailsBtn"
                icon={faUserPlus}
              />
              <FontAwesomeIcon
                className="outGoingAudioCallDetailsBtn"
                icon={faMicrophoneSlash}
              />
            </div>
            <div className="outGoingaudioCallBtnDiv">
              <button className="rejectAudioCallBtn">
                <FontAwesomeIcon onClick={() => setOutGoingAudioCallModalOpen(false)} icon={faPhoneFlip} />
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default OutGoingAudioCallModal;
