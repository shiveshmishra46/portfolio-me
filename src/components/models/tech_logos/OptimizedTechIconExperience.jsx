// -----------------Optimized Tech Icon Experience-----------------
// Using the same structure as the commented-out code
import { useDevice } from '../../../context/DeviceContext';
import TechIconCardExperience from './TechIconCardExperience';

const OptimizedTechIconExperience = ({ model }) => {
  const { performanceMode } = useDevice();
  
  // Direct static image for basic mode
  if (performanceMode === "basic") {
    return (
      <div className="w-full h-full">
        <img 
          src={model.imgPath} // Using the imgPath directly from the model
          alt={model.name} 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
  
  // For ultra and balanced modes, return the 3D component
  return <TechIconCardExperience model={model} />;
};

export default OptimizedTechIconExperience;
// -----------------Optimized Tech Icon Experience-----------------