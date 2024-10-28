import { useFormContext } from "react-hook-form";

// Input field component for react-hook-form
export const HookFormInputField = ({
  name,
  label,
  rules,
  disabled = false,
  type = "text",
  defaultValue = "",
  className = "",
  onChange,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative w-full">
      <input
        {...register(name, rules)}
        type={type}
        id={name}
        placeholder=""
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`peer p-[14px] text-sm border w-full focus:outline-none focus:ring-1 transition-colors duration-200 ${className} ${
          errors[name]
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-primary focus:ring-primary"
        } ${
          disabled
            ? "bg-gray-100 cursor-not-allowed text-gray-400 border-gray-300"
            : "bg-white text-black"
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-[7px] z-10 origin-[0] left-2.5 bg-white px-1 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[name]
              ? "text-red-500"
              : "text-gray-500 peer-focus:text-primary"
          } ${disabled ? "text-gray-400" : ""}`}
      >
        {label}
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message || "Error"}
        </p>
      )}
    </div>
  );
};

// Textarea field component for react-hook-form
export const HookFormTextAreaInputField = ({
  name,
  label,
  rules,
  rows = 3,
  disabled = false,
  defaultValue = "",
  className = "",
  onChange,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative w-full">
      <textarea
        {...register(name, rules)}
        id={name}
        rows={rows}
        placeholder=""
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`peer p-[14px] text-sm border w-full focus:outline-none focus:ring-1 transition-colors duration-200 ${className} ${
          errors[name]
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-primary focus:ring-primary"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-[7px] z-10 origin-[0] left-2.5 bg-white px-1 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[name]
              ? "text-red-500"
              : "text-gray-500 peer-focus:text-primary"
          } ${disabled ? "text-gray-400" : ""}`}
      >
        {label}
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message || "Error"}
        </p>
      )}
    </div>
  );
};

// Dropdown field component for react-hook-form
export const HookFormDropdownField = ({
  name,
  label,
  options,
  rules,
  disabled = false,
  defaultValue = "",
  className = "",
  onChange,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative w-full">
      <select
        {...register(name, rules)}
        id={name}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`p-[15px] text-sm border w-full focus:outline-none focus:ring-1 transition-colors duration-200 ${className} ${
          errors[name]
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-primary focus:ring-primary"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message || "Error"}
        </p>
      )}
    </div>
  );
};
