import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchProducts} from '../store/allProducts'
import {addItem} from '../store/cart'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const {products} = this.props
    return (
      <div className="all-products-component">
        <h1>All Noodles</h1>
        <div className="all-products-list">
          {products.map(product => {
            return (
              <div key={product.id} className="product">
                <img className="product-img" src={product.imageUrl} />
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <button type="submit">Add to Cart</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.allProducts
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
