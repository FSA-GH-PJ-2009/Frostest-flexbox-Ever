import axios from 'axios'
import {UPDATE} from 'sequelize/types/lib/query-types'

const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const MODIFY_QUANT = 'MODIFY_QUANT'

/*
Initial state
*
*/
const defaultCart = []

/*
*ACTION CREATORS
*/
const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

const addToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

const removeItem = item => ({
  type: REMOVE_ITEM,
  item
})

const modifyQuant = (item, quantity) => ({
  type: MODIFY_QUANT,
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
          id: item.id,
          quantity: item.quantity,
          product: item.product
        })
      })
      dispatch(addToCart(cart))
    } catch (error) {
      console.error('There was an error fetching the cart')
    }
  }
}

export const updateQuantity = (itemId, quantity, userId) => {
  return async dispatch => {
    if (userId) await axios.put(`/api/cart/${itemId}`, {quantity})
    dispatch(modifyQuant(itemId, quantity))
  }
}

export const deleteItem = (itemId, userId) => {
  return async dispatch => {
    if (userId) await axios.delete(`/api/cart/${itemId}`)
    dispatch(removeItem(itemId))
  }
}

export const loginUpdateCart = (cart, userId) => {
  return async dipsatch => {
    let newItem
    const newCart = cart.map(async item => {
      newItem = await axios.put(`/api/cart/${itemId}`, {
        userId
      })
      return newItem.data
    })
    dispatch(updateCart(newCart))
  }
}

export default function(state = defaultCart, action) {
  let newState
  switch (action.type) {
    case UPDATE_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, ...action.cart]
    case REMOVE_ITEM:
      return state.filter(item => {
        return item.id != action.item
      })
    case MODIFY_QUANT:
      newState = []
      state.map(item => {
        if (item.id != action.item) {
          newState.push(item)
        } else {
          newState.push({...item, quantity: action.quantity})
        }
      })
      return newState
    default:
      return state
  }
}
