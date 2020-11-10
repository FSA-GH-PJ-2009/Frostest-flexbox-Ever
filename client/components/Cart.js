import React from 'react'
import {connect} from 'react-redux'
import {fetchPendings} from '../store/cart'

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
  }

  async componentDidMount() {
    await this.props.getCart()
    let total = 0
    this.props.cart.map(item => {
      total += item.quantity * item.product.price
    })
    this.setState({
      total
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
                  <h6>{`Quantity: ${item.quantity}`}</h6>
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
    getCart: () => dispatch(fetchPendings(6))
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
