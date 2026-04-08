import Link from "next/link";
import Image from "next/image";

import type { CollectionItem } from "@/data/collection";
import { getCapImageDimensions } from "@/lib/utils";

interface ExpandCardProps {
  item: CollectionItem;
  baseFlex: number;
  activeId: number | null;
  onHover: (id: number | null) => void;
  height: string;
}

export default function ExpandCard({
  item,
  baseFlex,
  activeId,
  onHover,
  height,
}: ExpandCardProps) {
  const capDimensions = getCapImageDimensions(item.image);
  const isActive = activeId === item.id;
  const someActive = activeId !== null;
  const flexGrow = isActive
    ? baseFlex * 2
    : someActive
      ? baseFlex * 0.9
      : baseFlex;

  return (
    <div
      style={{
        flexGrow,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,
        transition: "flex-grow 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="flex max-w-200 flex-col"
    >
      <Link
        href={`/collection/${item.id}`}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl ${height}`}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image
            src="/Product_Bg.svg"
            alt=""
            width={680}
            height={680}
            aria-hidden
            className="h-170 w-170 max-w-none object-covber"
          />
        </div>

        <div className="absolute inset-2 overflow-hidden ">
          {capDimensions ? (
            <div className="flex h-full w-full items-center justify-center p-3">
              <Image
                src={item.image}
                alt={item.title}
                width={capDimensions.width}
                height={capDimensions.height}
                className="h-auto w-auto max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
            />
          )}
        </div>
      </Link>

      <p className="mt-4 px-1 text-center text-xs font-bold uppercase tracking-wide text-white lg:text-lg">
        {item.title}
      </p>
    </div>
  );
}
