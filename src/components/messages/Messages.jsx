import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../actions/messageActions';

const Messages = () => {
  const [newMessage, setNewMessage] = useState({
    tittle: '',
    content: '',
    image: null,
    video: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
    setErrorMessage(''); // Réinitialiser le message d'erreur lors de la saisie
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setNewMessage({ ...newMessage, [name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!newMessage.tittle || !newMessage.content) {
      setErrorMessage(
        'Vous devez obligatoirement fournir un titre et un contenu. En option, vous pouvez choisir ou pas une image et/ou une vidéo.'
      );
      return;
    }
    console.log('Titre :', newMessage.tittle);
    console.log('Contenu :', newMessage.content);
    console.log('Image :', newMessage.image);
    console.log('Vidéo :', newMessage.video);

    // Envoyer le titre et le contenu au backend "my-backend"
    const messageData = {
      tittle: newMessage.tittle,
      content: newMessage.content,
    };

    try {
      const messageResponse = await fetch(
        'http://localhost:5000/api/messages/new',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        }
      );

      if (!messageResponse.ok) {
        throw new Error(`Erreur HTTP: ${messageResponse.status}`);
      }

      const { id: newMessageId } = await messageResponse.json(); // Récupère l'ID du nouveau message

      // Vérifier et télécharger l'image, si présente
      if (newMessage.image) {
        console.log('Uploading image...');
        const formDataImage = new FormData();
        formDataImage.append('image', newMessage.image);
        formDataImage.append('messageId', newMessageId);
        await fetch('http://localhost:3001/api/uploadImage', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formDataImage,
        });
      } else {
        console.log('No image to upload.');
      }

      // Vérifier et télécharger la vidéo, si présente
      if (newMessage.video) {
        console.log('Uploading video...');
        const formDataVideo = new FormData();
        formDataVideo.append('video', newMessage.video);
        formDataVideo.append('messageId', newMessageId);
        await fetch('http://localhost:3001/api/uploadVideo', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formDataVideo,
        });
      } else {
        console.log('No video to upload.');
      }

      setNewMessage({ tittle: '', content: '', image: null, video: null });
      setErrorMessage(''); // Réinitialiser le message d'erreur après succès
      dispatch(fetchMessages()); // Récupère les messages après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      setErrorMessage("Une erreur est survenue lors de l'envoi du message.");
    }
  };

  return (
    <div>
      <h1>Messages</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
        />

        {errorMessage && (
          <p style={{ color: 'red' }}>
            <strong>{errorMessage}</strong>
          </p>
        )}

        <button type="submit">Envoyer le message</button>
      </form>

      <h2>Liste des messages</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <h3>{message.tittle}</h3>
          <p>{message.content}</p>
          {message.image && (
            <img
              src={`http://localhost:3001/uploads/images/${message.image}`}
              alt={message.filename}
            />
          )}
          {message.video && (
            <video controls>
              <source
                src={`http://localhost:3001/uploads/videos/${message.video}`}
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          )}
          <p>
            Expédié par:{' '}
            {message.User ? message.User.email : 'Utilisateur inconnu'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
