import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, updateQuantity, deleteItem} from '../store/cart'
import {me} from '../store/user'
import {Link} from 'react-router-dom'

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.modQuant = this.modQuant.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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

  async componentDidMount() {
    await this.props.fetchUser()
    await this.props.getCart(this.props.userId)
    this.calcTotal()
  }

  async modQuant(item, mod) {
    await this.props.updateQuantity(
      item.id,
      item.quantity + mod,
      this.props.userId
    )
    this.setState({
      total: this.state.total + mod * item.product.price
    })
  }
  async handleRemove(item) {
    await this.props.removeItem(item.id, this.props.userId)
    this.setState({
      total: this.state.total - item.quantity * item.product.price
    })
  }
  render() {
    return (
      <div className="cart">
        {this.props.cart ? (
          <div>
            <div className="pending-products">
              {this.props.cart.map(item => (
                <div className="single-pending" key={item.id}>
                  <img src={item.product.imageUrl} />
                  <div className="pending-info">
                    <h6>{item.product.name}</h6>
                    <h6>{`$${item.product.price}`}</h6>
                    <div className="pending-quantity">
                      <button onClick={() => this.modQuant(item, -1)}>-</button>
                      <h6>{`Quantity: ${item.quantity}`}</h6>
                      <button onClick={() => this.modQuant(item, 1)}>+</button>
                      <button onClick={() => this.handleRemove(item)}>
                        Remove from cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link className="peruse-button" to="/checkout">
              checkout
            </Link>
          </div>
        ) : (
          <h2>Shopping cart is empty</h2>
        )}
        <h4>{`total: ${this.state.total}`}</h4>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(fetchCart(userId)),
    updateQuantity: (itemId, quant, userId) =>
      dispatch(updateQuantity(itemId, quant, userId)),
    removeItem: (itemId, userId) => dispatch(deleteItem(itemId, userId)),
    fetchUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
