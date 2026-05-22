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
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl transition-all group-hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
        style={{
          width: dim.box,
          height: dim.box,
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(224,242,254,0.8))",
          border: "1px solid rgba(0, 212, 255, 0.4)",
          boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)",
        }}
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
          <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-slate-900">
            CoreLogic
          </span>
          <span className="block font-[family-name:var(--font-orbitron)] text-[10px] font-bold tracking-[0.25em] text-cyan-600 uppercase">
            {SITE.tagline}
          </span>
        </div>
      )}
    </Link>
  );
}
