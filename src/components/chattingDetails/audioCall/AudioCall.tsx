import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AudioCall.css";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import socket from "../../../utils/Socket";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IncomingCall {
  userId: string;
  from: string;
  offer: RTCSessionDescriptionInit;
}
type TAudioCallProps = {
  activeUserId?: string;
};

const AudioCall = ({ activeUserId }: TAudioCallProps) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [outgoingCall, setOutgoingCall] = useState();
  const [incomingCallModal, setIncomingCallModal] = useState(true);
  const [outgoingCallModal, setOutgoingCallModal] = useState(false);

  useEffect(() => {
    socket.on("receivedAudioCallOffer", async ({ userId, from, offer }) => {
      setIncomingCall({ userId, from, offer });
    });
  });

  // useEffect(() => {
  //   socket.on("receivedAudioCallAnswer", async ({ answer }) => {
  //     outgoingCall( answer);
  //   });
  // });

  const sendAudioCall = async () => {
    setOutgoingCallModal(true);
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // peerConnection.onicecandidate = (event) => {
    //   if (event.candidate) {
    //     socket.emit("sendIceCandidate", {
    //       target: activeUserId,
    //       candidate: event.candidate,
    //     });
    //   }
    // };

    // peerConnection.ontrack = (event) => {
    //   console.log("Remote stream received");
    //   const remoteStream = event.streams[0];
    //   const audioElement = document.getElementById(
    //     "remoteAudio"
    //   ) as HTMLAudioElement;
    //   if (audioElement) {
    //     audioElement.srcObject = remoteStream;
    //   }
    // };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("sendAudioCallOffer", {
      target: activeUserId,
      offer,
    });

    console.log("Offer sent to receiver:", offer);
  };

  const acceptAudioCall = async () => {
    if (!incomingCall || !socket) return;

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("sendIceCandidate", {
          target: incomingCall.from,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      const audioElement = document.getElementById(
        "remoteAudio"
      ) as HTMLAudioElement;
      if (audioElement) {
        audioElement.srcObject = remoteStream;
      }
    };

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(incomingCall.offer)
    );

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("sendAudioCallAnswer", {
      target: incomingCall.from,
      answer: peerConnection.localDescription,
    });

    console.log("Answer created and sent.");
  };

  // কল প্রত্যাখ্যান করার ফাংশন
  const rejectAudioCall = () => {
    console.log("Call rejected.");
    setIncomingCall(null);
  };

  const cancelAudioCall = () => {
    setOutgoingCallModal(false);
  };

  return (
    <>
      {/* ----------------- Incomming Call Modal -------------------- */}
      {incomingCall && (
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
              <p>Incoming call from user: {incomingCall.userId}</p>
              <button onClick={acceptAudioCall}>Accept</button>
              <button onClick={rejectAudioCall}>Reject</button>
            </Box>
          </Fade>
        </Modal>
      )}
      <>
        {/* ----------------- Outgoing Call Modal -------------------- */}
        {/* {outgoingCall && ( */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={outgoingCallModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={outgoingCallModal}>
            <Box sx={style}>
              <p>Outgoing call for user: {activeUserId}</p>
              {/* <button onClick={acceptAudioCall}>Accept</button>
                <button onClick={rejectAudioCall}>Reject</button> */}
              <button onClick={cancelAudioCall}>Cancel</button>
            </Box>
          </Fade>
        </Modal>
        {/* )} */}
      </>
      <FontAwesomeIcon
        className="chatting-details-topber-icon"
        icon={faPhone}
        onClick={sendAudioCall}
      />
    </>
  );
};

export default AudioCall;
