import { Images } from "src/utility/images";

// Custom no-data component
export const NoContent = ({ message }) => {
  return (
    <div className="max-w-sm mx-auto py-16 text-center">
      <img
        src={Images.NotFound}
        alt="No content"
        className="w-20 h-20 mx-auto"
      />
      <p className="text-base font-bold mt-2 text-primary">{message}</p>
      <p className="text-sm text-neutral-500">
        There is no content to display, Create something!
      </p>
    </div>
  );
};
