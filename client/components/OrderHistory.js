import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchOrders} from '../store/orderHistory'

class orderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: {}
    }
  }
  async componentDidMount() {
    await this.props.getOrders(this.props.userId)
  }
  render() {
    return (
      <div className="order-history">
        <h1>Order history</h1>
        {this.props.orders.map(order => {
          const date = new Date(order.orderDate)
          return (
            <div key={order.id} className="past-order">
              <h2 className="date-string">{date.toString()}</h2>
              <div className="past-order-items">
                {order.pendings.map(pending => {
                  return (
                    <div className="history-item">
                      <img src={pending.product.imageUrl} />
                      <div className="history-text">
                        <Link
                          className="noodle-name"
                          to={`/products/${pending.product.id}`}
                        >
                          {pending.product.name}
                        </Link>
                        <p>
                          {` ($${pending.orderPrice}) x ${pending.quantity}`}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <h5>{`Total: $${order.pendings.reduce(
                (total, pending) =>
                  total + pending.orderPrice * pending.quantity,
                0
              )}`}</h5>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  orders: state.orderHistory
})

const mapDispatch = dispatch => ({
  getOrders: id => dispatch(fetchOrders(id))
})

export default connect(mapState, mapDispatch)(orderHistory)
