// -----------------Performance Panel-----------------
// Simplified panel that ensures mode switching works
import { useState } from 'react';
import { useDevice } from '../context/DeviceContext';
import { Settings } from 'lucide-react';

const PerformancePanel = () => {
  const { performanceMode, setPerformanceMode } = useDevice();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed z-50 bottom-5 right-5">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg"
      >
        <Settings size={24} />
      </button>
      
      {/* Panel */}
      {isOpen && (
        <div className="absolute right-0 bottom-16 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4">
          <h3 className="text-white font-medium mb-3">Performance Settings</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => {
                setPerformanceMode("ultra");
                window.location.reload(); // Force reload to apply changes
              }}
              className={`w-full text-left px-4 py-2 rounded-md ${
                performanceMode === "ultra" 
                  ? "bg-blue-600" 
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <span className="text-white">Ultra Mode (3D)</span>
            </button>
            
            <button
              onClick={() => {
                setPerformanceMode("balanced");
                window.location.reload(); // Force reload to apply changes
              }}
              className={`w-full text-left px-4 py-2 rounded-md ${
                performanceMode === "balanced" 
                  ? "bg-green-600" 
                  : "bg-gray-800 hover:bg-green-800 hover:bg-opacity-50"
              }`}
            >
              <span className="text-white">Balanced Mode</span>
            </button>
            
            <button
              onClick={() => {
                setPerformanceMode("basic");
                window.location.reload(); // Force reload to apply changes
              }}
              className={`w-full text-left px-4 py-2 rounded-md ${
                performanceMode === "basic" 
                  ? "bg-yellow-600" 
                  : "bg-gray-800 hover:bg-yellow-800 hover:bg-opacity-50"
              }`}
            >
              <span className="text-white">Basic Mode (Static)</span>
            </button>
          </div>
          
          <p className="text-gray-400 text-xs mt-3">
            Changes will apply after page reload
          </p>
        </div>
      )}
    </div>
  );
};

export default PerformancePanel;
// -----------------Performance Panel-----------------