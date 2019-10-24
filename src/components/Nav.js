import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUser, toggleLogin, toggleSignUp } from '../actions/actions';

class Nav extends Component {
  logout = () => {
    Auth.signOut()
      .then(() => console.log('Signed out'))
      .catch(err => console.log(err));
    this.props.setCurrentUser(null);
  };

  render() {
    const { currentUser, showLogin, showSignUp } = this.props.auth;
    return (
      <div>
        <div>
          {currentUser ? (
            <button onClick={this.logout}>Log Out</button>
          ) : (
            <div>
              <button onClick={this.props.toggleLogin}>Login</button>
              <button onClick={this.props.toggleSignUp}>Sign Up</button>
            </div>
          )}
        </div>
        {showLogin ? <Login /> : null}
        {showSignUp ? <Signup /> : null}
        <h2>
          {currentUser
            ? `You are logged in as ${currentUser}`
            : 'You are not logged in'}
        </h2>
      </div>
    );
  }
}

Nav.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleSignUp: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { setCurrentUser, toggleLogin, toggleSignUp }
)(Nav);
