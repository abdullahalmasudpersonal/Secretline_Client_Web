import { faPhone, faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import "./IncomingAudioCallModal.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useGetSingleUserQuery } from "../../../../../redux/features/user/userApi";
import socket from "../../../../../utils/Socket";
import Peer, { Instance } from "simple-peer";

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
  setIncomingCallModal: Dispatch<SetStateAction<boolean>>;
};
const IncomingAudioCallModal = ({
  incomingCallModal,
  incomingCall,
  setIncomingCallModal
}: AudioCallModalProps) => {
  const userId = incomingCall?.userId
  const { data } = useGetSingleUserQuery(userId);
  const { name } = data?.data || {};

  // ///////////////////////////////////////

  const userAudio = useRef<HTMLAudioElement | null>(null);
  const connectionRef = useRef<Instance | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [callerSignal, setCallerSignal] = useState<any>(null);
  const [callerId, setCallerId] = useState<string | null>(null);

  useEffect(() => {
    // মাইক্রোফোন অ্যাক্সেস করুন
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((currentStream) => {
        setStream(currentStream);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });

    // কলের নোটিফিকেশন পেলে
    socket.on('callUser', (data) => {
      setCallerSignal(data.signal); // কলার সিগনাল সেট করুন
      setCallerId(data.from); // কলার আইডি সেট করুন
    });
  }, []);

  const acceptCall = () => {
    if (!stream || !callerSignal) return;

    // WebRTC পিয়ার তৈরি করুন
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    // সিগনাল তৈরি করুন এবং কলারকে পাঠান
    peer.on('signal', (data) => {
      socket.emit('acceptCall', {
        signal: data,
        to: callerId, // কলার আইডি
      });
    });

    peer.on('stream', (remoteStream) => {
      console.log('Received remote stream:', remoteStream); // রিমোট স্ট্রিম লগ করুন
      if (userAudio.current) {
        userAudio.current.srcObject = remoteStream;
      }
    });

    // কলার থেকে সিগনাল পেলে কানেকশন সম্পূর্ণ করুন
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };


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
            <>
              {callerSignal && (
                <div>
                  <p>{callerId} is calling...</p>
                  <button onClick={acceptCall}>Answer Call</button>
                </div>
              )}
            </>
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
                  {name}
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
                <FontAwesomeIcon icon={faPhoneFlip} onClick={() => setIncomingCallModal(false)} />
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default IncomingAudioCallModal;
