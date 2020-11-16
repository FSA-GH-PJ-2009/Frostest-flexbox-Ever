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

export const modifyInventory = (productId, newQuant) => {
  return async () => {
    try {
      await axios.put(`/api/products/${productId}`, {inventory: newQuant})
    } catch (error) {
      console.error('Error modifying product inventory')
    }
  }
}

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
