import {
  GET_POSTS,
  ADD_POST,
  REMOVE_POST,
  SET_CURRENT_USER,
  TOGGLE_LOGIN,
  TOGGLE_SIGN_UP,
  HIDE_AUTH_FORMS
} from '../actions/actions';
import { combineReducers } from 'redux';
import { Storage } from 'aws-amplify';

const initialState = {
  posts: [{ title: 'Example', userId: 'Example', body: 'Example blog post' }],
  newPost: {},
  currentUser: '',
  authState: 'signedOut',
  showLogin: false,
  showSignUp: false
};

const postReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_POSTS:
      Storage.get('posts.json')
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
      return newState;
    case ADD_POST:
      newState.posts.push(action.post);
      Storage.put('posts.json', JSON.stringify(newState.posts))
        .then(result => {
          console.log(result, 'added to storage');
        })
        .catch(err => console.log(err));
      return newState;
    case REMOVE_POST:
      newState.posts = state.posts.filter(
        post => state.posts.indexOf(post) !== action.postId
      );
      return newState;
    default:
      return state;
  }
};

const authReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      newState.currentUser = action.currentUser;
      return newState;
    case TOGGLE_LOGIN:
      newState.showLogin = !state.showLogin;
      return newState;
    case TOGGLE_SIGN_UP:
      newState.showSignUp = !state.showSignUp;
      return newState;
    case HIDE_AUTH_FORMS:
      newState.showLogin = false;
      newState.showSignUp = false;
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  posts: postReducer,
  auth: authReducer
});
