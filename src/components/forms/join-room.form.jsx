import { PrimaryButton } from "src/components/button";
import { HookFormInputField } from "src/components/input";
import { useForm, FormProvider } from "react-hook-form";

export const JoinRoomForm = ({ loading, onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      username: "",
    },
  });

  // handle form submission
  const handleFormSubmit = (formData) => onSubmit(formData);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
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
