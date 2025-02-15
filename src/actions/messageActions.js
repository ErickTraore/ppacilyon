// src/actions/messageActions.js
export const fetchMessages = () => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/api/messages/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      dispatch({ type: 'FETCH_MESSAGES_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  export const addMessage = (newMessage) => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/api/messages/new/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
      });
      const data = await response.json();
      dispatch({ type: 'ADD_MESSAGE_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };
  
  