import { Link } from "react-router-dom";
import { PrimaryButton } from "src/components/button";
import { FormProvider, useForm } from "react-hook-form";
import { HookFormInputField } from "src/components/input";

export const SignUpForm = ({ loading, onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // handle form submission
  const handleFormSubmit = (formData) => onSubmit(formData);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="space-y-8"
      >
        {/* Name input control */}
        <HookFormInputField
          type="text"
          name="name"
          label="Name"
          rules={{ required: "Name is required." }}
        />

        {/* Email input control */}
        <HookFormInputField
          type="text"
          name="email"
          label="example@gmail.com"
          rules={{
            required: "Email address is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address.",
            },
          }}
        />

        {/* Password input control */}
        <HookFormInputField
          type="password"
          name="password"
          label="Password"
          rules={{ required: "Password is required." }}
        />

        {/* Submit button */}
        <PrimaryButton type="submit" className="w-full" loading={loading}>
          {loading ? "Wait a moment..." : "Create Account"}
        </PrimaryButton>
      </form>

      {/* Sign up page link */}
      <div className="text-right mt-4">
        <p className="text-sm text-neutral-500">
          Already have an account?{" "}
          <Link to="/signin" className="underline text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </FormProvider>
  );
};
