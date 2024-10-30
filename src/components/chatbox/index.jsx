import { useState } from "react";
import { PrimaryButton } from "src/components/button";
import { RegularMessage, WelcomeMessage } from "src/components/chatbox/message";

export const ChatBox = ({
  sender,
  room_name,
  messages,
  onSendMessage,
  onLeave,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) onSendMessage(newMessage);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-t-2xl flex items-center justify-between bg-primary">
        <div className="text-xl font-semibold text-white">
          Chat with {room_name}
        </div>
        <PrimaryButton
          type="button"
          className="!rounded-full !px-4 !py-2 !text-xs !bg-white !text-primary"
          onClick={onLeave}
        >
          Leave Chat
        </PrimaryButton>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
        {messages.map((message, index) =>
          message.type === "JOIN" || message.type === "LEAVE" ? (
            <WelcomeMessage
              key={index}
              text={message.content}
              timestamp={"10:30 AM"}
            />
          ) : (
            <RegularMessage
              key={index}
              sender_name={message.senderName}
              is_self_message={message.senderId == sender}
              timestamp={new Date().toLocaleTimeString()}
              text={message.content}
            />
          )
        )}
      </div>

      {/* Input area */}
      <div className="p-4 rounded-b-2xl border-t flex items-center gap-3 bg-primary/5">
        <div className="grow">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full rounded-full px-4 py-3 text-sm border-none outline-none"
          />
        </div>

        <div className="flex-none">
          <PrimaryButton
            type="button"
            onClick={handleSendMessage}
            className="!rounded-full !py-2.5"
          >
            Send
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
