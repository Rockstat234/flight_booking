import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const services = [
  {
    title: "Mumbai to NYC",
    desc: "Popular Route",
    img: "/images/mumbai.jpg",
  },
  {
    title: "Maharaja Club",
    img: "/images/maharaja.jpg",
  },
  {
    title: "Star Alliance",
    img: "/images/star-alliance.jpg",
  },
  {
    title: "E-Store",
    img: "/images/estore.jpg",
  },
  {
    title: "Talk to Us",
    img: "/images/talktous.jpg",
  },
];

const prepareToTravel = [
  {
    title: "Baggage Essentials",
    desc: "Travel light on worries and heavy on information. Baggage rules decoded.",
    img: "/images/baggage.jpg",
  },
  {
    title: "Airport Adventures",
    desc: "Turn layovers into mini vacations — insights on terminals, lounges, amenities and more.",
    img: "/images/airport.jpg",
  },
  {
    title: "Before You Fly",
    desc: "From visa essentials to medical assistance, everything you need to know.",
    img: "/images/beforeflight.jpg",
  },
];

export default function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", position: "relative" }}>
      <div className="container my-4 p-0">
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/plane1.jpg" className="d-block w-100" alt="Plane 1" />
            </div>
            <div className="carousel-item">
              <img src="/images/plane2.jpg" className="d-block w-100" alt="Plane 2" />
            </div>
            <div className="carousel-item">
              <img src="/images/plane3.jpg" className="d-block w-100" alt="Plane 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <section style={{ backgroundColor: "#f0485fff", color: "white", padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px", fontWeight: "bold" }}>DISCOVER OUR SERVICES</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {services.map(({ title, desc, img }) => (
            <div
              key={title}
              style={{
                backgroundColor: "#fff",
                color: "#700f4c",
                padding: "15px",
                width: "200px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {img ? (
                <img src={img} alt={title} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "10px" }} />
              ) : (
                <div style={{ width: "100%", height: "100px", backgroundColor: "#ddd", borderRadius: "10px" }} />
              )}
              <h3 style={{ fontWeight: "bold", margin: "15px 0 5px" }}>{title}</h3>
              {desc && <p style={{ fontSize: "0.9rem", color: "#555", textAlign: "center" }}>{desc}</p>}
              <button style={{
                marginTop: "10px",
                backgroundColor: "#f01111ff",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 20px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{
          color: "#f01111ff",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          PREPARE TO TRAVEL
        </h2>
        <div style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {prepareToTravel.map(({ title, desc, img }) => (
            <div
              key={title}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                width: "280px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {img ? (
                <img src={img} alt={title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
              ) : (
                <div style={{
                  width: "100%",
                  height: "160px",
                  backgroundColor: "#ddd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#777"
                }}>
                  Image Placeholder
                </div>
              )}
              <div style={{ padding: "15px", flexGrow: 1 }}>
                <h3 style={{ margin: "0 0 10px", color: "#4a154b" }}>{title}</h3>
                <p style={{ color: "#555", fontSize: "0.95rem" }}>{desc}</p>
              </div>
              <div style={{ padding: "0 15px 15px" }}>
                <button style={{
                  backgroundColor: "#f01111ff",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                }}>
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#ff9800",
          color: "white",
          border: "none",
          borderRadius: "50px",
          padding: "12px 20px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        ✈ Book Your Flight
      </button>
    </div>
  );
}
