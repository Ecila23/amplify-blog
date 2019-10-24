import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, removePost } from '../actions/actions';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const postId = Number(event.target.id);
    this.props.removePost(postId);
  }

  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    return (
      <div>
        {this.props.posts.posts.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
            <p>
              <em>written by: {post.userId}</em>
            </p>
            <p>{post.body}</p>
            {this.props.auth.currentUser === post.userId ? (
              <button id={index} onClick={this.handleClick}>
                delete
              </button>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

BlogPosts.propTypes = {
  removePost: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getPosts, removePost }
)(BlogPosts);
