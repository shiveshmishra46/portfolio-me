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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-11/12 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Choose Performance Mode</h2>
        
        <p className="text-gray-300 mb-4">
          Select the best mode for your device:
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => handleModeSelect("ultra")}
            className="w-full bg-gray-800 hover:bg-blue-600 text-white rounded-md p-4 text-left"
          >
            <span className="block font-medium">Ultra Mode</span>
            <span className="block text-sm text-gray-400">
              Full 3D models and animations (high-end devices)
            </span>
          </button>
          
          <button
            onClick={() => handleModeSelect("balanced")}
            className="w-full bg-gray-800 hover:bg-green-600 text-white rounded-md p-4 text-left"
          >
            <span className="block font-medium">Balanced Mode</span>
            <span className="block text-sm text-gray-400">
              Optimized performance (medium devices)
            </span>
          </button>
          
          <button
            onClick={() => handleModeSelect("basic")}
            className="w-full bg-gray-800 hover:bg-yellow-600 text-white rounded-md p-4 text-left"
          >
            <span className="block font-medium">Basic Mode</span>
            <span className="block text-sm text-gray-400">
              Static images, minimal animations (low-end devices)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetectionModal;
// -----------------Device Detection Modal-----------------