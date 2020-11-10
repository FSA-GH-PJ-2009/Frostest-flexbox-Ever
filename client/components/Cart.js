import React from 'react'
import {connect} from 'react-redux'

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h2>Shopping cart!</h2>
  }
}

const mapState = state => {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapState)(ShoppingCart)
