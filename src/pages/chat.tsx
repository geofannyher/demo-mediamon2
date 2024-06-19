import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { notification } from "antd";
import { IMessage } from "../utils/interface/chat.interface";
import { AiChat, UserChat } from "../components/chat";
import Navbar from "../components/navbar";
import LoadingComponent from "../components/loader";
import { getIdSession } from "../services/supabase/session.service";
import { chatRes } from "../services/api/chat.services";
import notificationSound from "../assets/notif.mp3";
import { getSession } from "../shared/Session";
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [api, context] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [idUserSession, setId] = useState("");

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      if (
        "scrollBehavior" in document.documentElement.style &&
        window.innerWidth > 768
      ) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        messagesEndRef.current.scrollIntoView();
      }
    }
  };

  const getIdUser = async () => {
    const resses = await getIdSession();
    if (resses?.status == 200) {
      setId(resses?.data?.uuid);
    } else {
      return api.error({ message: "Gagal mendapatkan id user" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          text: "Silakan kirimkan konten media sosial disini, agar bisa segera kami proses",
          sender: "ai",
        },
      ]);
    }, 700);
    getIdUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleForm = async (event: any) => {
    event.preventDefault();
    const idSession = getSession();

    const messageInput = event?.target[0]?.value.trim();
    event.target[0].value = "";
    if (!messageInput) {
      return api.error({ message: "Kolom pesan tidak boleh kosong" });
    }
    if (!idSession) {
      return api.error({ message: "Model tidak boleh kosong" });
    }
    setIsLoading(true);
    const userMessage = { text: messageInput, sender: "user" };

    setMessages((prevMessages: any) => [...prevMessages, userMessage]);

    const audio = new Audio(notificationSound);
    audio.play();

    const resNew: any = await chatRes({
      message: messageInput,
      star: idSession ? idSession : "",
      id: idUserSession ? idUserSession : "",
      model: "gpt-4-turbo-preview",
      is_rag: "false",
    });

    if (resNew && resNew?.data?.data) {
      setMessages((prevMessages: any) => {
        return [
          ...prevMessages.filter((m: any) => !m.isLoading),
          { text: resNew?.data?.data || "AI tidak merespon", sender: "ai" },
        ];
      });
      const audio = new Audio(notificationSound);
      audio.play();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-screen flex-col bg-white">
      <Navbar />
      {context}
      <div className="container hide-scrollbar mx-auto flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === "user" ? (
              <UserChat message={message.text} />
            ) : (
              <AiChat
                message={message.text}
                isLastAIChat={index === messages.length - 1}
              />
            )}
          </div>
        ))}
        {isLoading && <LoadingComponent />}
        <div ref={messagesEndRef} />
      </div>
      <div className="container mx-auto w-full p-4 shadow-sm">
        <form onSubmit={handleForm}>
          <div className="relative">
            <input
              type="text"
              id="message"
              name="message"
              className="block w-full pr-20 rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900"
              placeholder="Masukkan pesan anda.."
            />
            <button
              type="submit"
              className="absolute bottom-2.5 end-2.5 rounded-lg bg-mainColor px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-hoverBtn"
            >
              <IoIosSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
