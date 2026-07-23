import React from "react";
import Button from "./subComponents/Button";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isButtonDisabled?: boolean;
  className?: string;
}

const Form = ({
  children,
  onSubmit,
  buttonText,
  isButtonDisabled = false,
  className = "mt-8 space-y-6",
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}

      <Button
        type="submit"
        disabled={isButtonDisabled}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;