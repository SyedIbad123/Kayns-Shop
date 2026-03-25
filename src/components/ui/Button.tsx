import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-brand-red text-white hover:bg-red-700 focus:ring-red-500":
            variant === "primary",
          "bg-white text-dark-blue hover:bg-gray-100 focus:ring-gray-300":
            variant === "secondary",
          "border-2 border-white text-white hover:bg-white/10 focus:ring-white":
            variant === "outline",
        },
        {
          "px-4 py-1.5 text-sm": size === "sm",
          "px-6 py-2.5 text-base": size === "md",
          "px-8 py-3 text-lg": size === "lg",
          "px-12 py-3 text-lg": size === "xl",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
