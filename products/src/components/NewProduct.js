import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class NewProduct extends Component {
    constructor(props) {
        super(props)

        this.handleNewProduct = this.handleNewProduct.bind(this)

        this.state = {
            redirect: false
        }
    }

    handleNewProduct(){
        const product = {
            category: this.refs.category.value,
            product: this.refs.product.value
        }

        this.props.createProduct(product)
            .then(response => {
                this.setState({
                    redirect: '/products/category/' + product.category
                })
            })
    }

    render() {
        const { categories } = this.props
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>
        }
        return (
            <div>
                <h2>New Product</h2>
                <select ref='category'>
                    { categories
                        .map((c) => <option key={c.id} value={c.id}>{c.category}</option>)
                    }
                </select>
                <input
                    placeholder="New product Name"
                    className="form-control"
                    ref='product' />
                <button className="btn btn-sm btn-success" onClick={this.handleNewProduct}>Salvar</button>
            </div>
        )
    }
}

export default NewProduct