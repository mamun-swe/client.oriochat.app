export const ProfilePreloader = () => {
  return (
    <div className="flex justify-between items-center lg:pl-5 pb-5 lg:pb-10 border-b">
      <div className="w-full lg:flex gap-4 items-center space-y-3 lg:space-y-0">
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-slate-200 animate-pulse" />
        <div className="flex-grow">
          <div className="w-52 h-4 mb-3 bg-slate-200 animate-pulse rounded-full" />
          <div className="w-48 h-3 mb-3 bg-slate-200 animate-pulse rounded-full" />
          <div className="w-40 h-3 bg-slate-200 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
};
