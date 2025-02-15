import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, addMessage } from '../../actions/messageActions';

const Messages = () => {
  const [newMessage, setNewMessage] = useState({ tittle: '', content: '', image: '', video: '' });
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addMessage(newMessage));
    setNewMessage({ tittle: '', content: '', image: '', video: '' });
    dispatch(fetchMessages()); // Récupère les messages après l'ajout
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
        <input
          type="text"
          name="image"
          value={newMessage.image}
          onChange={handleInputChange}
          placeholder="URL de l'image"
        />
        <input
          type="text"
          name="video"
          value={newMessage.video}
          onChange={handleInputChange}
          placeholder="URL de la vidéo"
        />
        <button type="submit">Envoyer le message</button>
      </form>

      <h2>Liste des messages</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <h3>{message.tittle}</h3>
          <p>{message.content}</p>
          {message.image && <img src={message.image} alt="Image du message" />}
          {message.video && (
            <video controls>
              <source src={message.video} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          )}
          <p>Expédié par: {message.User ? message.User.email : 'Utilisateur inconnu'}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
