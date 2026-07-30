// src/pages/Contact.jsx
// src/pages/Contact.jsx

import { useState } from "react";

import ContactHero from "../components/contact/ContactHero.jsx";
import ContactOptions from "../components/contact/ContactOptions.jsx";
import ContactServices from "../components/contact/ContactServices.jsx";
import ContactForm from "../components/contact/ContactForm.jsx";
import ContactPhilosophy from "../components/contact/ContactPhilosophy.jsx";
import ContactFinalCTA from "../components/contact/ContactFinalCTA.jsx";

import "../styles/pages/contact.css";

export default function Contact() {
  const [selectedService, setSelectedService] = useState("");

  return (
    <main className="contact-page">
      <ContactHero />

      <ContactOptions />

      <ContactServices
        selected={selectedService}
        onSelect={setSelectedService}
      />

      <ContactForm
        selectedService={selectedService}
      />

      <ContactPhilosophy />

      <ContactFinalCTA />
    </main>
  );
}