import React from 'react'
import {connect} from 'react-redux'

import {fetchOrders} from '../store/orderHistory'

class orderHistory extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getOrders(this.props.userId)
  }
  render() {
    return (
      <div className="order-history">
        <h2>Order history</h2>
        {this.props.orders.map(order => <h4>{order.orderDate}</h4>)}
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
