import axios from 'axios'

//INIT STATE
const initState = {}

//ACTION TYPES
const SET_PRODUCT = 'SET_PRODUCT'

//ACTION CREATORS
const setProduct = product => ({
  type: SET_PRODUCT,
  product
})

//THUNKS
export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data: product} = await axios.get(`/api/products/${productId}`)
      dispatch(setProduct(product))
    } catch (error) {
      console.error('ERROR fetching product!')
    }
  }
}

//REDUCER
export default function productReducer(state = initState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
