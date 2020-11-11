import React from 'react'
import {connect} from 'react-redux'

import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

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
  getProduct: id => dispatch(fetchProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
