import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, clearCart, updateOrderPrice} from '../store/cart'
import {updateDate} from '../store/currentOrder'
import {modifyInventory} from '../store/singleProduct'
import {Login, Signup} from './auth-form'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      orderPlaced: false,
      firstName: '',
      lastName: '',
      cardNumber: '',
      address: '',
      zipCode: '',
      login: false,
      signUp: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.calcTotal = this.calcTotal.bind(this)
    this.openLogin = this.openLogin.bind(this)
    this.openSignup = this.openSignup.bind(this)
  }
  openLogin() {
    this.setState({login: true, signUp: false})
  }
  openSignup() {
    this.setState({login: false, signUp: true})
  }
  async componentDidMount() {
    await this.props.fetchCart(this.props.userId)
    this.calcTotal()
  }
  calcTotal() {
    let total = 0
    if (this.props.cart) {
      this.props.cart.map(item => {
        total += item.quantity * item.product.price
      })
      this.setState({
        total
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckout(e) {
    e.preventDefault()
    try {
      this.props.cart.map(cartItem => {
        this.props.updateOrderPrice(cartItem.id, cartItem.product.price)
        this.props.modifyInventory(
          cartItem.product.id,
          cartItem.product.inventory - cartItem.quantity
        )
      })
      this.props.updateDate(this.props.cart[0].orderId)
      this.setState({
        orderPlaced: true,
        firstName: '',
        lastName: '',
        cardNumber: '',
        address: '',
        zipCode: ''
      })
      this.props.clearCart()
      this.calcTotal()
    } catch (error) {
      console.error('Error submitting purchase form')
    }
  }

  render() {
    const {cart, userId} = this.props
    console.log(cart)
    return (
      <div className="checkout-component">
        <h1>Checkout</h1>
        <div className="checkout">
          {this.state.orderPlaced ? (
            <div className="order-placed">
              <h2>Your order has been placed 🍜</h2>
            </div>
          ) : (
            <div className="checkout-list">
              {cart ? (
                <div>
                  {cart.map(item => {
                    return (
                      <div key={item.id} className="checkout-item">
                        <img src={item.product.imageUrl} />
                        <div className="checkout-item-info">
                          <h3>{item.product.name}</h3>
                          <h3>Quantity: {item.quantity}</h3>
                          <h3>Price: {`$${item.product.price}`}</h3>
                        </div>
                      </div>
                    )
                  })}
                  <h2>Total: {`$${this.state.total.toFixed(2)}`}</h2>
                </div>
              ) : (
                <h2>Shopping cart is empty</h2>
              )}
            </div>
          )}
          {userId ? (
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
              <button className="purchase-button" type="submit">
                Complete Purchase
              </button>
            </form>
          ) : (
            <div>
              <h2>Please login or sign up to complete purchase</h2>
              <button type="submit" onClick={this.openLogin}>
                Login
              </button>
              <button type="submit" onClick={this.openSignup}>
                Sign Up
              </button>
              {this.state.login ? <Login /> : ''}
              {this.state.signUp ? <Signup /> : ''}
            </div>
          )}
        </div>
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
  clearCart: () => dispatch(clearCart()),
  updateOrderPrice: (itemId, price) =>
    dispatch(updateOrderPrice(itemId, price)),
  updateDate: orderId => dispatch(updateDate(orderId)),
  modifyInventory: (productId, newQuant) =>
    dispatch(modifyInventory(productId, newQuant))
})

export default connect(mapState, mapDispatch)(Checkout)
