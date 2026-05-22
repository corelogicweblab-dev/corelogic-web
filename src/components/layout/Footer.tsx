import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { SITE, TEL_LINK, CONTACT_HREF } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative border-t border-cyan-400/20 bg-white/60 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      <div className="section-padding relative mx-auto max-w-[1600px] py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 max-w-sm text-sm text-slate-600">
              Next-generation AI infrastructure and systems engineering for enterprise and government.
            </p>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <Link href={CONTACT_HREF} className="font-semibold text-cyan-700 hover:text-cyan-600">
                {SITE.email}
              </Link>
              <a href={TEL_LINK} className="text-slate-600 hover:text-cyan-600">
                {SITE.phone}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-orbitron)] text-[10px] font-bold tracking-[0.25em] text-cyan-600 uppercase">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-cyan-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-orbitron)] text-[10px] font-bold tracking-[0.25em] text-cyan-600 uppercase">
              Connect
            </h4>
            <ul className="mt-4 space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 hover:text-cyan-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cyan-400/15 pt-8 md:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="font-[family-name:var(--font-orbitron)] text-[10px] font-bold tracking-[0.2em] text-cyan-600/80 uppercase">
            Engineered for the Future
          </p>
        </div>
      </div>
    </footer>
  );
}
