import axios from 'axios'

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
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(setProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//CR NOTE: How come initState is an array and not an object?
//If the fetch product route returns an object then our initial redux state should reflect that :)
//INIT STATE
const initState = []
//REDUCER
export default function productReducer(state = initState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
