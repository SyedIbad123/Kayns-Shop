import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  className?: string;
  light?: boolean;
}

export default function SectionTitle({ title, className, light }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-2xl font-bold tracking-wide md:text-3xl lg:text-4xl",
        light ? "text-white" : "text-gray-900",
        className
      )}
    >
      {title}
    </h2>
  );
}
