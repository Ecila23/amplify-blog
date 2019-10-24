import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { Authenticator } from 'aws-amplify-react';

import Nav from './components/Nav';
import NewBlogForm from './components/NewBlogForm';
import BlogPosts from './components/BlogPosts';

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <Authenticator hideDefault={true}>
        <Provider store={store}>
          <div className=''>
            <Nav />
            <NewBlogForm />
            <BlogPosts />
          </div>
        </Provider>
      </Authenticator>
    );
  }
}

export default App;
