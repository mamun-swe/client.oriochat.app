import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Images } from "src/utility/images";
import { PrimaryButton } from "src/components/button";

export const Home = () => {
  return (
    <Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:h-screen py-12 lg:py-0 flex justify-center items-center">
          <img src={Images.Logo} alt="logo" className="h-20 lg:h-auto" />
        </div>
        <div className="p-6 lg:p-10 lg:h-screen flex justify-center items-center lg:bg-primary/5">
          <div className="text-center">
            <p className="text-4xl lg:text-6xl font-bold mb-4">
              Real Time Chat
            </p>
            <p className="text-base leading-relaxed mb-10">
              ORIO offers real-time messaging capabilities, allowing users to
              send and receive messages instantly. This ensures that
              conversations flow smoothly, whether in one-on-one chats or group
              discussions.
            </p>
            <Link to="/signin">
              <PrimaryButton type="button">Get Started</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
