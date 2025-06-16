import React, { createContext, useContext, useState, useEffect } from "react";

// Create the DeviceContext
const DeviceContext = createContext();

// Define the constants
const PERFORMANCE_MODE_KEY = "performance_mode";
const DEFAULT_PERFORMANCE_MODE = "balanced";

export const DeviceProvider = ({ children }) => {
  // Initialize state with default value
  const [performanceMode, setPerformanceMode] = useState(DEFAULT_PERFORMANCE_MODE);
  const [showDeviceSelect, setShowDeviceSelect] = useState(false);
  
  // On initial load or refresh, check if this is a fresh page load
  useEffect(() => {
    // Not a fresh reload, so try to load saved performance mode
    const savedMode = localStorage.getItem(PERFORMANCE_MODE_KEY);
    if (savedMode) {
      setPerformanceMode(savedMode);
    }
  }, []);

  // Save performance mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(PERFORMANCE_MODE_KEY, performanceMode);
  }, [performanceMode]);

  // Function to update performance mode
  const updatePerformanceMode = (mode) => {
    setPerformanceMode(mode);
  };

  // Context value
  const contextValue = {
    performanceMode,
    updatePerformanceMode,
    showDeviceSelect,
    setShowDeviceSelect
  };

  // Provide the context value to children
  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  );
};

// Custom hook to use the DeviceContext
export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

// Make sure this line exists and is not commented out
export default DeviceContext;