import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
 
}) => {
  return (
    <button
      className={`rounded-full cursor-pointer px-6 py-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
 