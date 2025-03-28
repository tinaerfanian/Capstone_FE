import React, { useState } from "react";
import "../Css/Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idutente = localStorage.getItem("userId"); 

    try {
      const response = await fetch("http://localhost:8080/api/contatti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, idutente }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      {/* HERO + FORM */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">
            Have questions? Reach out to us and we'll be happy to help!
          </p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="form-container">
          <h2>Get in Touch</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" value={formData.subject} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={6} value={formData.message} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

     
      <section className="map-container">
  <iframe
    title="Tidea Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11114.78343071549!2d9.143089863849963!3d45.184417688724934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786b0f7f7d9c0fd%3A0x7f6b6c18652f8c47!2sPavia%2C%20Province%20of%20Pavia%2C%20Italy!5e0!3m2!1sen!2sit!4v1711653180000"
    width="100%"
    height="400"
    style={{ border: 0, borderRadius: "16px" }}
    allowFullScreen={false}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</section>
    </div>
  );
};

export default Contact;
