import { Fragment, useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChatBox } from "src/components/chatbox";
import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_ENDPOINT || "";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export const RoomShow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);

  const sender = searchParams.get("sender");
  const name = searchParams.get("name");
  const room = searchParams.get("room");
  const room_name = searchParams.get("room_name");

  // Ref to track if room has been joined
  const joinedRoomRef = useRef(false);

  // establish socket connection and join room
  const handleSocketConnection = useCallback(async () => {
    try {
      if (!socket.connected) {
        await socket.connect();
      }
      // Only join room once
      if (!joinedRoomRef.current) {
        socket.emit("join-to-room", {
          senderId: sender,
          senderName: name,
          room,
          content: "Welcome!",
        });
        joinedRoomRef.current = true; // Mark as joined
      }
    } catch (error) {
      console.log("Connection error:", error);
    }
  }, [sender, name, room]);

  useEffect(() => {
    if (name && room && sender) {
      handleSocketConnection();
    }

    socket.on("error", (error) => {
      console.log("Socket error:", error);
    });

    // Listen for single message
    const handleMessages = (messages) => {
      console.log("message", messages);
      setMessages((prev) => [...prev, ...messages]);
    };

    socket.on("messages", handleMessages);

    return () => {
      socket.off("messages", handleMessages);
      socket.disconnect();
      joinedRoomRef.current = false;
    };
  }, [name, room, sender, handleSocketConnection]);

  // handle send message
  const sendMessage = (message) => {
    const data = {
      senderId: sender,
      senderName: name,
      room,
      content: message,
    };
    socket.emit("send-message", data);
  };

  // handle leave room
  const handleLeaveRoom = () => {
    socket.emit("leave-room", {
      senderId: sender,
      senderName: name,
      room,
      content: "Bye!",
    });
    navigate("/room");
  };

  return (
    <Fragment>
      <div className="container">
        <ChatBox
          sender={sender}
          room_name={room_name}
          messages={messages}
          onLeave={handleLeaveRoom}
          onSendMessage={sendMessage}
        />
      </div>
    </Fragment>
  );
};
