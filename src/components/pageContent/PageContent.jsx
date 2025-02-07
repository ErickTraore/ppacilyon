import React from 'react';
import Home from '../home/Home'; // Importez le composant Home
import Register from '../register/Register';
import '../pageContent/PageContent.css';
import ContactForm from '../contactForm/ContactForm';
import Cotisation from '../cotisation/Cotisation';
import Paiement from '../paiement/Paiement';
import Adhesion from '../adhesion/Adhesion';
import Attestation from '../attestation/Attestation';
import Login from '../login/Login';
// import Services from '../services/Services';

const PageContent = ({ activePage }) => {
  return (
    <div className="content">
      {activePage === 'home' && <Home />}
      {/* {activePage === 'services' && <Services />} */}
      {activePage === 'register' && <Register />}
      {activePage === 'cotisation' && <Cotisation />}
      {activePage === 'contact' && <ContactForm />}
      {activePage === 'adhesion' && <Adhesion />} 
      {activePage === 'paiement' && <Paiement />} 
      {activePage === 'login' && <Login />} 
      {activePage === 'attestation' && <Attestation/>} 
    </div>
  );
};

export default PageContent;
