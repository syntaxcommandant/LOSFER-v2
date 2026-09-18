"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getMessages,
  sendMessage as sendMessageAPI,
  markMessagesRead,
} from "../../../lib/api";

type Message = {
  id: number;
  sender: "You" | "Other User";
  text: string;
  time: string;
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();

  const claimId = params.claimId as string;

  const [message, setMessage] = useState("");
  

  const [messages, setMessages] = useState<Message[]>([]);


 useEffect(() => {
  const loadMessages = async () => {
    try {
      const data = await getMessages(Number(claimId));

      const formattedMessages = data.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender,
        text: msg.text,
        time: new Date(msg.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  if (claimId) {
    loadMessages();
    markMessagesRead(Number(claimId));
  }
}, [claimId]);


 const sendMessage = async () => {
  if (!message.trim()) return;

  try {
    const data = await sendMessageAPI(
      Number(claimId),
      message.trim()
    );

    setMessages((prev) => [
      ...prev,
      {
        id: data.id,
        sender: "You",
        text: data.message,
        time: new Date(data.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px" }}>
            Secure Chat
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Claim ID: {claimId}
          </p>
        </div>

        {/* Safety message */}
        <div
          style={{
            margin: "15px 20px",
            padding: "12px",
            background: "#f0fdf4",
            borderRadius: "10px",
            fontSize: "14px",
            color: "#166534",
          }}
        >
          🔒 Keep communication inside the app. Do not share passwords,
          OTPs or sensitive personal information.
        </div>

        {/* Messages */}
        <div
          style={{
            height: "420px",
            overflowY: "auto",
            padding: "20px",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "You"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "12px 15px",
                  borderRadius: "14px",
                  background:
                    msg.sender === "You"
                      ? "#2563eb"
                      : "#e5e7eb",
                  color:
                    msg.sender === "You"
                      ? "white"
                      : "#111827",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    marginBottom: "4px",
                    opacity: 0.7,
                  }}
                >
                  {msg.sender}
                </div>

                <div>{msg.text}</div>

                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "5px",
                    opacity: 0.7,
                    textAlign: "right",
                  }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "15px 20px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
         <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            autoFocus
            name="message"
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              outline: "none",
              color: "#111827",
              backgroundColor: "#ffffff",
              cursor: "text",
  }}
/>

          <button
            onClick={sendMessage}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>

        {/* Handoff button */}
        <div
          style={{
            padding: "0 20px 20px",
          }}
        >
          <button
            onClick={() => router.push(`/handoff/${claimId}`)}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Continue to Handoff
          </button>
        </div>
      </div>
    </main>
  );
}