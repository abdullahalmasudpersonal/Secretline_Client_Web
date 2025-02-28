import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

type VoiceMessageProps = {
  recording: boolean;
  setRecording: React.Dispatch<React.SetStateAction<boolean>>;
  audioUrl: string | null;
  setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

const VoiceMessage = ({
  recording,
  setRecording,
  audioUrl,
  setAudioUrl,
}: VoiceMessageProps) => {
  //   const [recording, setRecording] = useState<boolean>(false);
  //   const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  // 🎤 রেকর্ডিং শুরু
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      // 📤 এখানে অডিও সার্ভারে পাঠানোর জন্য API কল করতে পারেন
      // const formData = new FormData();
      // formData.append("voiceMessage", audioBlob);
      // fetch("/upload-voice", { method: "POST", body: formData });
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // ⏹️ রেকর্ডিং বন্ধ করা
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        <FontAwesomeIcon
          className="chatting-details-voice-msg-icon"
          icon={faMicrophone}
          style={{ color: recording ? "red" : "black" }}
        />
      </button>

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )}
    </div>
  );
};

export default VoiceMessage;
