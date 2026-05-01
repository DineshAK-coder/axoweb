/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Explorations from "./components/Explorations";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import ProjectDialog from "./components/ProjectDialog";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  return (
    <main className="relative bg-bg min-h-screen">
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
        <Navbar onProjectRequest={() => setIsProjectDialogOpen(true)} />
        <div>
          <Hero onProjectRequest={() => setIsProjectDialogOpen(true)} />
          <About />
          <Services />
          <Process />
          <Explorations />
          <Reviews />
          <Footer onProjectRequest={() => setIsProjectDialogOpen(true)} />
        </div>
      </div>

      <ProjectDialog 
        isOpen={isProjectDialogOpen} 
        onClose={() => setIsProjectDialogOpen(false)} 
      />
      <Chatbot />
    </main>
  );
}
