import io from "socket.io-client";
import { Fragment, useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpServices } from "src/services";
import { ChatBox } from "src/components/chatbox";
import { decodeToken } from "src/utility/helper";
import { SomethingGoingWrong } from "src/components/501";
import { ChatBoxPreloader } from "src/components/preloader/chatbox.preloader";

const SOCKET_URL = import.meta.env.VITE_SOCKET_ENDPOINT || "";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export const RoomShow = () => {
  const joinedRoomRef = useRef(false);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [isRoomDataLoading, setRoomDataLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [messages, setMessages] = useState([]);
  const sender = decodeToken();

  //  Get room information
  const fetchRoom = useCallback(async () => {
    try {
      const response = await HttpServices.roomService.getRoom(roomId);
      if (response && response.status === 200) {
        setTimeout(() => {
          setRoomData(response.data?.data);
          setRoomDataLoading(false);
        }, 1000);
      }
    } catch (error) {
      setRoomDataLoading(false);
      setServerError(true);
      console.log(error);
    }
  }, [roomId]);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  // establish socket connection and join room
  const handleSocketConnection = useCallback(async () => {
    try {
      if (!socket.connected) {
        await socket.connect();
      }
      // Only join room once
      if (!joinedRoomRef.current) {
        socket.emit("join-to-room", {
          senderId: sender?.sub,
          senderName: sender?.name,
          roomId,
          content: "Welcome!",
        });
        joinedRoomRef.current = true;
      }
    } catch (error) {
      console.log("Connection error:", error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSocketConnection();

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
  }, [handleSocketConnection]);

  // handle send message
  const sendMessage = (message) => {
    const data = {
      senderId: sender?.sub,
      senderName: sender?.name,
      roomId,
      content: message,
    };
    socket.emit("send-message", data);
  };

  // handle leave room
  const handleLeaveRoom = () => {
    socket.emit("leave-room", {
      senderId: sender?.sub,
      senderName: sender?.name,
      roomId,
      content: "Bye!",
    });
    navigate("/chat");
  };

  return (
    <Fragment>
      <div className="container">
        {isRoomDataLoading && !serverError && !roomData && <ChatBoxPreloader />}
        {!isRoomDataLoading && !roomData && serverError && (
          <div className="grid h-screen justify-center items-center">
            <SomethingGoingWrong />
          </div>
        )}

        {!isRoomDataLoading && !serverError && roomData && (
          <ChatBox
            sender={sender?.sub}
            room_name={roomData?.name}
            messages={messages}
            onLeave={handleLeaveRoom}
            onSendMessage={sendMessage}
          />
        )}
      </div>
    </Fragment>
  );
};
