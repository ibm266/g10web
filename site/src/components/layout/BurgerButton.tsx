"use client";

type Props = {
  open: boolean;
  onClick: () => void;
  className?: string;
  light?: boolean;
};

export function BurgerButton({ open, onClick, className = "", light = false }: Props) {
  const bar = light ? "bg-accent-deep" : "bg-text";

  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-nav-drawer"
      onClick={onClick}
      className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-transform duration-200 active:scale-95 ${className}`}
    >
      <span className="relative flex h-4 w-4 flex-col items-center justify-center">
        <span
          className={`absolute block h-[1.5px] w-4 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${bar} ${open ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0"}`}
        />
        <span
          className={`absolute block h-[1.5px] w-4 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${bar} ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        />
        <span
          className={`absolute block h-[1.5px] w-4 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${bar} ${open ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0"}`}
        />
      </span>
    </button>
  );
}
