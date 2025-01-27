// src/actions/authActions.js
export const registerRequest = () => ({ type: 'REGISTER_REQUEST' });
export const registerSuccess = (user) => ({ type: 'REGISTER_SUCCESS', payload: user });
export const registerFail = (error) => ({ type: 'REGISTER_FAIL', payload: error });

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    // Simuler une requête API
    const response = await fakeApiRequest(userData); // Remplacez par une véritable requête API
    dispatch(registerSuccess(response));
  } catch (error) {
    dispatch(registerFail(error.message));
  }
};

export const loginUser = (token) => (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    // Stocker le token dans le localStorage
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

const fakeApiRequest = (data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (data.username !== 'error') resolve({ id: 1, username: data.username, email: data.email });
    else reject(new Error('Inscription échouée'));
  }, 1000);
});

