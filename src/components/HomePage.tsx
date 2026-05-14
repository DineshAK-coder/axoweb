import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Process from "./Process";
import Explorations from "./Explorations";
import Footer from "./Footer";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleProjectRequest = () => {
    navigate("/contact");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: "opacity 0.5s ease-out" 
        }}
      >
        <Navbar onProjectRequest={handleProjectRequest} />
        <div>
          <Hero onProjectRequest={handleProjectRequest} />
          <About />
          <Services />
          <Process />
          <Explorations />
          <Footer onProjectRequest={handleProjectRequest} />
        </div>
      </div>
    </>
  );
}
