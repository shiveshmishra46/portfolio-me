// -----------------Device Detection Modal-----------------
// Simplified modal for performance mode selection
import { useDevice } from '../context/DeviceContext';

const DeviceDetectionModal = () => {
  const { setPerformanceMode, isModalOpen, setIsModalOpen } = useDevice();
  
  if (!isModalOpen) return null;
  
  const handleModeSelect = (mode) => {
    setPerformanceMode(mode);
    setIsModalOpen(false);
    window.location.reload(); // Force reload to apply changes
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-11/12 p-6 animate-fadeIn shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to My Portfolio</h2>
        
        <div className="bg-gray-800 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <h3 className="text-white font-semibold mb-2">Important Instructions:</h3>
          <ul className="text-gray-300 list-disc pl-5 space-y-1">
            <li>For <span className="text-yellow-400">low-end devices</span> or <span className="text-yellow-400">mobile phones</span>, choose <span className="font-bold text-green-400">Balanced Mode</span></li>
            <li>For <span className="text-yellow-400">high-end devices</span> and <span className="text-yellow-400">best 3D experience</span>, select <span className="font-bold text-blue-400">Ultra Mode</span></li>
            <li>You can change this setting anytime from the settings panel</li>
          </ul>
        </div>
        
        <p className="text-gray-300 mb-4 font-medium">
          Select the mode that works best for your device:
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => handleModeSelect("balanced")}
            className="w-full bg-gray-800 hover:bg-green-600 text-white rounded-md p-4 text-left transition-all duration-300 hover:shadow-lg hover:shadow-green-900/30 border border-transparent hover:border-green-500"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="block font-medium text-lg">Balanced Mode</span>
                <span className="block text-sm text-gray-400">
                  Static images, minimal animations (low-end devices)
                </span>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => handleModeSelect("ultra")}
            className="w-full bg-gray-800 hover:bg-blue-600 text-white rounded-md p-4 text-left transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/30 border border-transparent hover:border-blue-500"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="block font-medium text-lg">Ultra Mode</span>
                <span className="block text-sm text-gray-400">
                  Full 3D models and animations (high-end devices)
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetectionModal;
// -----------------Device Detection Modal-----------------