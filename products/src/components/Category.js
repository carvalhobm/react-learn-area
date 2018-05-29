import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Category extends Component {
    constructor(props) {
        super(props)

        this.loadProducts = this.loadProducts.bind(this)
        this.renderProducts = this.renderProducts.bind(this)

        this.state = {
            id: null
        }
    }

    loadProducts(id) {
        this.setState({
            id: id
        })
        this.props.loadProducts(id)
        this.props.readCategory(id)
    }

    componentDidMount() {
        const id = this.props.match.params.catId
        this.loadProducts(id)
    }

    componentWillReceiveProps(newProps) {
        const id = newProps.match.params.catId
        if(id !== this.state.id) {
            this.loadProducts(id)
        }
    }

    renderProducts(product) {
        return (
            <p className="well" key={product.id} >
                {product.product }
                <button className="btn btn-sm btn-danger" 
                    onClick={() => 
                        this.props.deleteProduct(product)
                            .then(response => this.loadProducts(this.props.match.params.catId)) }>Delete</button>
                <Link to={"/products/edit/" + product.id}>Edit</Link>
            </p>
        )
    }

    render() {
        return (
            <div>
                { this.props.category &&
                    <h1>{ this.props.category.category }</h1>
                }
                {this.props.products.length === 0 &&
                    <p className="alert alert-danger">Nothing found</p>
                }
                {this.props.products.map(this.renderProducts)}
            </div>
        )
    }
}

export default Category