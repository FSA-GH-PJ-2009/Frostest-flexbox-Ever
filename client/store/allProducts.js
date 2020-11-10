import axios from 'axios'
import {Product} from '../../server/db/models'

//INIT STATE
const initState = []

//ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS'

//ACTION CREATORS
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

//THUNKS
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(setProducts(products))
    } catch (error) {
      console.error('Error fetching products')
    }
  }
}

//REDUCER
export default function productsReducer(state = initState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
