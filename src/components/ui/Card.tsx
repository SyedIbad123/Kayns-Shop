import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg bg-[#F3F4F6] shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
