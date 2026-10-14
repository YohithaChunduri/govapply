import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold tracking-tight rounded-none select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black transition-all duration-100 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black";

  let sizeClasses = "px-4 py-2 text-sm min-h-[42px] gap-2 shadow-[3px_3px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000000]";
  if (size === "sm") {
    sizeClasses = "px-3 py-1.5 text-xs min-h-[34px] gap-1.5 shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#000000]";
  } else if (size === "lg") {
    sizeClasses = "px-6 py-3 text-base min-h-[48px] gap-2.5 shadow-[4px_4px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000000]";
  }

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "bg-[#000000] hover:bg-[#1a1a1a] text-white";
      break;
    case "secondary":
      variantClasses = "bg-[#ffffff] hover:bg-[#f3f4f6] text-black";
      break;
    case "accent":
      variantClasses = "bg-[#facc15] hover:bg-[#eab308] text-black";
      break;
    case "outline":
      variantClasses = "bg-transparent hover:bg-black/5 text-black";
      break;
    case "ghost":
      variantClasses = "bg-transparent border-transparent shadow-none hover:bg-black/5 text-black active:shadow-none active:translate-x-0 active:translate-y-0";
      break;
    case "danger":
      variantClasses = "bg-[#f87171] hover:bg-[#ef4444] text-black";
      break;
    case "success":
      variantClasses = "bg-[#86efac] hover:bg-[#4ade80] text-black";
      break;
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
