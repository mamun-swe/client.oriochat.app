export const RegularMessage = ({
  sender_name,
  is_self_message,
  timestamp,
  text,
}) => {
  return (
    <div
      className={`flex gap-2 ${
        is_self_message ? "justify-end" : "justify-start"
      }`}
    >
      {!is_self_message ? (
        <div className="grid place-items-center w-8 h-8 rounded-full bg-primary">
          <p className="text-sm uppercase font-semibold text-white">
            {sender_name.split("")[0]}
          </p>
        </div>
      ) : null}
      <div
        className="max-w-xs px-4 py-2 rounded-lg shadow text-sm relative"
        style={{
          backgroundColor: is_self_message ? "#DCF8C6" : "#FFF",
          color: is_self_message ? "#303030" : "#303030",
        }}
      >
        <p>{text}</p>
        <span className="text-xs text-gray-500 mt-1 block text-right">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

// Welcome message
export const WelcomeMessage = ({ text }) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-xs px-3 py-1 border rounded-full bg-slate-100">
        <p className="text-[11px] text-center text-primary/70">{text}</p>
      </div>
    </div>
  );
};
