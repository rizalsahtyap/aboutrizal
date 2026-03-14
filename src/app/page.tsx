import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Services from "@/components/Services";
import Hobbies from "@/components/Hobbies";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      <Preloader />
      <Navbar />

      <SequenceScroll />

      {/* Wrapping all other sections with -mt-[100vh] and relative z-10 as requested */}
      <div className="relative z-10 -mt-[100vh] bg-[#050505] rounded-t-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <Projects />
        <About />
        <Services />
        <Hobbies />
        <Marquee />
        <Contact />
      </div>
    </main>
  );
}
