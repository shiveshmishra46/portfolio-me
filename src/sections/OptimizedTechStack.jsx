// -----------------Optimized TechStack Section-----------------
// With simplified, reliable hover effects for all devices
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState, useRef } from "react";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons, techStackImgs } from "../constants"; 
import { useDevice } from "../context/DeviceContext";
import OptimizedTechIconExperience from "../components/models/tech_logos/OptimizedTechIconExperience";

const OptimizedTechStack = () => {
  const { performanceMode } = useDevice();
  const [activeCard, setActiveCard] = useState(null);
  const touchTimeoutRef = useRef(null);
  
  // Use techStackImgs instead of techStackIcons for balanced mode
  const techItems = performanceMode === "balanced" ? techStackImgs : techStackIcons;

  // Handle touch start event for mobile devices
  const handleTouchStart = (index) => {
    setActiveCard(index);
  };

  // Handle touch end event for mobile devices
  const handleTouchEnd = () => {
    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    
    // Set a timeout to reset the active card
    touchTimeoutRef.current = setTimeout(() => {
      setActiveCard(null);
    }, 1000); // Keep effect for 1 second after touch ends
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  // Simple animation for all performance modes
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: "#skills",
          start: "top bottom",
        }
      }
    );
  }, []);

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techItems.map((techItem, index) => (
            <div
              key={index}
              className={`tech-card overflow-hidden group relative xl:rounded-2xl rounded-lg transition-all duration-500 ${activeCard === index ? 'tech-card-active' : ''}`}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Colorful gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-400 opacity-0 group-hover:opacity-100 ${activeCard === index ? 'opacity-100' : ''} transition-opacity duration-700 rounded-2xl p-0.5`}>
                <div className="bg-black-100 w-full h-full rounded-2xl"></div>
              </div>
              
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-900/30 via-black/0 to-purple-900/30 opacity-0 group-hover:opacity-100 ${activeCard === index ? 'opacity-100' : ''} transition-all duration-500 rounded-2xl`}></div>
              
              {/* Content container */}
              <div className="relative z-10 flex flex-col items-center justify-center p-4 h-full">
                {/* Icon container with animation */}
                <div className={`tech-icon-wrapper group-hover:scale-105 ${activeCard === index ? 'scale-105 floating-animation' : ''} transition-all duration-500`}>
                  {performanceMode === "balanced" ? (
                    // Directly use the image in balanced mode
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src={techItem.imgPath} 
                        alt={techItem.name} 
                        className={`w-3/4 h-3/4 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] ${activeCard === index ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : ''} transition-all duration-500`}
                      />
                    </div>
                  ) : (
                    // Use the 3D component in other modes
                    <OptimizedTechIconExperience model={techItem} />
                  )}
                </div>
                
                {/* Text with animation */}
                <div className="w-full mt-4 overflow-hidden">
                  <p className={`tech-name text-center text-lg font-medium text-white-50 group-hover:text-white ${activeCard === index ? 'text-white scale-110' : ''} transition-all duration-500 transform group-hover:scale-110`}>
                    {techItem.name}
                  </p>
                  
                  {/* Animated underline */}
                  <div className={`h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto group-hover:w-1/2 ${activeCard === index ? 'w-1/2' : 'w-0'} transition-all duration-700 mt-2`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizedTechStack;
// -----------------Optimized TechStack Section-----------------