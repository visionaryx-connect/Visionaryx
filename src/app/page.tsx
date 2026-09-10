import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Clients from "@/components/sections/Clients";
import Services from "@/components/sections/Services";
import GenAI from "@/components/sections/GenAI";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <StickyCTA />
      <Hero />
      <Stats />
      <Clients />
      <Services />
      <GenAI />
      <Work />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
