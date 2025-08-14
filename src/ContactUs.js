import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/contact", formData)
      .then(res => {
        setStatus("✅ " + res.data.message);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      })
      .catch(err => {
        setStatus("❌ Failed to send message");
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone" />
        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default Contact;
