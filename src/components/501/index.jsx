import { Images } from "src/utility/images";

export const SomethingGoingWrong = () => {
  return (
    <div className="max-w-sm mx-auto text-center p-7 rounded-3xl bg-white">
      <img src={Images.Error} alt="Error" className="w-20 h-20 mx-auto mb-4" />
      <p className="text-base font-bold">Something going wrong!</p>
      <p className="text-sm text-neutral-500">
        We are sorry, but something went wrong on our end. Please try again.
      </p>
    </div>
  );
};
