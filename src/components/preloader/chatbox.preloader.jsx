export const ChatBoxPreloader = () => {
  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto py-4">
      {/* Chatbox header container */}
      <div className="p-6 rounded-t-2xl flex items-center justify-between bg-primary">
        <div className="w-28 md:w-40 h-9 rounded-md animate-pulse bg-slate-600" />
        <div className="w-28 md:w-32 h-9 rounded-full animate-pulse bg-slate-600" />
      </div>

      {/* Message list container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
        <div className="flex gap-2 justify-start">
          <div className="w-8 h-8 rounded-full animate-pulse bg-primary/20" />

          <div className="space-y-2 mt-0.5">
            <div className="rounded-full h-2 w-48 animate-pulse bg-slate-300" />
            <div className="rounded-full h-2 w-36 animate-pulse bg-slate-300" />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <div className="space-y-2 mt-0.5">
            <div className="rounded-full h-2 w-48 animate-pulse bg-slate-300" />
            <div className="rounded-full h-2 w-36 animate-pulse ml-auto bg-slate-300" />
          </div>
          <div className="w-8 h-8 rounded-full animate-pulse bg-primary/20" />
        </div>
      </div>

      {/* Message input container */}
      <div className="p-4 rounded-b-2xl border-t flex items-center gap-3 bg-primary/5">
        <div className="grow">
          <div className="h-11 w-full rounded-full animate-pulse bg-slate-300" />
        </div>
        <div className="flex-none">
          <div className="w-24 h-11 rounded-full animate-pulse bg-slate-300" />
        </div>
      </div>
    </div>
  );
};
