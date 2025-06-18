// -----------------Performance Panel-----------------
// Enhanced panel with attractive animations and better UX
import { useState, useRef, useEffect } from 'react';
import { useDevice } from '../context/DeviceContext';
import { Settings } from 'lucide-react';
import gsap from 'gsap';

const PerformancePanel = () => {
  const { performanceMode, updatePerformanceMode } = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle panel animation
  useEffect(() => {
    if (isOpen && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      
      gsap.to(buttonRef.current, {
        rotate: 180,
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (!isOpen && buttonRef.current) {
      gsap.to(buttonRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isOpen]);

  const handleModeChange = (mode) => {
    updatePerformanceMode(mode);
    // Add flag to indicate mode was changed via panel
    sessionStorage.setItem('mode_changed_via_panel', 'true');
    setIsOpen(false);
  };

  return (
    <div className="fixed z-50 bottom-5 right-5">
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Performance Settings"
      >
        <Settings size={24} />
      </button>
      
      {/* Panel */}
      {isOpen && (
        <div 
          ref={panelRef}
          className="absolute right-0 bottom-16 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-5"
        >
          <h3 className="text-white font-medium text-lg mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Performance Settings
          </h3>
          
          <div className="bg-gray-800 border-l-4 border-blue-500 p-3 mb-4 rounded text-xs text-gray-300">
            <p className="font-medium text-white mb-1">Mode Selection Guide:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>For low-end devices choose <span className="font-bold text-green-400">Balanced</span></li>
              <li>For high-end devices and best 3D experience select <span className="font-bold text-blue-400">Ultra</span></li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => handleModeChange("balanced")}
              className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 flex items-center ${
                performanceMode === "balanced" 
                  ? "bg-green-600 shadow-md shadow-green-900/50" 
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Balanced Mode (Static)</span>
            </button>
            
            <button
              onClick={() => handleModeChange("ultra")}
              className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 flex items-center ${
                performanceMode === "ultra" 
                  ? "bg-blue-600 shadow-md shadow-blue-900/50" 
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white">Ultra Mode (3D)</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
            <p className="text-gray-400 text-xs">
              Changes apply immediately
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformancePanel;
// -----------------Performance Panel-----------------