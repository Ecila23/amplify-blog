import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUser, hideAuthForms } from '../actions/actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      code: '',
      signedUp: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, email, code, signedUp } = this.state;

    if (!signedUp) {
      Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email
        }
      })
        .then(() => console.log('signed up'))
        .catch(err => console.log(err));
      this.setState({
        signedUp: true
      });
    } else {
      Auth.confirmSignUp(username, code)
        .then(data => console.log(data))
        .catch(err => console.log(err));

      Auth.resendSignUp(username)
        .then(() => {
          console.log('code resent successfully');
        })
        .catch(e => {
          console.log(e);
        });
      this.setState({
        username: '',
        password: '',
        email: '',
        code: ''
      });
    }

    this.props.setCurrentUser(username);
    this.props.hideAuthForms();
  };

  render() {
    const { username, email, password, code, signedUp } = this.state;
    if (!signedUp) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type='text'
              name='username'
              onChange={this.handleChange}
              value={username}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <button>Confirm</button>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type='text'
              name='username'
              onChange={this.handleChange}
              value={username}
            />
          </div>
          <div>
            <label>Confirmation Code</label>
            <input
              type='text'
              name='code'
              onChange={this.handleChange}
              value={code}
            />
          </div>
          <button>Confirm</button>
        </form>
      );
    }
  }
}

Signup.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  hideAuthForms: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { setCurrentUser, hideAuthForms }
)(Signup);
