import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PremiumAirlineWebsite = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [flightSearch, setFlightSearch] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1
  });

  // Countdown timer for special offers
  const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
      return () => clearInterval(interval);
    }, [countDownDate]);

    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [hours, minutes, seconds];
  };

  const [hours, minutes, seconds] = useCountdown("2024-12-31T23:59:59");

  const handleSearch = () => {
    alert(`Searching flights from ${flightSearch.from} to ${flightSearch.to} on ${flightSearch.date} for ${flightSearch.passengers} passengers`);
  };

  const handleBookNow = (destination) => {
    setSelectedDestination(destination);
    setShowBookingModal(true);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail("");
  };

  // Sample data
  const destinations = [
    { 
      id: 1, 
      name: "Paris", 
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      description: "The city of lights and romance", 
      price: "$599" 
    },
    { 
      id: 2, 
      name: "Tokyo", 
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      description: "Experience ancient traditions and modern innovation", 
      price: "$649" 
    },
    { 
      id: 3, 
      name: "New York", 
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      description: "The city that never sleeps", 
      price: "$549" 
    },
    { 
      id: 4, 
      name: "Maldives", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      description: "Pristine beaches and crystal clear waters", 
      price: "$799" 
    }
  ];

  const features = [
    { icon: "✈️", title: "200+ Destinations", description: "Fly to destinations across all continents" },
    { icon: "⭐", title: "5-Star Service", description: "Award-winning service from our dedicated crew" },
    { icon: "💺", title: "Extra Legroom", description: "Enjoy more space with our premium seating" },
    { icon: "🍽️", title: "Gourmet Dining", description: "Chef-prepared meals on all international flights" },
    { icon: "🎬", title: "Entertainment", description: "1000+ hours of movies, shows and music" },
    { icon: "🛡️", title: "Safe Travel", description: "Your safety is our highest priority" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", text: "The most comfortable flight I've ever experienced. The service was exceptional from start to finish.", rating: 5 },
    { name: "Michael Chen", text: "SkyWings redefined air travel for me. The premium economy is worth every penny for the extra space.", rating: 5 },
    { name: "Emma Rodriguez", text: "I travel frequently for business, and SkyWings has become my preferred airline. The reliability is unmatched.", rating: 4 }
  ];

  return (
    <div className="premium-airline-website">
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-3 fw-bold mb-4">Experience Premium Air Travel</h1>
              <p className="lead mb-5">Fly in luxury to over 200 destinations worldwide with our award-winning service</p>
              <Button 
                variant="danger" 
                size="lg" 
                className="px-5 py-3 fw-bold me-3"
                onClick={() => document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </Button>
              <Button 
                variant="outline-light" 
                size="lg" 
                className="px-5 py-3 fw-bold"
                onClick={() => document.querySelector('.destinations-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Destinations
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar bg-danger text-white py-4">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-3 mb-md-0">
              <h3 className="fw-bold">200+</h3>
              <p className="mb-0">Destinations</p>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <h3 className="fw-bold">15M+</h3>
              <p className="mb-0">Happy Travelers</p>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <h3 className="fw-bold">500+</h3>
              <p className="mb-0">Flights Daily</p>
            </Col>
            <Col md={3}>
              <h3 className="fw-bold">25</h3>
              <p className="mb-0">Years of Excellence</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Booking Section */}
      <section className="booking-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="p-4 rounded-3 bg-white shadow">
                <h2 className="text-center mb-4">Find Your Perfect Flight</h2>
                <Form>
                  <Row className="gy-3">
                    <Col md={3}>
                      <Form.Label className="fw-semibold">From</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="City or Airport" 
                        value={flightSearch.from}
                        onChange={(e) => setFlightSearch({...flightSearch, from: e.target.value})}
                        className="py-2"
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label className="fw-semibold">To</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="City or Airport" 
                        value={flightSearch.to}
                        onChange={(e) => setFlightSearch({...flightSearch, to: e.target.value})}
                        className="py-2"
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Label className="fw-semibold">Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={flightSearch.date}
                        onChange={(e) => setFlightSearch({...flightSearch, date: e.target.value})}
                        className="py-2"
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Label className="fw-semibold">Travelers</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="1" 
                        min="1"
                        value={flightSearch.passengers}
                        onChange={(e) => setFlightSearch({...flightSearch, passengers: parseInt(e.target.value)})}
                        className="py-2"
                      />
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button variant="danger" className="w-100 py-2 fw-bold" onClick={handleSearch}>
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Special Offer Countdown */}
      <section className="special-offer bg-danger text-white py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-3">Special Offer Ends Soon!</h2>
              <p className="mb-4">Save up to 30% on selected routes - Book before time runs out</p>
              
              <div className="countdown-timer mb-4">
                <div className="d-flex justify-content-center">
                  <div className="mx-2 bg-white text-danger p-3 rounded">
                    <h3 className="fw-bold mb-0">{hours.toString().padStart(2, '0')}</h3>
                    <small>Hours</small>
                  </div>
                  <div className="mx-2 bg-white text-danger p-3 rounded">
                    <h3 className="fw-bold mb-0">{minutes.toString().padStart(2, '0')}</h3>
                    <small>Minutes</small>
                  </div>
                  <div className="mx-2 bg-white text-danger p-3 rounded">
                    <h3 className="fw-bold mb-0">{seconds.toString().padStart(2, '0')}</h3>
                    <small>Seconds</small>
                  </div>
                </div>
              </div>
              
              <Button variant="light" className="text-danger px-4 py-2 fw-bold">
                View All Offers
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Why Fly With Us?</h2>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <div className="feature-card text-center p-4 h-100 bg-white rounded shadow-sm">
                  <div className="feature-icon mb-3" style={{ fontSize: "3rem" }}>{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="mb-0">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Destinations Section */}
      <section className="destinations-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Popular Destinations</h2>
          <Row>
            {destinations.map((destination) => (
              <Col md={6} lg={3} key={destination.id} className="mb-4">
                <Card className="h-100 shadow-sm destination-card">
                  <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={destination.image} 
                      style={{ height: '100%', objectFit: 'cover' }}
                      alt={destination.name}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{destination.name}</Card.Title>
                    <Card.Text>{destination.description}</Card.Text>
                    <div className="mt-auto">
                      <h4 className="text-danger">{destination.price}</h4>
                      <Button 
                        variant="danger" 
                        className="w-100"
                        onClick={() => handleBookNow(destination)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <h2 className="text-center mb-5">What Our Travelers Say</h2>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="testimonial-card p-4 h-100 bg-white rounded shadow-sm">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? "text-warning" : "text-muted"}>★</span>
                    ))}
                  </div>
                  <p className="fst-italic">"{testimonial.text}"</p>
                  <div className="mt-auto">
                    <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                    <small className="text-muted">Frequent Flyer</small>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section py-5 bg-danger text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">Ready for Your Next Adventure?</h2>
              <p className="lead mb-4">Subscribe to our newsletter and get 15% off your first booking</p>
              
              {subscribed ? (
                <div className="alert alert-success w-75 mx-auto">Thank you for subscribing! Check your email for your discount code.</div>
              ) : (
                <Form className="d-flex justify-content-center mb-3" onSubmit={handleSubscribe}>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-50 me-2 py-3" 
                    style={{border: "none"}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button variant="light" className="text-danger px-4 py-3 fw-bold" type="submit">
                    Subscribe & Save
                  </Button>
                </Form>
              )}
              
              <small className="text-light">By subscribing, you agree to our Terms and Privacy Policy</small>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Flight to {selectedDestination?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">Special price: <span className="text-danger fw-bold">{selectedDestination?.price}</span></p>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>From</Form.Label>
                <Form.Control type="text" placeholder="Departure city" />
              </Col>
              <Col md={6}>
                <Form.Label>To</Form.Label>
                <Form.Control type="text" value={selectedDestination?.name} readOnly />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Departure Date</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={6}>
                <Form.Label>Return Date (Optional)</Form.Label>
                <Form.Control type="date" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Passengers</Form.Label>
                <Form.Control type="number" min="1" defaultValue="1" />
              </Col>
              <Col md={6}>
                <Form.Label>Class</Form.Label>
                <Form.Select>
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => setShowBookingModal(false)}>
            Continue to Payment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom CSS */}
      <style>{`
        .premium-airline-website {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .hero-section {
          padding-top: 80px;
        }
        .destination-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .feature-card:hover {
          background-color: #f8f9fa;
          transition: background-color 0.3s ease;
        }
        .testimonial-card {
          border-left: 4px solid #dc3545;
        }
        .stats-bar {
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
};

export default PremiumAirlineWebsite;