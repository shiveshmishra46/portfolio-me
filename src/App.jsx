//-------------------Main---------------------

// import Testimonials from "./sections/Testimonials.jsx";
// import Footer from "./sections/Footer.jsx";
// import Contact from "./sections/Contact.jsx";
// import TechStack from "./sections/TechStack.jsx";
// import ExperienceSection from "./sections/ExperienceSection";
// import Hero from "./sections/Hero.jsx";
// import Showcase from "./sections/Showcase.jsx";
// import LogoShowcase from "./sections/LogoShowcase.jsx";
// import Featurecards from "./sections/Featurecards.jsx";
// import Navbar from "./components/Navbar.jsx";

// const App = () => (
//   <>
//     <Navbar />
//     <Hero />
//     <Showcase />
//     <LogoShowcase />
//     <Featurecards />
//     <ExperienceSection />
//     <TechStack />
//     <Testimonials />
//     <Contact />
//     <Footer />
//   </>
// );
// export default App;

//-----------------Main-----------------

//-------------------Main---------------------

import { useState, useEffect } from "react";
import Testimonials from "./sections/Testimonials.jsx";
import Footer from "./sections/Footer.jsx";
import ExperienceSection from "./sections/ExperienceSection";
import Showcase from "./sections/Showcase.jsx";
import LogoShowcase from "./sections/LogoShowcase.jsx";
import Featurecards from "./sections/Featurecards.jsx";
import Navbar from "./components/Navbar.jsx";
import { DeviceProvider } from "./context/DeviceContext.jsx";
import OptimizedHero from "./sections/OptimizedHero.jsx";
import OptimizedTechStack from "./sections/OptimizedTechStack.jsx";
import OptimizedContact from "./sections/OptimizedContact.jsx";
import DeviceDetectionModal from "./components/DeviceDetectionModal.jsx";
import PerformancePanel from "./components/PerformancePanel.jsx";

const AppContent = () => {
  const [showModal, setShowModal] = useState(false);

  // This effect runs once when the component mounts (page loads/refreshes)
  useEffect(() => {
    // Check if mode was changed via panel
    const modeChangedViaPanel = sessionStorage.getItem('mode_changed_via_panel') === 'true';
    
    // Only show modal on true page refresh, not after panel change
    if (!modeChangedViaPanel) {
      // Always force balanced mode on fresh page load/refresh
      localStorage.setItem("performance_mode", "balanced");
      
      // Show device selection modal after a short delay
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1500); // 1.5 second delay
      
      return () => clearTimeout(timer); // Clean up the timer
    } else {
      // Clear the flag after using it
      sessionStorage.removeItem('mode_changed_via_panel');
    }
  }, []);

  // Pass the showModal state directly to DeviceDetectionModal
  return (
    <>
      <DeviceDetectionModal forceShow={showModal} onClose={() => setShowModal(false)} />
      <Navbar />
      <OptimizedHero />
      <Showcase />
      <LogoShowcase />
      <Featurecards />
      <ExperienceSection />
      <OptimizedTechStack />
      <Testimonials />
      <OptimizedContact />
      <Footer />
      <PerformancePanel />
    </>
  );
};

const App = () => (
  <DeviceProvider>
    <AppContent />
  </DeviceProvider>
);

export default App;

//-----------------Main-----------------