// -----------------Optimized TechStack Section-----------------
// With simplified, reliable hover effects for all devices
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons, techStackImgs } from "../constants"; 
import { useDevice } from "../context/DeviceContext";
import OptimizedTechIconExperience from "../components/models/tech_logos/OptimizedTechIconExperience";

const OptimizedTechStack = () => {
  const { performanceMode } = useDevice();
  
  // Use techStackImgs instead of techStackIcons for basic mode
  const techItems = performanceMode === "basic" ? techStackImgs : techStackIcons;

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
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  {performanceMode === "basic" ? (
                    // Directly use the image in basic mode
                    <img src={techItem.imgPath} alt={techItem.name} className="w-full h-full object-contain" />
                  ) : (
                    // Use the 3D component in other modes
                    <OptimizedTechIconExperience model={techItem} />
                  )}
                </div>
                <div className="padding-x w-full">
                  <p className="tech-name">{techItem.name}</p>
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