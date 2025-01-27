// src/components/Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/authActions';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add state for password
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting registration with:', { username, email, password });

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password: hashedPassword }), // Use hashed password
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (response.ok) {
        // Dispatch the registerUser action
        dispatch(registerUser({ username, email, password: hashedPassword }));
      } else {
        if (data.message === 'Invalid email or password') {
          console.error('Registration failed: Invalid email or password');
        } else {
          console.error('Registration failed:', data.message);
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nom d'utilisateur"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Adresse e-mail"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>S'inscrire</button>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
    </form>
  );
};

export default Register;
