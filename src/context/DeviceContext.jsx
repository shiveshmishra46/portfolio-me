// -----------------Device Detection Context-----------------
// This context provides device capability detection and performance mode settings
// throughout the application

import { createContext, useState, useEffect, useContext } from "react";

// Create context with default values
export const DeviceContext = createContext({
  deviceCapability: "detecting", // possible values: "detecting", "high", "medium", "low"
  performanceMode: "auto", // possible values: "ultra", "balanced", "auto"
  isFirstVisit: true,
  setPerformanceMode: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export const DeviceProvider = ({ children }) => {
  // Main states for device detection and performance modes
  const [deviceCapability, setDeviceCapability] = useState("detecting");
  const [performanceMode, setPerformanceMode] = useState("auto");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if this is user's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio-visited");
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      setIsModalOpen(true); // Open modal on first visit
      localStorage.setItem("portfolio-visited", "true");
    }

    // Try to get saved performance mode
    const savedMode = localStorage.getItem("portfolio-performance-mode");
    if (savedMode) {
      setPerformanceMode(savedMode);
    }
  }, []);

  // Detect device capability
  useEffect(() => {
    const detectDeviceCapability = () => {
      // Navigator detection
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Get CPU/GPU information if available
      let cpuCores = navigator.hardwareConcurrency || 0;
      
      // Check operating system
      const isMacOS = userAgent.includes("mac os");
      const isIOS = userAgent.includes("iphone") || userAgent.includes("ipad");
      const isHighEndWindows = 
        userAgent.includes("windows") && 
        ((cpuCores >= 4) || userAgent.includes("win64"));
      
      // Device memory detection (if available)
      const deviceMemory = navigator.deviceMemory || 0; // In GB
      
      // Mobile detection
      const isAndroid = userAgent.includes("android");
      
      // GPU detection (partial - not reliable in all browsers)
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      let gpuInfo = "";
      
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
      
      // Performance check using a simple benchmark
      const startTime = performance.now();
      let testValue = 0;
      for (let i = 0; i < 1000000; i++) {
        testValue += Math.sqrt(i);
      }
      const endTime = performance.now();
      const benchmarkScore = endTime - startTime;
      
      // Determine device capability based on collected data
      if (
        // High-end devices
        isMacOS || 
        isIOS || 
        isHighEndWindows || 
        deviceMemory >= 6 || 
        (isAndroid && deviceMemory >= 6) ||
        gpuInfo.includes("nvidia") || 
        gpuInfo.includes("amd") ||
        benchmarkScore < 100 ||
        cpuCores >= 8
      ) {
        setDeviceCapability("high");
      } else if (
        // Medium devices
        cpuCores >= 4 || 
        deviceMemory >= 4 || 
        (isAndroid && deviceMemory >= 4) ||
        benchmarkScore < 200
      ) {
        setDeviceCapability("medium");
      } else {
        // Low-end devices
        setDeviceCapability("low");
      }
    };

    // Run detection after a short delay
    const timer = setTimeout(detectDeviceCapability, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Set performanceMode based on deviceCapability if mode is "auto"
  useEffect(() => {
    if (performanceMode === "auto" && deviceCapability !== "detecting") {
      switch (deviceCapability) {
        case "high":
          setPerformanceMode("ultra");
          break;
        case "medium":
          setPerformanceMode("balanced");
          break;
        case "low":
          setPerformanceMode("balanced");
          break;
        default:
          setPerformanceMode("balanced");
      }
    }
  }, [deviceCapability, performanceMode]);

  // Handle manual performance mode change
  const handlePerformanceModeChange = (mode) => {
    setPerformanceMode(mode);
    localStorage.setItem("portfolio-performance-mode", mode);
  };

  return (
    <DeviceContext.Provider
      value={{
        deviceCapability,
        performanceMode,
        isFirstVisit,
        setPerformanceMode: handlePerformanceModeChange,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

// Custom hook for using the DeviceContext
export const useDevice = () => useContext(DeviceContext);
// -----------------Device Detection Context-----------------