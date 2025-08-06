// components/FaqPage.js
import React, { useState } from 'react';
import './FaqPage.css';

const FAQ_SECTIONS = [
  {
    title: 'Booking',
    faqs: [
      {
        q: 'How can I book a flight with Air India?',
        a: 'You can book via our website, mobile app, call centre or authorized travel agent.'
      },
      {
        q: 'Can I book via travel agent?',
        a: 'Yes, authorized travel agents can book on behalf of passengers.'
      },
    ],
  },
  {
    title: 'Check‑in',
    faqs: [
      {
        q: 'What is the online check‑in window?',
        a: 'Online check‑in opens 48 hrs before departure and closes 2 hrs before for international and 1 hr before for domestic.'
      },
      {
        q: 'Can I select my seat online?',
        a: 'Yes, based on availability, seat map allows selection. Extra legroom or exit row may have charges.'
      },
    ],
  },
  {
    title: 'Baggage',
    faqs: [
      {
        q: 'What is baggage allowance?',
        a: 'Allowance depends on route and fare. Check specific limits in your booking confirmations or website.'
      },
      {
        q: 'What items are prohibited?',
        a: 'Prohibited items include flammable liquids, weapons, etc. Refer baggage policy.'
      },
    ],
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {FAQ_SECTIONS.map((sec, idx) => (
        <div key={idx} className="faq-section">
          <button className="section-title" onClick={() => toggle(idx)}>
            {sec.title}
            <span className={`arrow ${openIndex === idx ? 'open' : ''}`}>▸</span>
          </button>
          {openIndex === idx && (
            <div className="faq-list">
              {sec.faqs.map((fa, j) => (
                <div key={j} className="faq-item">
                  <p className="question">{fa.q}</p>
                  <p className="answer">{fa.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqPage;
