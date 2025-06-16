// -----------------Optimized Hero Experience-----------------
import { useDevice } from '../../../context/DeviceContext';
import HeroExperience from './HeroExperience';

const OptimizedHeroExperience = () => {
  const { performanceMode } = useDevice();
  
  // Show static image for balanced mode (formerly basic mode)
  if (performanceMode === "balanced") {
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
  
  // Only for ultra mode, return the 3D component
  return <HeroExperience />;
};

export default OptimizedHeroExperience;
// -----------------Optimized Hero Experience-----------------