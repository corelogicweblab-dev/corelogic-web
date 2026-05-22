import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { box: 40, image: 36 },
  md: { box: 48, image: 44 },
  lg: { box: 64, image: 58 },
};

export function Logo({ showText = true, size = "md", className = "" }: LogoProps) {
  const dim = sizes[size];

  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <div
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#00F5FF]/30 bg-[#0B1120] shadow-[0_0_20px_rgba(0,245,255,0.15)] transition-all group-hover:border-[#00F5FF]/60 group-hover:shadow-[0_0_32px_rgba(0,245,255,0.25)]"
        style={{ width: dim.box, height: dim.box }}
      >
        <Image
          src={SITE.logoSrc}
          alt={`${SITE.name} logo`}
          width={dim.image}
          height={dim.image}
          className="h-auto w-auto max-h-[90%] max-w-[90%] object-contain"
          priority
          unoptimized
        />
      </div>
      {showText && (
        <div className="hidden min-w-0 sm:block">
          <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold tracking-wide text-[#F8FAFC]">
            CoreLogic
          </span>
          <span className="block font-[family-name:var(--font-orbitron)] text-[10px] tracking-[0.25em] text-[#00F5FF] uppercase">
            {SITE.tagline}
          </span>
        </div>
      )}
    </Link>
  );
}
