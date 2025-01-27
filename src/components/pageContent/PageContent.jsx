import React from 'react';
import Home from '../home/Home'; // Importez le composant Home
import Service from '../service/Service';
import '../pageContent/PageContent.css';
import ContactForm from '../contactForm/ContactForm';
import Cotisation from '../cotisation/Cotisation';
import Paiement from '../paiement/Paiement';
import Adhesion from '../adhesion/Adhesion';
import Attestation from '../attestation/Attestation';

const PageContent = ({ activePage }) => {
  return (
    <div className="content">
      {activePage === 'home' && <Home />}
      {activePage === 'services' && <Service />}
      {activePage === 'cotisation' && <Cotisation />}
      {activePage === 'contact' && <ContactForm />}
      {activePage === 'adhesion' && <Adhesion />} 
      {activePage === 'paiement' && <Paiement />} 
      {activePage === 'attestation' && <Attestation/>} 
    </div>
  );
};

export default PageContent;
