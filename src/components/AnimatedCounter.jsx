// ---------------Main---------------
import React, { useState, useEffect, useRef } from 'react';
import { counterItems } from "../constants/index.js";
import CountUp from 'react-countup';
import { useDevice } from "../context/DeviceContext";

const AnimatedCounter = () => {
  // Access the device context
  const { performanceMode } = useDevice();
  
  // State to track when we should start counting
  const [key, setKey] = useState(0);
  
  // Use a ref to track previous performance mode
  const prevModeRef = useRef(null);
  // Keep track of last time we updated
  const lastUpdateRef = useRef(Date.now());
  
  // Force a re-render on mount AND on ANY change to performanceMode
  useEffect(() => {
    // Generate new key to force CountUp components to reset
    const now = Date.now();
    
    // Always force reset on first render
    if (prevModeRef.current === null || 
        // Or if mode has changed
        prevModeRef.current !== performanceMode || 
        // Or if it's been at least 500ms since last update (helps with first visit modal)
        now - lastUpdateRef.current > 500) {
        
      setKey(now);
      lastUpdateRef.current = now;
    }
    
    // Update previous mode reference
    prevModeRef.current = performanceMode;
    
    // Listen for custom event that DeviceDetectionModal might dispatch
    const handleModeChange = () => {
      setKey(Date.now());
    };
    
    window.addEventListener('performanceModeChanged', handleModeChange);
    
    // Dispatch our own event when this component mounts
    // This helps ensure counting works on first visit
    const event = new CustomEvent('animatedCounterMounted');
    window.dispatchEvent(event);
    
    return () => {
      window.removeEventListener('performanceModeChanged', handleModeChange);
    };
  }, [performanceMode]);
  
  // Additional effect to handle reloads and visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setKey(Date.now());
      }
    };
    
    // Listen for visibility changes (tab switching)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also trigger on initial load
    setKey(Date.now());
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return (
    <div id="counter" className="padding-x-lg xl: mt-0 mt-32">
        <div className="mx-auto grid-4-cols">
            {counterItems.map((item, index) => (
                <div key={`${item.label}-${index}`} className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
                    <div className="counter-number text-white text-5xl font-bold mb-2">
                    <CountUp 
                      key={`counter-${key}-${index}`}
                      suffix={item.suffix} 
                      end={item.value} 
                      duration={3}
                      start={0}
                      preserveValue={false}
                      delay={0}
                      redraw={true}
                    />
                    </div>
                    <div className="text-white-50 text-lg">{item.label}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AnimatedCounter;
//-------------Main------------