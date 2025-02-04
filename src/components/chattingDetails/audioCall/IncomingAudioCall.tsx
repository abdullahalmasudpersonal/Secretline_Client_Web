import { useState } from "react";
import socket from "../../../utils/Socket";
import IncomingAudioCallModal from "./audioAllModal/IncomingAudioCallModal/IncomingAudioCallModal";

interface IncomingCall {
    userId: string;
    callerId: string;
    offer: RTCSessionDescriptionInit;
}

const IncomingAudioCall = () => {
    const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
    const [incomingCallModal, setIncomingCallModal] = useState(true);

    // অফার রিসিভ এবং "রিসিভ বাটন" দেখানো
    socket.on("offer", ({ sender, userId, offer }) => {
        setIncomingCall({ callerId: sender, userId, offer });
    });


    socket.on("answer", async ({ sender, answer }) => {
        // await peerConnection.current.setRemoteDescription(
        //   new RTCSessionDescription(answer)
        // );
        console.log("return answer", answer, sender);
    });

    return (
        <>
            {incomingCall && (
                <IncomingAudioCallModal
                    incomingCallModal={incomingCallModal}
                    setIncomingCallModal={setIncomingCallModal}
                    incomingCall={incomingCall}
                />
            )}
        </>
    );
};

export default IncomingAudioCall;