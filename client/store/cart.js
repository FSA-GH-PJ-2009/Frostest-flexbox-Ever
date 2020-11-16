import axios from 'axios'

const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const MODIFY_QUANT = 'MODIFY_QUANT'
const CLEAR_CART = 'CLEAR_CART'

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

export const clearCart = () => ({
  type: CLEAR_CART
})

const modifyQuant = (item, quantity) => ({
  type: MODIFY_QUANT,
  item,
  quantity
})

//CR NOTE:
//Make sure to remove commented out code blocks from your master branch :)
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
    if (userId) await axios.put(`/api/cart/item/${itemId}`, {quantity})
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

export default function(state = defaultCart, action) {
  let newState, i, j, toAdd
  switch (action.type) {
    case UPDATE_CART:
      return action.cart
    case ADD_TO_CART:
      //CR NOTE:
      //We can possibly make this code more efficient by using a map (object) instead of nested for loops
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
    case CLEAR_CART:
      return []
    default:
      return state
  }
}
