import { useEffect, useState } from "react";
import { TChatProps } from "../utils/types/chat.type";
import ai from "../assets/image.jpeg";

export const AiChat = ({ message }: TChatProps) => {
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    // Function to check if a string is valid JSON
    const isValidJSON = (str: string) => {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    };

    let finalMessage = message;
    const jsonStartIndex = message.indexOf(
      "Here is the extracted information in JSON format:"
    );
    if (jsonStartIndex !== -1) {
      const jsonString = message
        .substring(
          jsonStartIndex +
            "Here is the extracted information in JSON format:".length
        )
        .trim();

      if (isValidJSON(jsonString)) {
        console.log(jsonString, "belum");
        const objJson = JSON.parse(jsonString);
        finalMessage = JSON.stringify(objJson, null, 4);
        console.log(finalMessage, "sudah");
        setDisplayedMessage(finalMessage);
      }
    }
    setDisplayedMessage("");
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= finalMessage.length) {
        setDisplayedMessage(finalMessage.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex justify-start py-2">
      <div className="flex items-start">
        <div className="flex gap-2 items-start">
          <img
            src={ai}
            className="h-10 w-10 items-center justify-center rounded-full object-cover"
            alt="AI Avatar"
          />
          <div
            style={{ whiteSpace: "pre-wrap" }}
            className="w-auto max-w-2xl rounded-br-xl rounded-tl-xl overflow-auto rounded-tr-xl bg-chatAi p-4 shadow-sm"
          >
            {displayedMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserChat = ({ message }: TChatProps) => {
  return (
    <div className="flex justify-end py-2">
      <div className="w-auto  max-w-xs rounded-bl-xl rounded-tl-xl rounded-tr-xl bg-mainColor p-4 text-white shadow-sm">
        <p>{message}</p>
      </div>
    </div>
  );
};

export const AdminHIstoryChat = ({ message }: TChatProps) => {
  return (
    <div className="flex justify-start py-2">
      <div className="flex items-start">
        <div className="flex gap-2 items-start">
          <img
            src={ai}
            className="h-10 w-10 items-center justify-center rounded-full object-cover"
          />
          <div
            style={{ whiteSpace: "pre-line" }}
            className="w-auto max-w-2xl rounded-br-xl rounded-tl-xl text-sm overflow-auto rounded-tr-xl bg-chatAi p-4 shadow-sm"
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};
