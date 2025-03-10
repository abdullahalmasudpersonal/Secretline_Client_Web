import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import OutGoingAudioCallModal from "./audioAllModal/OutGoingAudioCallModal/OutGoingAudioCallModal";
// import { useAppSelector } from "../../../redux/hooks";
// import { selectCurrentUser } from "../../../redux/features/auth/authSlice";


type TAudioCallProps = {
  activeUserId?: string;
};

const OutGoingAudioCall = ({ activeUserId }: TAudioCallProps) => {
  // const currentUser = useAppSelector(selectCurrentUser);
  const [OutGoingAudioCallModalOpen, setOutGoingAudioCallModalOpen] = useState<boolean>(false);
  const [outGoingAudioCall, /* setOutGoingAudioCall */] = useState(false);
  const localAudio = useRef<HTMLAudioElement>(null);
  const remoteAudio = useRef<HTMLAudioElement>(null);
  // const peerConnection = useRef<RTCPeerConnection>(
  //   new RTCPeerConnection({
  //     // iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  //   })
  // );

  // কল শুরু করা (Caller)
  // const startCall = async () => {
  //   setOutGoingAudioCallModalOpen(true);
  //   setOutGoingAudioCall(true);

  //   // লোকাল অডিও স্ট্রিম
  //   const localStream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //   });
  //   if (localAudio.current) localAudio.current.srcObject = localStream;

  //   localStream.getTracks().forEach((track) => {
  //     peerConnection.current.addTrack(track, localStream);
  //   });

  //   const offer = await peerConnection.current.createOffer();
  //   await peerConnection.current.setLocalDescription(offer);

  //   socket.emit("offer", { target: activeUserId, offer });
  // };


  // কল রিসিভ করা (Receiver)
  // const receiveCall = async () => {
  //   if (!incomingCall) return;

  //   // চেক করুন সিগন্যালিং স্টেট
  //   // if (peerConnection.current.signalingState === "stable") {
  //   //   console.error("Invalid signaling state");
  //   //   return;
  //   // }

  //   // const localStream = await navigator.mediaDevices.getUserMedia({
  //   //   audio: true,
  //   // });
  //   // if (localAudio.current) localAudio.current.srcObject = localStream;

  //   // localStream.getTracks().forEach((track) => {
  //   //   peerConnection.current.addTrack(track, localStream);
  //   // });

  //   // //  //// Remote description set করার আগে, নিশ্চিত করুন এটি স্টেবল না
  //   // if (peerConnection.current.signalingState === "stable") {
  //   //   console.error("Invalid signaling state");
  //   //   return;
  //   // }
  //   // সিগন্যালিং স্টেট চেক করা
  //   if (peerConnection.current.signalingState !== "stable") {
  //     console.log("Waiting for valid signaling state...");
  //     // কিছু বিলম্বের পর চেষ্টা করা
  //     setTimeout(async () => {
  //       try {
  //         await peerConnection.current.setRemoteDescription(
  //           new RTCSessionDescription(incomingCall.offer)
  //         );

  //         const answer = await peerConnection.current.createAnswer();
  //         await peerConnection.current.setLocalDescription(answer);

  //         socket.emit("answer", { target: incomingCall.callerId, answer });
  //         setConnectedUserId(incomingCall.callerId);
  //         setOutGoingAudioCall(true);
  //         console.log("Answer sent", incomingCall.callerId, answer);
  //       } catch (error) {
  //         console.error("Error during call reception:", error);
  //       }
  //     }, 1000); // 1 সেকেন্ড পরে ট্রাই
  //     return;
  //   }

  //   // রিমোট ডেসক্রিপশন সেট করা
  //   try {
  //     await peerConnection.current.setRemoteDescription(
  //       new RTCSessionDescription(incomingCall.offer)
  //     );

  //     const answer = await peerConnection.current.createAnswer();
  //     await peerConnection.current.setLocalDescription(answer);

  //     socket.emit("answer", { target: incomingCall.callerId, answer });
  //     setConnectedUserId(incomingCall.callerId);
  //     setOutGoingAudioCall(true);
  //     console.log("Answer sent", incomingCall.callerId, answer);
  //   } catch (error) {
  //     console.error("Error during call reception:", error);
  //   }

  //   // await peerConnection.current.setRemoteDescription(
  //   //   new RTCSessionDescription(incomingCall.offer)
  //   // );
  //   // const answer = await peerConnection.current.createAnswer();
  //   // await peerConnection.current.setLocalDescription(answer);

  //   // socket.emit("answer", { target: incomingCall.callerId, answer });
  //   // setConnectedUserId(incomingCall.callerId);
  //   // setOutGoingAudioCall(true);
  //   // console.log("ans send", incomingCall.callerId, answer);
  //   // setIncomingCall(null); // কল রিসিভ হয়ে গেলে অফার ক্লিয়ার করুন
  // };

  // ICE Candidate রিসিভ এবং সেট করা
  // socket.on("ice-candidate", async ({ sender, candidate }) => {
  //   if (candidate && peerConnection.current.remoteDescription) {
  //     await peerConnection.current.addIceCandidate(
  //       new RTCIceCandidate(candidate)
  //     );
  //   } else {
  //     console.log("Remote description not set yet.");
  //   }
  //   console.log("ice candidate sender", sender);
  // });
  // একটি কিউ তৈরি করুন যেখানে ICE Candidate জমা রাখা হবে।


  // Remote Description সেট করার পর জমা রাখা আইস ক্যান্ডিডেট অ্যাড করুন
  // peerConnection.current.oniceconnectionstatechange = () => {
  //   if (peerConnection.current.remoteDescription) {
  //     // কিউতে থাকা সমস্ত Candidate যুক্ত করা
  //     while (pendingCandidates.current.length > 0) {
  //       const candidate = pendingCandidates.current.shift();
  //       if (candidate) {
  //         peerConnection.current
  //           .addIceCandidate(new RTCIceCandidate(candidate))
  //           .then(() => console.log("Queued ICE Candidate added successfully."))
  //           .catch((error) =>
  //             console.error("Error adding queued ICE Candidate:", error)
  //           );
  //       }
  //     }
  //   }
  // };

  // ICE Candidate পাঠানো
  // peerConnection.current.onicecandidate = ({ candidate }) => {
  //   if (candidate) {
  //     socket.emit("ice-candidate", { target: connectedUserId, candidate });
  //   }
  // };

  // রিমোট স্ট্রিম প্লে করা
  // peerConnection.current.ontrack = (event) => {
  //   if (remoteAudio.current) {
  //     remoteAudio.current.srcObject = event.streams[0];
  //   }
  // };




  return (
    <>
      <audio ref={localAudio} autoPlay muted />
      <audio ref={remoteAudio} autoPlay />
      <>
        {/* ----------------------- Outgoing Audio Call Modal ---------------------- */}
        {outGoingAudioCall && (
          <OutGoingAudioCallModal
            activeUserId={activeUserId || ""}
            OutGoingAudioCallModalOpen={OutGoingAudioCallModalOpen}
            setOutGoingAudioCallModalOpen={setOutGoingAudioCallModalOpen}
          />
        )}
      </>
      <FontAwesomeIcon
        className="chatting-details-topber-icon"
        icon={faPhone}
      // onClick={startCall}
      />
    </>
  );
};

export default OutGoingAudioCall;
