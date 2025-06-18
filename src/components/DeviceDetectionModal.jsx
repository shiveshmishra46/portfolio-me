import React, { useState, useEffect } from "react";
import { useDevice } from "../context/DeviceContext";

// Add forceShow and onClose props
const DeviceDetectionModal = ({ forceShow = false, onClose = () => {} }) => {
  // Local state for controlling the modal visibility
  const [localShowModal, setLocalShowModal] = useState(false);
  const { updatePerformanceMode } = useDevice();

  // Effect to handle external visibility control
  useEffect(() => {
    if (forceShow) {
      setLocalShowModal(true);
    }
  }, [forceShow]);
  
  // Close modal function
  const closeModal = () => {
    setLocalShowModal(false);
    onClose(); // Call the parent's callback
  };

  // Handle mode selection
  const setPerformanceMode = (mode) => {
    updatePerformanceMode(mode);
    closeModal();
  };

  // If modal isn't showing, don't render anything
  if (!localShowModal && !forceShow) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <div className="bg-black-200 rounded-2xl p-6 max-w-md w-full mx-4" style={{ animation: "0.3s ease-out 0s 1 normal forwards running fadeIn" }}>
        <h2 className="text-2xl font-bold text-white-50 mb-4">Select Experience Mode</h2>
        <p className="text-white-50 mb-6">Choose the mode that best suits your device:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setPerformanceMode("balanced")} 
            className="bg-black-100 hover:bg-black-50 transition-colors duration-300 p-4 rounded-lg border border-blue-900"
          >
            <div className="text-xl font-medium mb-2 text-white">Balanced Mode ||Static||</div>
            <p className="text-sm text-blue-50">Best for "Base" to "Medium" segment of Devices</p>
          </button>
          
          <button 
            onClick={() => setPerformanceMode("ultra")} 
            className="bg-black-100 hover:bg-black-50 transition-colors duration-300 p-4 rounded-lg border border-black-50"
          >
            <div className="text-xl font-medium mb-2">Ultra Mode ||3D||</div>
            <p className="text-sm text-blue-50">Best for "High" and "Premium" segment of Devices</p>
          </button>
        </div>
        
        <button 
          onClick={closeModal} 
          className="mt-6 text-blue-50 hover:text-white transition-colors duration-300 w-full"
        >
          Continue with current settings
        </button>
      </div>
    </div>
  );
};

export default DeviceDetectionModal;