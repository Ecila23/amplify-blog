import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../actions/actions';

class NewBlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.state.title,
      userId: this.props.auth.currentUser || 'anon',
      body: this.state.body
    };
    this.setState({ title: '', body: '' });
    this.props.addPost(post);
  }

  render() {
    return (
      <div>
        <div>
          <h2>Add a new blog post:</h2>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Title: </label>
              <br />
              <input
                type='text'
                name='title'
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>
            <br />
            <div>
              <label>Body: </label>
              <br />
              <textarea
                name='body'
                onChange={this.onChange}
                value={this.state.body}
              />
            </div>
            <br />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

NewBlogForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { addPost }
)(NewBlogForm);
