import React, { useState, useEffect } from 'react';
import '../styles/main.scss'
import HamburgerIcon from '../components/hamburgerIcon/HamburgerIcon';
import PageContent from '../components/pageContent/PageContent';
import logo from '../assets/logoppaci514.png';
import panneau from '../assets/logoppaci3.png';
import Register from '../components/register/Register';
import Footer from '../components/footer/Footer';
import Login from '../components/login/Login';
import iconLoginon from '../assets/sign/signin_on_icon.png';
import iconLoginof from '../assets/sign/signin_of_icon.png';
import iconRegister from '../assets/sign/signup_icon.png';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const hash = window.location.hash.slice(1); // Enlève le '#' du début
    if (hash) {
      setActivePage(hash);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setIsOpen(false); // Ferme le menu après la navigation
    window.location.hash = page; // Met à jour l'URL
  };

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__header__logo">
          <img src={logo} className="App__header__logo__img" alt="logo" />
        </div>
        <div className="App__header__hamburger">
          <div className="App__header__hamburger__img">
            <img src={panneau} className="App__header__hamburger__img__panneau" alt="logo" />
            <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
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
          <ul className="horizontal-menu">
            <li><a href="#home" onClick={() => navigateTo('home')}>Accueil</a></li>
            <li><a href="#cotisation" onClick={() => navigateTo('cotisation')}>Cotisation</a></li>
            <li><a href="#contact" onClick={() => navigateTo('contact')}>Contact</a></li>
          </ul>
        </div>
      </header>
      <div><PageContent activePage={activePage} /></div>
      <Footer />
    </div>
  );
}

export default App;

