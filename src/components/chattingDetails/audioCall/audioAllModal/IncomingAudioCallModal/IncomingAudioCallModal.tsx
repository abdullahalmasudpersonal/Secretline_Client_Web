import { faPhone, faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import "./IncomingAudioCallModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 330,
  borderRadius: "5px",
  color: "white",
  backgroundImage:
    "linear-gradient(62deg,rgb(45, 35, 99) 0%,rgb(76, 29, 95) 100%)",
  boxShadow: 24,
  boxSizing: "border-box",
  border: "none",
};

interface IncomingCall {
  userId: string;
  callerId: string;
  offer: RTCSessionDescriptionInit;
}

type AudioCallModalProps = {
  incomingCallModal: boolean;
  incomingCall: IncomingCall;
};
const IncomingAudioCallModal = ({
  incomingCallModal,
}: // incomingCall,
AudioCallModalProps) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={incomingCallModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={incomingCallModal}>
          <Box sx={style}>
            {/* <p
              style={{
                margin: "0",
                marginTop: "20px",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              InCommingCall...
            </p> */}
            <div className="incommingAudioCallInfoDiv">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    marginBottom: "15px",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Abdullah
                </p>
                <svg
                  className="incommingAudioCallIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                    fill="rgb(63, 63, 63)"
                  />
                </svg>
              </div>
              <p>CALLING...</p>
            </div>

            <div className="audioCallBtnDiv">
              <button className="acceptAudioCallBtn">
                <FontAwesomeIcon icon={faPhone} />
              </button>
              <button className="rejectAudioCallBtn">
                <FontAwesomeIcon icon={faPhoneFlip} />
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default IncomingAudioCallModal;
