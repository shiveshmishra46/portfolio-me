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

        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me!</span>
          </div>
        </a>
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
    </header>
  );
}

export default Navbar;