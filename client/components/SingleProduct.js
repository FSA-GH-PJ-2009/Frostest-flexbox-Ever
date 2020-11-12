import React from 'react'
import {connect} from 'react-redux'

import {fetchProduct} from '../store/singleProduct'
import {addItem} from '../store/cart'

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
          <button
          onClick={() => {
            this.props.addToCart(product, this.props.userId, this.props.cart)
          }}
        >
          Add to Cart
        </button>
          </div>
        </div>

      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct,
  cart: state.cart,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchProduct(id)),
  addToCart: (item, userId, cart) => dispatch(addItem(item, userId, cart))
})

export default connect(mapState, mapDispatch)(SingleProduct)
