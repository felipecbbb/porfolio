import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Marquee text="desarrollo · diseño · estrategia" />
      <Services />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
