import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

type Props = {
  className?: string;
  height?: number;
  onClick?: () => void;
};

/** G10 Studio wordmark — scraped from live site */
export function SiteLogo({ className = "", height = 36, onClick }: Props) {
  return (
    <Link
      href={ROUTES.home}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <Image
        src="/images/g10-logo.png"
        alt="G10 Studio"
        width={Math.round(height * 2.8)}
        height={height}
        className="logo-wordmark h-auto w-auto max-h-[38px] md:max-h-[42px]"
        priority
      />
    </Link>
  );
}
