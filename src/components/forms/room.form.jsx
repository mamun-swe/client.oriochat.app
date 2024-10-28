import { PrimaryButton } from "src/components/button";
import { HookFormInputField } from "src/components/input";
import { useForm, FormProvider } from "react-hook-form";

export const RoomForm = ({ formType, data, loading, onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      name: data?.name || "",
    },
  });

  // handle form submission
  const handleFormSubmit = (formData) => onSubmit(formData);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        {/* Room name input control */}
        <div className="mb-6">
          <HookFormInputField
            type="text"
            name="name"
            label="Room Name"
            rules={{ required: "Room name is required." }}
          />
        </div>

        {/* Submit button */}
        <div className="text-center">
          <PrimaryButton type="submit" loading={loading}>
            {loading
              ? formType === "create"
                ? "Creating..."
                : "Updating..."
              : formType === "create"
              ? "Create Room"
              : "Update Room"}
          </PrimaryButton>
        </div>
      </form>
    </FormProvider>
  );
};
