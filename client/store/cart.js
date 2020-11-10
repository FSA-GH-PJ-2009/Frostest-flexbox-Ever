import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const MODIFY_QUANT = 'MODIFY_QUANT'

/*
Initial state
*
*/
//Actual default
const defaultCart = {}

//testing default
/*
const defaultCart = {
  1: {
    name: 'zoodles',
    quant: 2,
    imageUrl: ''
  },
  2: {
    name: 'whole wheat noodles',
    quant: 1,
    imageUrl: ''
  }
}
*/

/*
*ACTION CREATORS
*/
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addItem = item => ({
  type: ADD_ITEM,
  item
})

const removeItem = item => ({
  type: REMOVE_ITEM,
  item
})

const modifyQuant = (item, quantity) => ({
  type: REMOVE_ITEM,
  item,
  quantity
})

export const fetchPendings = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      let cart = []
      data.map(item => {
        cart.push({
          quantity: item.quantity,
          product: item.product
        })
      })
      dispatch(getCart(cart))
    } catch (error) {
      console.error('There was an error fetching the cart')
    }
  }
}

export default function(state = defaultCart, action) {
  let newState
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM:
      return {...state, [action.item]: 1}
    case REMOVE_ITEM:
      newState = {}
      Object.keys(state).map(key => {
        if (key != action.item) {
          newState[key] = state[key]
        }
      })
      return newState
    case MODIFY_QUANT:
      newState = {}
      Object.keys(state).map(key => {
        if (key != action.item) {
          newState[key] = state[key]
        } else {
          newState[key] = {
            ...state[key],
            quantity: action.quantity
          }
        }
      })

    default:
      return state
  }
}
