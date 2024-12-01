import { Fragment, useState } from "react";
import { Images } from "src/utility/images";
import { HttpServices } from "src/services";
import { useNavigate } from "react-router-dom";
import { HotToast } from "src/components/hot-toast";
import { SignInForm } from "src/components/forms/signin.form";

export const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  // handle signin submit
  const handleSignIn = async (data) => {
    try {
      setLoading(true);
      const response = await HttpServices.authService.signIn(data);
      if (response && response.status === 200) {
        localStorage.setItem("token", response.data);
        HotToast.Success({ message: "Sign in successful." });
        navigate("/chat");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      HotToast.Error({ message: error?.response?.data });
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
              <p className="text-4xl lg:text-6xl font-bold mb-4">Sign In</p>
              <p className="text-base leading-relaxed mb-10">
                Sign in to your account and start chatting with your friends and
                family.
              </p>
            </div>

            <div>
              <SignInForm loading={isLoading} onSubmit={handleSignIn} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
