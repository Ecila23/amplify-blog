export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const TOGGLE_SIGN_UP = 'TOGGLE_SIGN_UP';
export const HIDE_AUTH_FORMS = 'HIDE_AUTH_FORMS';

export const getPosts = () => {
  return { type: GET_POSTS };
};

export const addPost = post => {
  return { type: ADD_POST, post };
};

export const removePost = postId => {
  return { type: REMOVE_POST, postId };
};

export const setCurrentUser = currentUser => {
  return { type: SET_CURRENT_USER, currentUser };
};

export const toggleLogin = () => {
  return { type: TOGGLE_LOGIN };
};

export const toggleSignUp = () => {
  return { type: TOGGLE_SIGN_UP };
};

export const hideAuthForms = () => {
  return { type: HIDE_AUTH_FORMS };
};
