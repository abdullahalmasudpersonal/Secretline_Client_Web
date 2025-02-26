import { toast } from "sonner";

const DemoCriential = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${text} copied to clipboard!`, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error(`${"Failed to copy text: "} ${err}`, {
          position: "top-center",
        });
      });
  };

  return (
    <>
      <div>
        <h4>Demo Cridential</h4>

        <div
          style={{
            display: "flex",
            gap: "10px",
            color: "rgb(11,21,12)",
          }}
        >
          <div>
            <p
              onClick={() => handleCopy("abdullah@gmail.com")}
              style={{ margin: "0", fontWeight: "bold", cursor: "pointer" }}
            >
              abdullah@gmail.com
            </p>
            <p
              onClick={() => handleCopy("123456")}
              style={{ margin: "0", fontWeight: "bold", cursor: "pointer" }}
            >
              {" "}
              123456
            </p>
          </div>
          <div>
            <p
              onClick={() => handleCopy("saki@gmail.com")}
              style={{ margin: "0", fontWeight: "bold", cursor: "pointer" }}
            >
              {" "}
              saki@gmail.com
            </p>
            <p
              onClick={() => handleCopy("123456")}
              style={{ margin: "0", fontWeight: "bold", cursor: "pointer" }}
            >
              {" "}
              123456
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoCriential;
