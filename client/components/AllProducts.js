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
                <button
                  onClick={() => {
                    this.props.addToCart(
                      product,
                      this.props.userId,
                      this.props.cart
                    )
                  }}
                >
                  Add to Cart
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.allProducts,
  cart: state.cart,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addToCart: (item, userId, cart) => dispatch(addItem(item, userId, cart))
})

export default connect(mapState, mapDispatch)(AllProducts)
