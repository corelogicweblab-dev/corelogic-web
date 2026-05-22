import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { SITE, TEL_LINK, MAILTO_LINK } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative border-t border-[#00F5FF]/10 bg-[#050816]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent" />
      <div className="section-padding mx-auto max-w-[1600px] py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 max-w-sm text-sm text-[#94A3B8]">
              Next-generation AI infrastructure and systems engineering for
              enterprise and government.
            </p>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <a href={MAILTO_LINK} className="text-[#00F5FF] hover:underline">
                {SITE.email}
              </a>
              <a href={TEL_LINK} className="text-[#94A3B8] hover:text-[#00F5FF]">
                {SITE.phone}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-orbitron)] text-xs tracking-widest text-[#00F5FF] uppercase">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94A3B8] transition-colors hover:text-[#00F5FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-orbitron)] text-xs tracking-widest text-[#00F5FF] uppercase">
              Connect
            </h4>
            <ul className="mt-4 space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#94A3B8] transition-colors hover:text-[#00F5FF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#00F5FF]/10 pt-8 md:flex-row">
          <p className="text-xs text-[#94A3B8]">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-[0.2em] text-[#00F5FF]/60 uppercase">
            Engineered for the Future
          </p>
        </div>
      </div>
    </footer>
  );
}
