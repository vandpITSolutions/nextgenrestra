import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import "./HomePage.css";
import Navbar from "./Navbar"; // Optional: use Tailwind or CSS Module if preferred
import Footer from "./Footer"
const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <div className="homepage">
      <Navbar />
      <header className="hero">
        <h1>Welcome to Delizio</h1>
        <p>Your favorite spot for delicious cuisine.</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <section className="menu-preview">
        <h2>Explore Our Menu</h2>
        <p>From gourmet pizzas to handcrafted desserts, we’ve got something for everyone.</p>
        <button onClick={() => navigate("/menu")}>View Full Menu</button>
      </section>

      <section className="booking-section">
        <h2>Book a Table</h2>
        <p>Reserve your seat at the best dining experience in town.</p>
        <button onClick={() => navigate("/book")}>Book Now</button>
      </section>

      <footer className="footer">
        <p>📍 123 Foodie Street, Flavor Town</p>
        <p>📞 +91-9876543210 | ✉️ contact@delizio.com</p>
      </footer>
      <Footer />
    </div>
  );
};

export default HomePage;
