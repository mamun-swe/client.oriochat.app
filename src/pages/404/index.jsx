import { Link } from "react-router-dom";
import { Images } from "src/utility/images";
import { PrimaryButton } from "src/components/button";

export const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div>
        <img
          src={Images.NotFound}
          alt="Not found"
          className="w-20 h-20 mx-auto"
        />
        <p className="text-base font-bold mt-2 text-primary">
          What are you looking for?
        </p>
        <p className="text-sm mb-6 text-neutral-500">
          This page does not exist or has been removed!
        </p>
        <Link to="/">
          <PrimaryButton type="button">Go Home</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};
