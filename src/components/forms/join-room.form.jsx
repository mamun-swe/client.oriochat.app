import { PrimaryButton } from "src/components/button";
import { HookFormInputField } from "src/components/input";
import { useForm, FormProvider } from "react-hook-form";

export const JoinRoomForm = ({ loading, onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      username: "",
      userid: "",
    },
  });

  // handle form submission
  const handleFormSubmit = (formData) => onSubmit(formData);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        {/* Userid input control */}
        <div className="mb-6">
          <HookFormInputField
            type="text"
            name="userid"
            label="User ID (Must be remember)"
            rules={{ required: "User ID is required." }}
          />
        </div>

        {/* Username input control */}
        <div className="mb-6">
          <HookFormInputField
            type="text"
            name="username"
            label="Username"
            rules={{ required: "Username is required." }}
          />
        </div>

        {/* Submit button */}
        <div className="text-center">
          <PrimaryButton type="submit" loading={loading}>
            {loading ? "Joining..." : "Join Room"}
          </PrimaryButton>
        </div>
      </form>
    </FormProvider>
  );
};
