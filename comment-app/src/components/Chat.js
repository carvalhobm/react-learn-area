import React, { Component } from 'react'

import NewComment from './NewComment'
import Comments from './Comments'
import { Redirect } from 'react-router-dom';

class Chat extends Component {
    render() {
        if(!this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <nav className="navbar navbar-navbar-expand-lg navbar-dark bg-dark sticky-top">
                    <div className="navbar-brand">
                        <img  alt={ this.props.user.displayName } 
                        src={ this.props.user.photoURL }  
                        className="rounded-circle mr-2"
                        />
                        <span>{ this.props.user.displayName }</span>
                    </div>
                    <button className="btn btn-sm btn-primary float-right" onClick={() => this.props.auth.signOut()}>Logoff</button>
                </nav>
                <div className="container">
                    <div className="row m-1">
                        <div className="col">
                            <NewComment postNewComment={this.props.postNewComment} /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Comments comments={this.props.comments} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat