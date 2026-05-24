import { Suspense } from "react";
import { AppShell } from "@/components/providers/AppShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientWidgets } from "@/components/layout/ClientWidgets";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { TechStack } from "@/components/sections/TechStack";
import { WhyCoreLogic } from "@/components/sections/WhyCoreLogic";
import { Contact } from "@/components/sections/Contact";

function ContactFallback() {
  return (
    <section id="contact" className="section-padding flex min-h-[400px] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-900 border-t-cyan-400" />
    </section>
  );
}

export default function Home() {
  return (
    <AppShell>
      <Navbar />
      <main className="relative overflow-hidden bg-[#0a0f1c]">
        <Hero />
        <Services />
        <Showcase />
        <TechStack />
        <WhyCoreLogic />
        <Suspense fallback={<ContactFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ClientWidgets />
    </AppShell>
  );
}
