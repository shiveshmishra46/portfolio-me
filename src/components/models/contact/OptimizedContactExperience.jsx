// -----------------Optimized Contact Experience-----------------
// Simplified direct renderer with no transitions to ensure functionality
import { useDevice } from '../../../context/DeviceContext';
import ContactExperience from './ContactExperience';

const OptimizedContactExperience = () => {
  const { performanceMode } = useDevice();
  
  // Direct rendering based on performance mode - no transitions
  if (performanceMode === "balanced") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/images/contact-computer-static.png" 
          alt="Contact Computer" 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Failed to load contact computer static image");
          }}
        />
      </div>
    );
  }
  
  // For ultra mode only, return the 3D component
  return <ContactExperience />;
};

export default OptimizedContactExperience;
// -----------------Optimized Contact Experience-----------------