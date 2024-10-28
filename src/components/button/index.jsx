/* Primary button */
export const PrimaryButton = ({
  type,
  buttonType,
  className = "",
  disabled,
  tabIndex,
  loading,
  onClick,
  children,
}) => {
  const general = `uppercase text-sm font-medium text-white bg-primary px-7 py-3.5 border border-primary transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  const circle = `uppercase text-sm font-medium text-primary bg-none border border-primary p-3 rounded-full transition-all hover:bg-primary hover:text-white disabled:bg-primary disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  const outline = `uppercase text-sm font-medium text-primary bg-none px-7 py-3.5 border border-primary transition-all hover:bg-primary hover:text-white disabled:bg-primary disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  return (
    <button
      type={type}
      tabIndex={tabIndex}
      onClick={onClick}
      disabled={disabled || loading}
      className={
        buttonType === "circle"
          ? circle
          : buttonType === "outline"
          ? outline
          : general
      }
    >
      {children}
    </button>
  );
};
