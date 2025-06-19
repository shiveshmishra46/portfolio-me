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
  // state for modal visibility
  const [showModal, setShowModal] = useState(false);
  // state for closing animation
  const [isClosing, setIsClosing] = useState(false);
  // Reference for profile pic position
  const [profilePosition, setProfilePosition] = useState({ top: 0, left: 0 });
  // Modal content ref
  const modalContentRef = useRef(null);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle modal visibility with animation
  const openModal = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProfilePosition({
      top: rect.top,
      left: rect.left
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 500); // Match this with CSS animation duration
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        {/* Profile pic container */}
        <div className="profile-container">
          <div className="profile-pic" onClick={(e) => openModal(e)}>
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
      
      {/* Profile Modal */}
      {showModal && (
        <div 
          className={`profile-modal ${isClosing ? 'closing' : ''}`}
          onClick={closeModal}
        >
          <div 
            ref={modalContentRef}
            className={`modal-content ${isClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: `${profilePosition.top}px`,
              left: `${profilePosition.left}px`,
              transform: 'none'
            }}
          >
            <div className="modal-header">
              <h3 className="modal-title">Shivesh Mishra</h3>
              <span className="close-modal" onClick={closeModal}>&times;</span>
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
        /* Reset transitions for all text elements */
        .contact-btn .inner {
          transition: background-color 0.3s ease;
        }
        .contact-btn .inner * {
          transition: color 0.3s ease;
        }
      `}</style>
    </header>
  );
}

export default Navbar;