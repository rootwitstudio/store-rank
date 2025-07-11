import { CheckCircle, Shield, Crown, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  iconType?: "check" | "guard";
}

export function VerifiedTag({ className, size = "sm", iconType = "check" }: TagProps) {
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-medium rounded-full bg-green-100 text-green-800 border border-green-200",
      sizeStyles[size],
      className
    )}>
      {iconType === "guard" ? (
        <Shield className={iconSizes[size]} />
      ) : (
        <CheckCircle className={iconSizes[size]} />
      )}
      Verified
    </span>
  );
}

export function ClaimedTag({ className, size = "sm" }: TagProps) {
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200",
      sizeStyles[size],
      className
    )}>
      <BadgeCheck className={iconSizes[size]} />
      Claimed
    </span>
  );
}

export function PremiumTag({ className, size = "sm" }: TagProps) {
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-medium rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200",
      sizeStyles[size],
      className
    )}>
      <Crown className={iconSizes[size]} />
      Premium
    </span>
  );
}

// Combination tag for stores that are both verified and claimed
export function VerifiedClaimedTag({ className, size = "sm" }: TagProps) {
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-medium rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border border-green-200",
      sizeStyles[size],
      className
    )}>
      <CheckCircle className={iconSizes[size]} />
      <Shield className={iconSizes[size]} />
      Verified & Claimed
    </span>
  );
}

// Generic status tag for custom use
interface StatusTagProps extends TagProps {
  status: string;
  variant?: "success" | "info" | "warning" | "error" | "default";
  icon?: React.ReactNode;
}

export function StatusTag({ 
  status, 
  variant = "default", 
  icon, 
  className, 
  size = "sm" 
}: StatusTagProps) {
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const variantStyles = {
    success: "bg-green-100 text-green-800 border-green-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200"
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-medium rounded-full border",
      sizeStyles[size],
      variantStyles[variant],
      className
    )}>
      {icon}
      {status}
    </span>
  );
} 