import React, { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config"; // Add this
import { doc, setDoc } from "firebase/firestore"; // Firestore helpers

import "./AuthPage.css";
const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();

  if (isRegister) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const handleAuth = async (e) => {
  e.preventDefault();
  try {
    if (isRegister) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        phone,
        address,
        dob,
        createdAt: new Date().toISOString(),
      });
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }

    navigate("/");
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="auth-container">
      <h2>{isRegister ? "Create an Account" : "Login"}</h2>
      <form onSubmit={handleAuth}>
  <input
    type="email"
    placeholder="Email"
    value={email}
    required
    onChange={(e) => setEmail(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    required
    onChange={(e) => setPassword(e.target.value)}
  />

  {isRegister && (
    <>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        required
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        required
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        required
        onChange={(e) => setDob(e.target.value)}
      />
    </>
  )}

  <button type="submit">{isRegister ? "Sign Up" : "Login"}</button>
</form>

      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
