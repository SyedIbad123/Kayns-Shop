import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  className?: string;
  light?: boolean;
}

export default function SectionTitle({
  title,
  className,
  light,
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-7xl",
        light ? "text-[#143d59]" : "text-gray-900",
        className,
      )}
    >
      {title}
    </h2>
  );
}
