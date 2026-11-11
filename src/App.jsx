import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        Diseñado y desarrollado por Frank Orono con React, Vite y Tailwind CSS · {new Date().getFullYear()}
      </footer>
    </>
  );
}
