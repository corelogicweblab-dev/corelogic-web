import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { TechStack } from "@/components/sections/TechStack";
import { WhyCoreLogic } from "@/components/sections/WhyCoreLogic";
import { Contact } from "@/components/sections/Contact";
import { LiveChat } from "@/components/ui/LiveChat";

function ContactFallback() {
  return (
    <section id="contact" className="section-padding flex min-h-[400px] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#00F5FF]/20 border-t-[#00F5FF]" />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
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
      <LiveChat />
    </>
  );
}
