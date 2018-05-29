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
  constructor(props) {
    super(props)

    this.readCategory = this.readCategory.bind(this)
    this.loadCategories = this.loadCategories.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    
    this.readProduct = this.readProduct.bind(this)
    this.loadProducts = this.loadProducts.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {
      categories: [],
      products: [],
      category: null
    }
  }

  readCategory(category) {
    this.props.api.readCategory(category)
      .then(response => {
        this.setState({
          category: response.data
        })
      })
  }

  loadCategories() {
    this.props.api.loadCategories()
        .then((response) => {
            this.setState({
                categories: response.data
            })
        })
  }

  removeCategory(category) {
    this.props.api.removeCategory(category.id)
      .then(response => this.loadCategories())
  }

  addCategory(category) {
    return this.props.api.addCategory(category)
  }

  editCategory(category) {
    return this.props.api.editCategory(category)
  }

  readProduct(id) {
    return this.props.api.readProduct(id)
  }

  loadProducts(category) {
    this.props.api.loadProducts(category)
      .then(response => {
        this.setState({
            products: response.data
        })
    })
  }
  
  createProduct(product) {
    return this.props.api.createProduct(product)
  }
  
  editProduct(product) {
    return this.props.api.editProduct(product)
  }

  deleteProduct(product) {
    return this.props.api.deleteProduct(product.id)
  }

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
            <Route path="/products" 
              render={(props) => {
                return (<Products {...props} 
                  readCategory={this.readCategory}
                  category={this.state.category}
                  
                  loadCategories={this.loadCategories} 
                  categories={this.state.categories} 
                  removeCategory={this.removeCategory} 
                  addCategory={this.addCategory} 
                  editCategory={this.editCategory} 
                  
                  readProduct={this.readProduct}
                  loadProducts={this.loadProducts}
                  createProduct={this.createProduct}
                  editProduct={this.editProduct}
                  deleteProduct={this.deleteProduct}
                  products={this.state.products}
                  /> 
                )
              }
            } />
            <Route exact path="/about" component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
