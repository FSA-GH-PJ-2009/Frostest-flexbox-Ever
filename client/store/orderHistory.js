import axios from 'axios'

//INIT STATE
const initState = []

//ACTION TYPES
const SET_ORDERS = 'SET_ORDERS'

//ACTION CREATORS
const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

//THUNKS
export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const {data: orders} = await axios.get(`/api/users/history/${userId}`)
      dispatch(setOrders(orders))
    } catch (error) {
      console.error('Error fetching orders')
    }
  }
}

//REDUCER
export default function orderReducer(state = initState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
