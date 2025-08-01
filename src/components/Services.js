import React from 'react';
import './Services.css';

const services = [
  {
    title: 'Mumbai to NYC',
    subtitle: 'Popular Route',
    description: 'Direct flights now available with best comfort & safety.',
  },
  {
    title: 'Maharaja Club',
    subtitle: 'Premium Membership',
    description: 'Unlock exclusive lounge access, upgrades, and rewards.',
  },
  {
    title: 'Star Alliance',
    subtitle: 'Global Connectivity',
    description: 'Travel globally with trusted partner airlines.',
  },
  {
    title: 'E-Store',
    subtitle: 'Merchandise & More',
    description: 'Shop exclusive Air India gifts, travel kits, and more.',
  },
  {
    title: 'Talk to Us',
    subtitle: '24/7 Support',
    description: 'Chat, call or email us for help at any time.',
  },
];

function Services() {
  return (
    <div className="services-wrapper py-5 px-4">
      <h2 className="text-center mb-5 title">Discover Our Services</h2>

      <div className="row justify-content-center">
        {services.map((item, i) => (
          <div className="col-md-4 col-lg-3 mb-4" key={i}>
            <div className="card service-card h-100 shadow-sm">
              <div className="img-placeholder"></div>

              <div className="card-body">
                <h6 className="text-muted mb-1">{item.subtitle}</h6>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text small">{item.description}</p>
                <button className="btn btn-outline-danger btn-sm mt-2">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
