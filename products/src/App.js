import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './components/Home'
import Products from './components/Products'
import About from './components/About'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <a href="/" className="navbar-brand">
                  Product Management
                </a>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <h1>Product Management</h1>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route exact path="/about" component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
