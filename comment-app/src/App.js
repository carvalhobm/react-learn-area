import React, { Component } from 'react';
import 'bootstrap-css-only'
import './css/App.css';

import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from './components/Login'
import Chat from './components/Chat'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.postNewComment = this.postNewComment.bind(this);
    this.authStateChanged = this.authStateChanged.bind(this);

    this.state = {
      comments: {},
      isLoggedIn: false,
      user: {}
    }
  }

  authStateChanged(user) {
    if(user) {
      this.setState({ 
        isLoggedIn: true,
        user: user 
      })
      
      this.refComments = this.props.base.syncState('comments', {
        context: this,
        state: 'comments'
      })
    } else {
      this.setState({ 
        isLoggedIn: false,
        user: {} 
      })
    }
  }

  postNewComment(comment) {
    comment.user = {
      uid: this.state.user.uid,
      name: this.state.user.displayName
    }
    
    const comments = { ...this.state.comments }
    const timestamp = Date.now();
    
    comments[`comm-${timestamp}`] = comment;

    this.setState({
      comments: comments
    })
  }

  render() {
    return (
      <Router>
        <div style={{height: '100%'}}>
          <Route exact path="/" 
              render={(props) => {
                return (
                  <Login {...props} 
                    auth={this.props.auth}
                    authStateChanged={this.authStateChanged}
                    providers={this.props.providers}
                    isLoggedIn={this.state.isLoggedIn}
                    user={this.state.user}
                  />
                )
              }
            }
          />
          <Route exact path="/chat"
              render={(props) => {
                return (
                    <Chat {...props} 
                      auth={this.props.auth}
                      comments={this.state.comments}
                      isLoggedIn={this.state.isLoggedIn}
                      user={this.state.user}
                      postNewComment={this.postNewComment}
                    />
                )
              }
            }
          />
        </div>
      </Router>
    )
  }
}

export default App;
