// src/pages/BookingPage.jsx
import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "./BookingPage.css";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    time: "19:00",
  });
  const [date, setDate] = useState(new Date());
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        date: date.toDateString(),
        timestamp: serverTimestamp(),
      });
      setSuccess("Booking confirmed! We'll contact you shortly.");
      setFormData({ name: "", email: "", phone: "", guests: "2", time: "19:00" });
      setDate(new Date());
    } catch (err) {
      console.error("Booking error:", err);
      setSuccess("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="booking-container">
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" required placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" required placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="tel" name="phone" required placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <label>Select Date:</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} minDate={new Date()} />
        <label>Select Time:</label>
        <select name="time" value={formData.time} onChange={handleChange}>
          <option value="18:00">6:00 PM</option>
          <option value="19:00">7:00 PM</option>
          <option value="20:00">8:00 PM</option>
          <option value="21:00">9:00 PM</option>
        </select>
        <label>Number of Guests:</label>
        <select name="guests" value={formData.guests} onChange={handleChange}>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} Guests</option>
          ))}
        </select>
        <button type="submit">Book Now</button>
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default BookingPage;
