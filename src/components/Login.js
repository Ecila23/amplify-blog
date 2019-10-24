import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUser, hideAuthForms } from '../actions/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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

    const { username, password } = this.state;

    Auth.signIn(username, password)
      .then(() => {
        console.log('Signed In');
      })
      .catch(err => console.log(err));

    this.setState({
      username: '',
      password: ''
    });

    this.props.setCurrentUser(username);
    this.props.hideAuthForms();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Username</label>
          <input type='text' name='username' onChange={this.handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' onChange={this.handleChange} />
        </div>
        <button>Login</button>
      </form>
    );
  }
}

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  hideAuthForms: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { setCurrentUser, hideAuthForms }
)(Login);
