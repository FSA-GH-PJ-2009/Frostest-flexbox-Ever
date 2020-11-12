import React from 'react'
import {connect} from 'react-redux'

import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    console.log(this.props)
    const {product} = this.props
    return (
      <div key={product.id} className="single-product-container">
        <div className="single-product">
          <img className="single-product-img" src={product.imageUrl} />
          <div className="single-product-info">
            <div className="single-product-text">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
