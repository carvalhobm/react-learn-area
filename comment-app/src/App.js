import React, { Component } from 'react';
import 'bootstrap-css-only'

import NewComment from './components/NewComment'
import Comments from './components/Comments'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.postNewComment = this.postNewComment.bind(this);

    this.state = {
      comments: {}
    }

    this.refComments = this.props.base.syncState('comments', {
      context: this,
      state: 'comments'
    })

  }

  postNewComment(comment) {
    const comments = { ...this.state.comments }
    const timestamp = Date.now();
    
    comments[`comm-${timestamp}`] = comment;

    this.setState({
      comments: comments
    })
  }

  render() {
    return (
      <div className="container">
        <NewComment postNewComment={this.postNewComment} />
        <Comments comments={this.state.comments} />
      </div>
    );
  }
}

export default App;
