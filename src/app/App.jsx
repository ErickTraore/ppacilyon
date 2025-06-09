// File: src/app/App.jsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Ajout pour vérifier la connexion
import { useDispatch } from 'react-redux';
import '../styles/main.scss';
import HamburgerIcon from '../components/hamburgerIcon/HamburgerIcon';
import PageContent from '../components/pageContent/PageContent';
import logo from '../assets/logoppaci514_150x151.png';
import panneau320 from '../assets/logoppaci3_320x56.png';
import panneau200 from '../assets/logoppaci3_200x35.png';
import panneau150 from '../assets/logoppaci3_150x26.png';
import panneau500 from '../assets/logoppaci3_500x87.png';
import Register from '../components/register/Register';
import Footer from '../components/footer/Footer';
import Login from '../components/login/Login';
import iconLoginon from '../assets/sign/signin_on_icon.png';
import iconLoginof from '../assets/sign/signin_of_icon.png';
import iconRegister from '../assets/sign/signup_icon.png';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [panneau, setPanneau] = useState(window.innerWidth <= 500 ? panneau200 : panneau500);
  const isSmallScreen = window.innerWidth < 768; // Détecte si l'écran est petit
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Enlève le '#' du début
    if (hash) {
      setActivePage(hash);
    }

    const updatePanneau = () => {
      setPanneau(window.innerWidth <= 500 ? panneau200 : panneau);
    };

    window.addEventListener('resize', updatePanneau);

     // ✅ Vérifie si l'utilisateur est authentifié après rechargement
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: token });
    }

    return () => window.removeEventListener('resize', updatePanneau);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Supprime le token du stockage
    dispatch({ type: "LOGOUT" }); // ✅ Réinitialise Redux
    window.location.reload(); // ✅ Recharge la page pour appliquer les changements
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setIsOpen(false); // Ferme le menu après la navigation
    window.location.hash = page; // Met à jour l'URL
  };
  return (
    
  <div className={`App ${isAuthenticated ? 'authenticated' : 'not-authenticated'}`}>      <header className="App__header">
        <div className="App__header__logo">
          <img src={logo} className="App__header__logo__img" alt="logo" />
        </div>
        <div className="App__header__hamburger">
          <div className="App__header__hamburger__img">
            {isAuthenticated && (
              <button onClick={handleLogout} className="logout-button">
                Se déconnecter
              </button>
            )}
          </div>
          <div className="App__header__hamburger__img">
            <img src={panneau} className="App__header__hamburger__img__panneau" alt="logo" />
            {isAuthenticated && <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />}
          </div>
          <div className="App__header__hamburger__sign">
            <div className="App__header__hamburger__sign__connect">
              <img src={iconLoginof} alt="Icône Login" /> 
              <a href="#login" onClick={() => navigateTo('login')}>Login</a>
            </div>
            <div className="App__header__hamburger__sign__connect">
              <img src={iconRegister} alt="Icône Register" /> 
              <a href="#register" onClick={() => navigateTo('register')}>Register</a>
            </div>
          </div>
          <nav className={`menu ${isOpen ? 'open' : ''}`}>
            <ul>
              <li onClick={() => navigateTo('#home')}>Home</li>
              <li onClick={() => navigateTo('#contact')}>Contact</li>
              <li onClick={() => navigateTo('#cotisation')}>Cotisation</li>
            </ul>
          </nav>
          {isAuthenticated && <ul className="horizontal-menu">
            <li><a href="#home" onClick={() => navigateTo('home')}>Accueil</a></li>
            <li><a href="#cotisation" onClick={() => navigateTo('cotisation')}>Cotisation</a></li>
            <li><a href="#contact" onClick={() => navigateTo('contact')}>Contact</a></li>
          </ul>}
        </div>
      </header>
      <div><PageContent activePage={activePage} /></div>
      <Footer />
    </div>
  );
}

export default App;

