"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SectionLink({
  id,
  className,
  children,
  onClick,
  current = false,
}: {
  id: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  current?: boolean;
}) {
  const pathname = usePathname();
  const href = pathname === "/" ? `#${id}` : `/#${id}`;

  return (
    <a href={href} className={className} onClick={onClick} aria-current={current ? "true" : undefined}>
      {children}
    </a>
  );
}
