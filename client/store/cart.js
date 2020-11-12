import axios from 'axios'

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

export const fetchCart = userId => {
  return async dispatch => {
    try {
      if (userId) {
        const {data: cart} = await axios.get(`/api/cart/${userId}`)
        dispatch(updateCart(cart))
      } else {
        //const cart = localStorage.getItem('cart')
        //dispatch(updateCart(JSON.parse(cart)))
      }
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

export const addItem = (item, userId, cart) => {
  return async dispatch => {
    const productId = item.id
    let orderId = cart.length > 0 ? cart[cart.length - 1].id + 1 : 0

    if (userId) {
      let order = await axios.post('/api/cart', {
        userId,
        productId
      })
      orderId = order.id
    } else {
      cart.map(cartItem => {
        if (cartItem.product.id == productId) {
          orderId = cartItem.id
        }
      })
      dispatch(
        addToCart([
          {
            id: orderId,
            quantity: 1, //only add 1 to the store total
            product: item
          }
        ])
      )
    }
  }
}

/*
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
*/

export default function(state = defaultCart, action) {
  let newState, i, j, toAdd
  switch (action.type) {
    case UPDATE_CART:
      return action.cart
    case ADD_TO_CART:
      newState = [...state]
      let newItem
      for (i = 0; i < action.cart.length; i++) {
        newItem = true
        for (j = 0; j < newState.length; j++) {
          if (newState[j].id == action.cart[i].id) {
            newItem = false
            newState[j].quantity += action.cart[i].quantity
          }
        }
        if (newItem) newState.push(action.cart[i])
      }
      return newState

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
