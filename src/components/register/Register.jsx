import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import './Register.css';

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Adresse e-mail requise');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Adresse e-mail invalide');
      return;
    }

    if (password === '') {
      setPasswordError('Mot de passe requis');
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError('Le mot de passe doit contenir entre 4 et 8 caractères et inclure au moins un chiffre');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data;

      if (response.ok) {
        data = await response.json();
        console.log('Registration response:', data);
        dispatch(registerUser({ email, password, token: data.token }));
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl; // Redirection vers la page de connexion
            window.location.reload();
        }
      } else {
        data = await response.json();
        if (data.message === 'Invalid email or password') {
          setEmailError('Adresse e-mail ou mot de passe invalide');
          setPasswordError('Adresse e-mail ou mot de passe invalide');
        } else {
          console.error('Registration failed:', data.message);
          setEmailError(data.message);
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setEmailError('Une erreur est survenue lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Adresse e-mail"
        required
      />
      {emailError && <p className="error">{emailError}</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      {passwordError && <p className="error">{passwordError}</p>}
      <button type="submit" disabled={loading}>S'inscrire</button>
      {loading && <p>Chargement...</p>}
      {error && <p className="error">Erreur : {error}</p>}
    </form>
  );
};

export default Register;