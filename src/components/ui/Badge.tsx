import React from "react";

export type BadgeVariant =
  | "eligible"
  | "warning"
  | "error"
  | "neutral"
  | "primary"
  | "verified"
  | "draft";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  children,
  className = "",
  size = "md",
}) => {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs font-medium" : "px-2.5 py-1 text-xs font-semibold";

  let colorClasses = "bg-slate-100 text-slate-700 border-slate-200";

  switch (variant) {
    case "eligible":
    case "verified":
      colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-300";
      break;
    case "warning":
      colorClasses = "bg-amber-50 text-amber-800 border-amber-300";
      break;
    case "error":
      colorClasses = "bg-rose-50 text-rose-800 border-rose-300";
      break;
    case "primary":
      colorClasses = "bg-blue-50 text-blue-900 border-blue-200";
      break;
    case "draft":
      colorClasses = "bg-slate-100 text-slate-800 border-slate-300";
      break;
    case "neutral":
    default:
      colorClasses = "bg-slate-50 text-slate-700 border-slate-200";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border ${colorClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
};
