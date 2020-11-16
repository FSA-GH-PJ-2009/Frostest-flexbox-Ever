import axios from 'axios'

//INIT STATE
const initState = {}

//ACTION TYPES
const SET_ORDER = 'SET_ORDER'
const UPDATE_DATE = 'UPDATE_DATE'

//ACTION CREATORS
const receivedOrder = order => ({
  type: SET_ORDER,
  order
})

const dateUpdated = order => ({
  type: UPDATE_DATE,
  order
})

//THUNKS
export const fetchOrder = orderId => {
  return async dispatch => {
    try {
      const {data: order} = await axios.get(`/api/orders/${orderId}`)
      dispatch(receivedOrder(order))
    } catch (error) {
      console.error('Error fetching order')
    }
  }
}

export const updateDate = orderId => {
  return async dispatch => {
    try {
      const {data: order} = await axios.put(`/api/orders/${orderId}`, {
        orderDate: Date.now()
      })
      dispatch(dateUpdated(order))
    } catch (error) {
      console.error('Error updating orderDate')
    }
  }
}

//REDUCER
export default function productsReducer(state = initState, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    case UPDATE_DATE:
      return action.order
    default:
      return state
  }
}
