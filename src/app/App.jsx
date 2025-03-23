import React, { useState, useEffect } from 'react';
import '../styles/main.scss'
import HamburgerIcon from '../components/hamburgerIcon/HamburgerIcon';
import PageContent from '../components/pageContent/PageContent';
import logo from '../assets/logoppaci514.png';
import panneau from '../assets/logoppaci3.png';
import Footer from '../components/footer/Footer';
import iconLoginof from '../assets/sign/signin_of_icon_300x300.png';
import iconRegister from '../assets/sign/icons8-registration-50.png';
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
      <div className="App__title">
        <p><b> PPACI </b> (Parti des Peuples Africains - Côte d'Ivoire)</p>
      </div>
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
                <a href="#login" onClick={() => navigateTo('login')}>Connection
                </a>
              </div>
              <div className="App__header__hamburger__sign__connect">
                <img src={iconRegister} alt="Icône Register" /> 
                <a href="#register" onClick={() => navigateTo('register')}>Registration</a>
              </div>
          </div>
        </div>
      </header>
      <div>
          <nav className={`menu ${isOpen ? 'open' : ''}`}>
            <ul>
              <li onClick={() => navigateTo('home')}>accueil</li>
              <li onClick={() => navigateTo('cotisation')}>Cotisation</li>
              <li onClick={() => navigateTo('contact')}>Contact</li>
            </ul>
          </nav>
          <ul className="horizontal-menu">
            <li><a href="#home" onClick={() => navigateTo('home')}>accueil</a></li>
            <li><a href="#cotisation" onClick={() => navigateTo('cotisation')}>Cotisation</a></li>
            <li><a href="#contact" onClick={() => navigateTo('contact')}>Contact</a></li>
          </ul>
      </div>
      <div><PageContent activePage={activePage} /></div>
      <Footer />
    </div>
  );
}

export default App;

