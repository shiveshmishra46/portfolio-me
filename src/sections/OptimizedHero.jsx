// -----------------Optimized Hero Section-----------------
import { words } from "../constants";
import Button from "../components/Button";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useEffect, useState, useRef } from 'react';
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import OptimizedHeroExperience from "../components/models/HeroModels/OptimizedHeroExperience";
import { useDevice } from "../context/DeviceContext";

const OptimizedHero = () => {
  const { performanceMode } = useDevice();
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Add refs for direct targeting of elements
  const wrapperRef = useRef(null);
  const nameItemsRef = useRef([]);
  
  // Ref to track animation state
  const animationRef = useRef(null);
  // Track previous mode to detect changes
  const prevModeRef = useRef(null);
  // Force re-animation key
  const [animationKey, setAnimationKey] = useState(Date.now());

  // Reset refs when needed
  useEffect(() => {
    nameItemsRef.current = nameItemsRef.current.slice(0, words.length);
  }, []);

  // Show instruction for 12 seconds in ultra mode
  useEffect(() => {
    // Check if the mode is "ultra" (from PerformancePanel)
    if (performanceMode === "ultra") {
      setShowInstructions(true);
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 12000);
      
      return () => clearTimeout(timer);
    }
  }, [performanceMode]);
  
  // Force re-animation on mode switch or reload
  useEffect(() => {
    // Force re-animation if mode changed or on initial render
    if (prevModeRef.current !== performanceMode || prevModeRef.current === null) {
      // Update animation key to force GSAP to re-run
      setAnimationKey(Date.now());
    }
    
    // Update previous mode reference
    prevModeRef.current = performanceMode;
    
    // Listen for custom events from modal or page visibility changes
    const handleRerender = () => {
      setAnimationKey(Date.now());
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setAnimationKey(Date.now());
      }
    };
    
    window.addEventListener('performanceModeChanged', handleRerender);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('performanceModeChanged', handleRerender);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [performanceMode]);

  useGSAP(() => {
    // Only run if we haven't animated this cycle yet
    if (animationRef.current !== animationKey) {
      // First, reset all animations by setting opacity to 0
      gsap.set('.hero-text h1', { opacity: 0, y: 20 });
      
      // Also reset nameItems
      if (nameItemsRef.current.length) {
        nameItemsRef.current.forEach(item => {
          if (item) gsap.set(item, { opacity: 0, x: -20 });
        });
      }
      
      // Set up the timeline for the text animation
      const timeline = gsap.timeline();
      
      // Animate each line of text sequentially
      timeline.fromTo('.hero-text h1',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out" 
        }
      );
      
      // Animate each name item individually using the refs
      if (nameItemsRef.current.length) {
        // Make sure all name items are included in the animation
        timeline.to(nameItemsRef.current, {
          opacity: 1,
          x: 0, 
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.7)"
        }, "-=0.4");
      }
      
      // Mark this animation cycle as completed
      animationRef.current = animationKey;
    }
  }, [animationKey]); // Re-run when animationKey changes

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background"/>
      </div>
      <div className="hero-layout">
        {/*LEFT: HERO CONTENT*/}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shivesh
                <span className="slide">
                  <span className="wrapper" ref={wrapperRef}>
                    {words.map((word, index) => (
                      <span 
                        key={`${word.text}-${index}`} 
                        className="flex items-center md:gap-1 gap-1 pb-2"
                        ref={el => nameItemsRef.current[index] = el}
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-6 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>Problem Solver &</h1>
              <h1>Full-Stack Developer</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
            "Hi, I'm <span className="font-bold animated-text">Shivesh</span>, a developer based in Greater Noida with a passion for code. 
            <br className="hidden md:block" />
            Equipped with a <span className="font-bold animated-text">Problem - Solving</span> and <span className="font-bold animated-text">Competitive - Programming</span> "CP"
            <br className="hidden md:block" />  
            mindset. I approach complex issues with <span className="font-bold animated-text">Algorithmic</span> precision and make
            <br className="hidden md:block" />
            creative solutions. I <span className="font-bold animated-text">specialized</span> in <span className="font-bold animated-text">Full-Stack Development</span> with expertise
            <br className="hidden md:block" />
            in <span className="font-bold animated-text">ReactJS</span>, <span className="font-bold animated-text">NodeJS</span>, and <span className="font-bold animated-text">modern web technologies</span>. I turn <span className="font-bold animated-text">ideas</span> into <span className="font-bold animated-text">int-</span>
            <br className="hidden md:block" />
            <span className="font-bold animated-text">eractive experiences</span>. The website shouldn't just exist <span className="font-bold animated-text">it should perform.</span>"
            </p>
            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text=" Click to scroll & See my Work"
            />
          </div>
        </header>
        {/*RIGHT: 3D MODEL*/}
        <figure>
          <div className="hero-3d-layout">
            <OptimizedHeroExperience />
          </div>
        </figure>
      </div>
      <AnimatedCounter />
      
      {/* Ultra mode instruction message */}
      {(performanceMode === "ultra") && showInstructions && (
        <div 
          className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 
            bg-black/70 text-white px-4 py-2 rounded-lg text-center max-w-xs"
        >
          <p className="text-sm">
            Scroll from the name and about area to move down or click on "See my Work"
          </p>
        </div>
      )}
    </section>
  )
};

export default OptimizedHero;
// -----------------Optimized Hero Section-----------------