import React from 'react'
import {connect} from 'react-redux'
import {fetchPendings, updateQuantity} from '../store/cart'

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.modQuant = this.modQuant.bind(this)
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
    await this.props.getCart()
    this.calcTotal()
  }

  async modQuant(item, mod) {
    await this.props.updateQuantity(item.id, item.quantity + mod)
    this.setState({
      total: this.state.total + mod * item.product.price
    })
  }
  render() {
    return (
      <div className="cart">
        {this.props.cart.length > 0 ? (
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2>Shopping cart loading</h2>
        )}
        <h4>{`total: ${this.state.total}`}</h4>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchPendings(6)),
    updateQuantity: (item, quant) => dispatch(updateQuantity(item, quant))
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
