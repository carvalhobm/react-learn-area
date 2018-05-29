import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProductsHome from './ProductsHome'
import NewProduct from './NewProduct'
import Category from './Category'
import EditProduct from './EditProduct'

class Products extends Component {
    constructor(props) {
        super(props)

        this.renderCategory = this.renderCategory.bind(this)
        this.handleNewCategory = this.handleNewCategory.bind(this)
        this.handleEditCategory = this.handleEditCategory.bind(this)
        this.editCategory = this.editCategory.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)

        this.state = {
            editingCategory: ''
        }
    }
    
    componentDidMount() {
        this.props.loadCategories()
    }

    handleNewCategory(event) {
        if(event.keyCode === 13) {
            this.props.addCategory(this.refs.category.value)
                .then(response => {
                        this.props.loadCategories()
                        this.refs.category.value = ""
                    }
                )
        }
    }

    handleEditCategory(event) {
        if(event.keyCode === 13) {
            this.props.editCategory({
                id: this.state.editingCategory,
                category: this.refs['cat-' + this.state.editingCategory].value
            })
            .then((response) => {
                this.props.loadCategories()
                this.setState({
                    editingCategory: ''
                })
            }) 
        }
    }

    editCategory(category) {
        this.setState({
            editingCategory: category.id
        })
    }
    
    cancelEditing() {
        this.setState({
            editingCategory: ''
        })
    }

    renderCategory(cat) {
        return (
            <li key={cat.id}>
                { this.state.editingCategory === cat.id &&
                    <div className="input-group">
                        <div className="input-group-btn">
                            <input type="text" className="form-control"
                                defaultValue={cat.category}
                                onKeyUp={this.handleEditCategory}
                                ref={'cat-' + cat.id}
                                />
                            <button className="btn" onClick={this.cancelEditing} >Cancel</button>
                        </div>
                        
                    </div>
                }
                { this.state.editingCategory !== cat.id &&
                    <div>
                        <a onClick={() => this.props.removeCategory(cat)} >
                            <i className="glyphicon glyphicon-remove"></i>
                        </a>
                        <a onClick={() => this.editCategory(cat)} >
                            <i className="glyphicon glyphicon-pencil"></i>
                        </a>
                        <Link to={`/products/category/${cat.id}`}>{cat.category}</Link>
                    </div>
                }
            </li>
        )
    }

    render() {
        const { match, categories } = this.props
        return (
        <div className="row">
            <div className="col-md-2">
                <h3>Categories</h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    { categories.map(this.renderCategory) }
                </ul>
                <div className="well well-sm">
                    <input type="text" 
                        onKeyUp={this.handleNewCategory}
                        className="form-control"
                        ref="category" 
                        placeholder="Category Name" />

                </div>
                <Link to='/products/newProduct'>New Product</Link>
            </div>
            <div className="col-md-10">
                <Route exact path={match.url} component={ProductsHome} />
                <Route exact path={match.url + "/newProduct"} 
                    render={(props) => {
                        return (
                            <NewProduct {...props}
                                categories={categories}
                                createProduct={this.props.createProduct}
                            />
                        )}
                    } 
                />
                <Route exact path={match.url + "/edit/:productId"} 
                    render={(props) => {
                        return (
                            <EditProduct {...props} 
                                readProduct={this.props.readProduct}
                                editProduct={this.props.editProduct}
                                categories={categories}
                            />
                        )}
                    }
                />
                <Route exact path={match.url + "/category/:catId"} 
                    render={(props) => {
                        return (
                            <Category {...props} 
                                loadProducts={this.props.loadProducts}
                                deleteProduct={this.props.deleteProduct}
                                products={this.props.products}
                                readCategory={this.props.readCategory}
                                category={this.props.category}
                            />
                        )}
                    }
                />
            </div>
        </div>
        )
    }
}

export default Products