// -----------------Optimized Hero Section-----------------
// Simplified version for immediate functionality
import { words } from "../constants";
import Button from "../components/Button";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import OptimizedHeroExperience from "../components/models/HeroModels/OptimizedHeroExperience";
import { useDevice } from "../context/DeviceContext";

const OptimizedHero = () => {
  const { performanceMode } = useDevice();

  useGSAP(() => {
    // Simpler animation for all modes to ensure it works
    gsap.fromTo('.hero-text h1',
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.1,
        ease: "power1.out" 
      }
    );
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background"/>
      </div>
      <div className="hero-layout">
        {/*LEFT: HERO CONTENT*/}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shivesh
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word) => (
                      <span key={word.text} className="flex items-center md:gap-1 gap-1 pb-2">
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-6 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>Problem Solver &</h1>
              <h1>Full-Stack Developer</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'm Shivesh, a developer based in Greater Noida with a passion for code.
            </p>
            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text="See my Work"
            />
          </div>
        </header>
        {/*RIGHT: 3D MODEL*/}
        <figure>
          <div className="hero-3d-layout">
            <OptimizedHeroExperience />
          </div>
        </figure>
      </div>
      <AnimatedCounter />
    </section>
  )
};

export default OptimizedHero;
// -----------------Optimized Hero Section-----------------