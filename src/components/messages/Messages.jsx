import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ tittle: '', content: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/messages/new/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setNewMessage({ tittle: '', content: '' });
      fetchMessages();
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tittle"
          value={newMessage.tittle}
          onChange={handleInputChange}
          placeholder="Titre du message"
          required
        />
        <textarea
          name="content"
          value={newMessage.content}
          onChange={handleInputChange}
          placeholder="Contenu du message"
          required
        />
        <button type="submit">Envoyer le message</button>
      </form>

      <h2>Liste des messages</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <h3>{message.tittle}</h3>
          <p>{message.content}</p>
          <p>Expédié par: {message.User ? message.User.email : 'Utilisateur inconnu'}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;