// -----------------Optimized Hero Experience-----------------
import { useDevice } from '../../../context/DeviceContext';
import HeroExperience from './HeroExperience';

const OptimizedHeroExperience = () => {
  const { performanceMode } = useDevice();
  
  // Direct rendering based on performance mode - no transitions
  if (performanceMode === "basic") {
    return (
      <div className="w-full h-full">
        <img 
          src="/images/hero-room-static.png" 
          alt="Hero Room" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }
  
  // For ultra and balanced modes, return the 3D component
  return <HeroExperience />;
};

export default OptimizedHeroExperience;
// -----------------Optimized Hero Experience-----------------