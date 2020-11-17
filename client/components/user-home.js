import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import OrderHistory from './OrderHistory'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName} = props

  return (
    <div>
      <h3>Welcome, {firstName || email}</h3>
      <OrderHistory />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
