//----------Main-----------

// import { useState, useEffect, useRef } from "react";
// import { navLinks } from "../constants";

// const Navbar = () => {
//   // track if the user has scrolled down the page
//   const [scrolled, setScrolled] = useState(false);
//   // state for modal visibility
//   const [showModal, setShowModal] = useState(false);
//   // state for closing animation
//   const [isClosing, setIsClosing] = useState(false);
//   // Reference for profile pic position
//   const [profilePosition, setProfilePosition] = useState({ top: 0, left: 0 });
//   // Modal content ref
//   const modalContentRef = useRef(null);

//   useEffect(() => {
//     // create an event listener for when the user scrolls
//     const handleScroll = () => {
//       // check if the user has scrolled down at least 10px
//       // if so, set the state to true
//       const isScrolled = window.scrollY > 10;
//       setScrolled(isScrolled);
//     };

//     // add the event listener to the window
//     window.addEventListener("scroll", handleScroll);

//     // cleanup the event listener when the component is unmounted
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Toggle modal visibility with animation
//   const openModal = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setProfilePosition({
//       top: rect.top,
//       left: rect.left
//     });
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       setShowModal(false);
//       setIsClosing(false);
//     }, 500); // Match this with CSS animation duration
//   };

//   return (
//     <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
//       <div className="inner">
//         {/* Profile pic container */}
//         <div className="profile-container">
//           <div className="profile-pic" onClick={(e) => openModal(e)}>
//             <img 
//               src="/images/profile.jpg" 
//               alt="Shivesh" 
//               className="profile-image" 
//             />
//           </div>
          
//           <a href="#hero" className="logo">
//             | ShiveshX.DEV |
//           </a>
//         </div>

//         <nav className="desktop">
//           <ul>
//             {navLinks.map(({ link, name }) => (
//               <li key={name} className="group">
//                 <a href={link}>
//                   <span>{name}</span>
//                   <span className="underline" />
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <a href="#contact" className="contact-btn group">
//           <div className="inner">
//             <span>Contact me!</span>
//           </div>
//         </a>
//       </div>
      
//       {/* Profile Modal */}
//       {showModal && (
//         <div 
//           className={`profile-modal ${isClosing ? 'closing' : ''}`}
//           onClick={closeModal}
//         >
//           <div 
//             ref={modalContentRef}
//             className={`modal-content ${isClosing ? 'closing' : ''}`}
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               position: 'absolute',
//               top: `${profilePosition.top}px`,
//               left: `${profilePosition.left}px`,
//               transform: 'none'
//             }}
//           >
//             <div className="modal-header">
//               <h3 className="modal-title">Shivesh Mishra</h3>
//               <span className="close-modal" onClick={closeModal}>&times;</span>
//             </div>
            
//             <div className={`modal-image-container ${isClosing ? 'closing' : ''}`}>
//               <div className="image-wrapper-profile">
//                 <img 
//                   src="/images/profile.jpg" 
//                   alt="Shivesh Profile" 
//                   className="modal-image" 
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;

//----------Main-----------

import { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants";

const Navbar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  // state for profile hover visibility
  const [showProfile, setShowProfile] = useState(false);
  // state for closing animation
  const [isClosing, setIsClosing] = useState(false);
  // Reference for profile pic position
  const [profilePosition, setProfilePosition] = useState({ top: 0, left: 0 });
  // Modal content ref
  const profileContentRef = useRef(null);
  // Profile container ref for hover detection
  const profileContainerRef = useRef(null);
  // Portal ref for mobile modal
  const portalRef = useRef(null);
  // Track if navbar is hidden (for mobile)
  const [navbarHidden, setNavbarHidden] = useState(false);
  // Track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  // Track if desktop hover is active
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Check if we're on mobile - use a throttled handler for better performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile);

    // cleanup the event listeners when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Handle profile hover on desktop - fixed to avoid blinking
  const handleProfileMouseEnter = (e) => {
    // Only apply hover behavior on desktop devices
    if (!isMobile) {
      // Prevent multiple hover events from triggering the effect again and again
      if (isHoveringRef.current) return;
      
      isHoveringRef.current = true;
      
      const rect = e.currentTarget.getBoundingClientRect();
      setProfilePosition({
        top: rect.top,
        left: rect.left
      });
      
      requestAnimationFrame(() => {
        // Only set show profile if not already showing
        if (!showProfile) {
          setShowProfile(true);
        }
      });
    }
  };

  const handleProfileMouseLeave = () => {
    // Only apply hover behavior on desktop devices
    if (!isMobile) {
      isHoveringRef.current = false;
      
      // Only start closing if profile is showing
      if (showProfile) {
        setIsClosing(true);
        setTimeout(() => {
          setShowProfile(false);
          setIsClosing(false);
        }, 500); // Match this with CSS animation duration
      }
    }
  };

  // For mobile devices, maintain click behavior
  const openModal = (e) => {
    // Only apply click behavior on mobile devices
    if (isMobile) {
      // Get precise profile icon position for animation origin
      const rect = e.currentTarget.getBoundingClientRect();
      
      // We don't use this for positioning the modal anymore (fixed in CSS)
      // but keep it for any future use
      setProfilePosition({
        top: rect.top,
        left: rect.left
      });
      
      // Show the modal
      requestAnimationFrame(() => {
        setShowProfile(true);
        
        // Set navbar to hidden for mobile animation with slight delay
        setTimeout(() => {
          setNavbarHidden(true);
        }, 50);
      });
    }
  };

  const closeModal = () => {
    // Add closing class to both the modal and portal
    setIsClosing(true);
    
    // For mobile devices, also mark the portal as closing for the backdrop animation
    if (isMobile) {
      // Use ref for better performance instead of querySelector
      if (portalRef.current) {
        portalRef.current.classList.add('closing');
      }
      
      // Animate navbar back in immediately to fix disappearing issue
      setNavbarHidden(false);
    }
    
    // Wait for the animation to complete before hiding the modal
    setTimeout(() => {
      setShowProfile(false);
      setIsClosing(false);
      
      // Remove the closing class from portal using ref
      if (portalRef.current && portalRef.current.classList.contains('closing')) {
        portalRef.current.classList.remove('closing');
      }
    }, 500);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${navbarHidden ? "navbar-hidden" : ""}`}>
      <div className={`inner ${navbarHidden ? "inner-hidden" : ""}`}>
        {/* Profile pic container */}
        <div 
          className="profile-container"
          ref={profileContainerRef}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <div 
            className={`profile-pic ${showProfile && !isMobile ? 'hidden-on-desktop' : ''}`} 
            onClick={(e) => openModal(e)}
          >
            <img 
              src="/images/profile.jpg" 
              alt="Shivesh" 
              className="profile-image" 
            />
          </div>
          
          <a href="#hero" className="logo">
            | ShiveshX.DEV |
          </a>
        </div>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-[6px]">
          {/* Resume Download Button */}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-btn group" 
            download="Shivesh's_Resume.pdf"
          >
            <div className="inner">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 inline-block align-text-bottom mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <span className="hidden sm:inline-block mr-1">Download</span>
              <span className="inline-block">Resume</span>
            </div>
          </a>

          <a href="#contact" className="contact-btn group">
            <div className="inner">
              <span>Contact me!</span>
            </div>
          </a>
        </div>
      </div>
      
      {/* Completely separate profile modal element for mobile */}
      {showProfile && isMobile && (
        <div className="mobile-profile-portal" ref={portalRef}>
          <div 
            className={`mobile-profile-modal ${isClosing ? 'modal-closing' : ''}`}
          >
            <div className="mobile-modal-header">
              <h3 className="mobile-modal-title">Shivesh Mishra</h3>
              <button className="mobile-modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="mobile-modal-body">
              <img 
                src="/images/profile.jpg" 
                alt="Shivesh Profile" 
                className="mobile-modal-image" 
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop profile modal (original) */}
      {showProfile && !isMobile && (
        <div 
          className={`profile-modal ${isClosing ? 'closing' : ''}`}
          onClick={closeModal}
          style={{ pointerEvents: isHoveringRef.current ? 'none' : 'auto' }}
        >
          <div 
            ref={profileContentRef}
            className={`modal-content ${isClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: `${profilePosition.top}px`,
              left: `${profilePosition.left}px`
            }}
          >
            <div className="modal-header">
              <h3 className="modal-title">Shivesh Mishra</h3>
            </div>
            
            <div className={`modal-image-container ${isClosing ? 'closing' : ''}`}>
              <div className="image-wrapper-profile">
                <img 
                  src="/images/profile.jpg" 
                  alt="Shivesh Profile" 
                  className="modal-image" 
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Base styles */
        .contact-btn .inner {
          transition: background-color 0.3s ease;
        }
        .contact-btn .inner * {
          transition: color 0.3s ease;
        }
        
        /* Mobile navbar animation */
        @media (max-width: 767px) {
          .navbar {
            transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          }
          
          .navbar-hidden {
            transform: translateY(-100%);
          }
          
          .inner {
            transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          }
          
          .inner-hidden {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        
        /* Hide profile pic on desktop when expanded */
        @media (min-width: 768px) {
          .profile-pic.hidden-on-desktop {
            opacity: 0;
            visibility: hidden;
          }
          
          /* Fix for blinking issue - prevent multiple hover events */
          .profile-modal {
            pointer-events: auto;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;