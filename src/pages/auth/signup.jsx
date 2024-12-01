import { Fragment, useState } from "react";
import { Images } from "src/utility/images";
import { HttpServices } from "src/services";
import { HotToast } from "src/components/hot-toast";
import { SignUpForm } from "src/components/forms/signup.form";

export const SignUp = () => {
  const [isLoading, setLoading] = useState(false);

  // handle signup submit
  const handleSignUp = async (data) => {
    try {
      setLoading(true);
      const response = await HttpServices.authService.signUp(data);
      if (response && response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      HotToast.Error({ message: error?.response?.data?.message });
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:h-screen py-12 lg:py-0 flex justify-center items-center">
          <img src={Images.Logo} alt="logo" className="h-20 lg:h-auto" />
        </div>
        <div className="p-6 lg:p-10 lg:h-screen flex justify-center items-center lg:bg-primary/5">
          <div className="w-full max-w-md">
            <div className="text-center">
              <p className="text-4xl lg:text-6xl font-bold mb-4">Sign Up</p>
              <p className="text-base leading-relaxed mb-10">
                Create an account to join and start chatting with your friends
                and family.
              </p>
            </div>

            <SignUpForm loading={isLoading} onSubmit={handleSignUp} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
