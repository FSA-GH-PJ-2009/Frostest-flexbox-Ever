import React from 'react'
import {connect} from 'react-redux'

import {fetchProduct} from '../store/single-product'

class SingleProduct extends React.Component {
  render() {
    const {product} = this.props
    return (
      <div key={product.id} className="product">
        <img className="product-img" src={product.imageUrl} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button type="submit">Add to Cart</button>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
