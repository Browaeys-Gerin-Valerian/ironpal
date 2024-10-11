// src/components/Nav.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';

const Nav: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // État pour le menu hamburger
  const popupRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null); // Référence pour le menu
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null); // Référence pour le bouton hamburger

  // Fonction pour basculer l'affichage de la popup (bonhomme)
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Fonction pour basculer l'affichage du menu hamburger
  const toggleMenu = () => {
    setShowMenu(!showMenu); // Bascule l'état d'affichage du menu
  };

  // Fermer la popup ou le menu lorsque l'utilisateur clique en dehors
  const handleClickOutside = (event: MouseEvent) => {
    // Vérifie si l'utilisateur clique en dehors de la popup et du bouton hamburger
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      hamburgerButtonRef.current &&
      !hamburgerButtonRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }

    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  // Attacher l'événement global pour gérer les clics en dehors de la popup/menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup, showMenu]);

  return (
    <header className="nav-header">
      {/* Icône de bonhomme à gauche avec l'événement de clic */}
      <button className="nav-button" onClick={togglePopup}>
        <FontAwesomeIcon icon={faUser} className="nav-icon" />
      </button>

      {/* Popup qui s'affiche lorsqu'on clique sur l'icône */}
      {showPopup && (
        <div className="profile-popup" ref={popupRef}>
          <ul>
            <li>Modifier mes données personnelles</li>
            <li>Me déconnecter</li>
          </ul>
        </div>
      )}

      {/* Logo au centre */}
      <div className="nav-logo">
        <h1>Ironpal</h1>
      </div>

      {/* Icône de menu (hamburger) à droite avec l'événement de clic */}
      <button className="nav-button" ref={hamburgerButtonRef} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="nav-icon" />
      </button>

      {/* Menu déroulant vertical qui s'affiche juste en dessous du hamburger */}
      {showMenu && (
        <div className="hamburger-popup" ref={menuRef}>
          <ul>
            <li>Mon profil</li>
            <li>Mes séances</li>
            <li>Ajouter une séance</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
