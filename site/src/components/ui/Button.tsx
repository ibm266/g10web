import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#f5efe6] hover:bg-accent-deep hover:text-[#f5efe6] animate-cta-ring",
  outline:
    "border border-border bg-bg text-text hover:border-accent hover:text-accent hover:bg-bg",
  "outline-light":
    "border border-white/50 bg-white/12 text-[#f5efe6] backdrop-blur-md hover:bg-white/20 hover:text-[#f5efe6]",
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: Props) {
  const base =
    "inline-flex h-[52px] items-center justify-center rounded-full px-6 text-[15px] font-medium tracking-wide transition-colors duration-200";

  const classes = `${base} ${variants[variant]} ${className} ${disabled ? "pointer-events-none opacity-60" : ""}`;

  if (href) {
    return (
      <Link href={href} data-ui="button" className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} data-ui="button" onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform hover:translate-x-1 ${className}`}
    >
      {children} →
    </Link>
  );
}
