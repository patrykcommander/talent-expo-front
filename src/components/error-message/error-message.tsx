import React from "react";

const ErrorMessage: React.FC<{ message: string | undefined }> = ({
  message,
}) => {
  return (
    <p className="text-sm text-red-500">{message || "Wrong input data"}</p>
  );
};

export default ErrorMessage;
