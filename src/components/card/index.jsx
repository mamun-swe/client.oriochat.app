export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full rounded-lg shadow-md border border-slate-100 bg-white ${className}`}
    >
      {children}
    </div>
  );
};

// Set display name for the main component
Card.displayName = "Card";

// Card.Header subcomponent
Card.Header = ({ children, className = "" }) => {
  return (
    <div className={`px-4 lg:px-6 py-4 border-b ${className}`}>{children}</div>
  );
};

// Set display name for the Header subcomponent
Card.Header.displayName = "CardHeader";

// Card.Body subcomponent
Card.Body = ({ children, className = "" }) => {
  return <div className={`p-4 lg:p-6 ${className}`}>{children}</div>;
};

// Set display name for the Body subcomponent
Card.Body.displayName = "CardBody";
