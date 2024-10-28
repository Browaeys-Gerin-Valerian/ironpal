// src/components/Nav.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/nav.css';

const Nav: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  // Function to toggle the visibility of the profile popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Function to toggle the visibility of the hamburger menu
  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggles the state of menu visibility
  };

  // Close the popup or menu when the user clicks outside of them
  const handleClickOutside = (event: MouseEvent) => {
    // Check if the user clicked outside the menu and hamburger button
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      hamburgerButtonRef.current &&
      !hamburgerButtonRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }

    // Check if the user clicked outside the profile popup
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  // Attach global event listener to detect clicks outside of the popup/menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup, showMenu]);

  return (
    <header className="nav-header">
      {/* User icon on the left with a click event */}
      <button className="nav-button" onClick={togglePopup}>
        <FontAwesomeIcon icon={faUser} className="nav-icon" />
      </button>

      {/* Popup that appears when clicking on the user icon */}
      {showPopup && (
        <div className="profile-popup" ref={popupRef}>
          <ul>
            <li>Modify personal information</li>
            <li>Log out</li>
          </ul>
        </div>
      )}

      {/* Center logo */}
      <div className="nav-logo">
        <h1>Ironpal</h1>
      </div>

      {/* Hamburger icon on the right with a click event */}
      <button className="nav-button" ref={hamburgerButtonRef} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="nav-icon" />
      </button>

      {/* Vertical dropdown menu that appears below the hamburger icon */}
      {showMenu && (
        <div className="hamburger-popup" ref={menuRef}>
          <ul>
            <li>My Profile</li>
            <li>My Sessions</li>
            <li>Add a Session</li>

            {/* <li>
              <Link to="/">
                <Button variant="contained" color="primary">Home</Button>
              </Link>
            </li>
            <li>
              <Link to="/calendrier">
                <Button variant="contained" color="secondary">Calendrier</Button>
              </Link>
            </li>
            <li>
              <Link to="/profil">
                <Button variant="contained" color="secondary">Profil</Button>
              </Link>
            </li> */}

          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
