import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class EditProduct extends Component {
    constructor(props) {
        super(props)

        this.handleEditProduct = this.handleEditProduct.bind(this)

        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.props.readProduct(this.props.match.params.productId)
            .then(response => {
                    this.refs.product.value = response.data.product
                    this.refs.category.value = response.data.category
                }
            )
    }

    handleEditProduct() {
        const product = {
            id: this.props.match.params.productId,
            category: this.refs.category.value,
            product: this.refs.product.value
        }

        this.props.editProduct(product)
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
                <h2>Edit Product</h2>
                <select ref='category'>
                    { categories
                        .map((c) => <option key={c.id} value={c.id}>{c.category}</option>)
                    }
                </select>
                <input
                    placeholder="New product Name"
                    className="form-control"
                    ref='product' 
                    />
                <button className="btn btn-sm btn-success" onClick={this.handleEditProduct}>Salvar</button>
            </div>
        )
    }
}

export default EditProduct