import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props)

        this.auth = this.auth.bind(this)

        this.props.auth.onAuthStateChanged((user) => {
            this.props.authStateChanged(user)
        })
    }

    auth(provider) {
        this.props.auth.signInWithPopup(this.props.providers[provider])
    }

    render() {
        if(this.props.isLoggedIn) {
            return <Redirect to="/chat" />
        }
        return(
            <div className="container form-signin">
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
                <label className="sr-only">Email address</label>
                <input type="email" className="form-control" placeholder="Email address" />
                <label className="sr-only">Password</label>
                <input type="password" className="form-control" placeholder="Password" />
                <button disabled className="btn btn-success btn-block" type="submit">Sign in</button>
                <p className="text-center">or</p>
                <button className="btn btn-primary btn-block" onClick={() => this.auth('facebook')}>
                    Login with Facebook
                </button>
            </div>
        )
    }
}

export default Login