import React, { useState } from 'react';
import '../styles/main.scss'
import HamburgerIcon from '../components/hamburgerIcon/HamburgerIcon';
import PageContent from '../components/pageContent/PageContent';
import logo from '../assets/logoppaci514.png';
import panneau from '../assets/logoppaci3.png';
import Register from '../components/Register';
import Footer from '../components/footer/Footer';
import Login from '../components/Login';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setIsOpen(false); // Ferme le menu après la navigation
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
          <nav className={`menu ${isOpen ? 'open' : ''}`}>
            <ul>
              <li onClick={() => navigateTo('home')}>Home</li>
              <li onClick={() => navigateTo('services')}>Services</li>
              <li onClick={() => navigateTo('contact')}>Contact</li>
              <li onClick={() => navigateTo('login')}>Login</li>
              <li onClick={() => navigateTo('register')}>Register</li>
              <li onClick={() => navigateTo('cotisation')}>Cotisation</li>
            </ul>
          </nav>
          <ul className="horizontal-menu">
            <li><a href="#home" onClick={() => navigateTo('home')}>Accueil</a></li>
            <li><a href="#services" onClick={() => navigateTo('services')}>Adhesion</a></li>
            <li><a href="#services" onClick={() => navigateTo('cotisation')}>Cotisation</a></li>
            <li><a href="#services" onClick={() => navigateTo('login')}>Login</a></li>
            <li><a href="#services" onClick={() => navigateTo('register')}>Register</a></li>
            <li><a href="#contact" onClick={() => navigateTo('contact')}>Contact</a></li>
          </ul>
        </div>
      </header>
      <div> <h1>Inscription</h1> <Register /> </div>
      <div> <h1>Connexion</h1> <Login /> </div>
      <div><PageContent activePage={activePage} /></div>
      <Footer />
    </div>
  );
}

export default App;

