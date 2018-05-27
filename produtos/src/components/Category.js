import React, { Component } from 'react'

class Category extends Component {
    render() {
        return (
            <div>
                <h1>Category { this.props.match.params.catId }</h1>
            </div>
        )
    }
}

export default Category