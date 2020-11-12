import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteItem} from '../store/cart'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      orderPlaced: false
    }
  }
  async componentDidMount() {
    await this.props.getCart(this.props.userId)
    this.calcTotal()
  }
  calcTotal() {
    let total = 0
    this.props.cart.map(item => {
      total += item.quantity * item.product.price
    })
    this.setState({
      total
    })
  }

  handleChange() {}
  // HOPE: WRITE THIS FUNC

  handleCheckout() {}
  // HOPE: WRITE THIS FUNC

  render() {
    const {user} = this.req
    const {cart} = this.props
    return (
      <div>
        <h1>Checkout</h1>
        {this.state.orderPlaced ? (
          <div className="order-placed">
            <h2>Your order has been placed 🍜</h2>
          </div>
        ) : (
          <div className="checkout-list">
            {cart.map(item => {
              return (
                <div key={item.id} className="checkout-item">
                  <img src={item.product.imageUrl} />
                  <div className="checkout-item-info">
                    <h3>{item.product.name}</h3>
                    <h3>Quantity: {item.quantity}</h3>
                    <h3>Price: {item.product.price}</h3>
                  </div>
                </div>
              )
            })}
            <h2>Total: {this.state.total}</h2>
          </div>
        )}
        <form className="checkout-form" onSubmit={this.handleCheckout}>
          <div>
            <label>First Name:</label>
            <input
              className="input-box"
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              className="input-box"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Card Number:</label>
            <input
              className="input-box"
              type="text"
              name="cardNumber"
              value={this.state.cardNumber}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              className="input-box"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Zip Code:</label>
            <input
              className="input-box"
              type="text"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Complete Purchase</button>

          {/* HOPE:FINISH WRITING FORM */}
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  removeItem: itemId => dispatch(deleteItem(itemId))
})

export default connect(mapState, mapDispatch)(Checkout)
