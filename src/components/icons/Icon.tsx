import type React from "react";

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, className, style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <use href={`/icons/symbols.svg#${name}`} />
    </svg>
  );
}
