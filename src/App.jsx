import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SmoothScroll, { useLenis } from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

function Sitio() {
  const [listo, setListo] = useState(false);
  const lenis = useLenis();

  // Sin scroll mientras carga el preloader
  useEffect(() => {
    if (!lenis) return;
    listo ? lenis.start() : lenis.stop();
  }, [listo, lenis]);

  return (
    <>
      <AnimatePresence>{!listo && <Preloader key="preloader" alTerminar={() => setListo(true)} />}</AnimatePresence>
      <Background />
      <Cursor />
      <Navbar listo={listo} />
      <main className="overflow-x-clip">
        <Hero listo={listo} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <Sitio />
    </SmoothScroll>
  );
}
