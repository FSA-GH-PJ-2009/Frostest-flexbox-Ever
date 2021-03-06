import axios from 'axios'

const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const MODIFY_QUANT = 'MODIFY_QUANT'
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_ORDER_PRICE = 'UPDATE_ORDER_PRICE'

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

const newOrderPrice = (itemId, price) => ({
  type: UPDATE_ORDER_PRICE,
  itemId,
  price
})

//THUNKS

export const fetchCart = userId => {
  return async dispatch => {
    try {
      if (userId) {
        const {data: cart} = await axios.get(`/api/cart/${userId}`)
        dispatch(updateCart(cart))
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
      //findOrCreate order, increate quant by 1
      let order = await axios.post('/api/cart', {
        userId,
        productId
      })
      orderId = order.id
    } else {
      //search for whether it already exists in cart
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

export const updateOrderPrice = (itemId, orderPrice) => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/item/${itemId}`, {orderPrice: orderPrice})
      dispatch(newOrderPrice(itemId, orderPrice))
    } catch (error) {
      console.log('ITEM ID', itemId)
      console.log('orderPrice', orderPrice)
      console.log('Error updating orderPrice')
    }
  }
}

export default function(state = defaultCart, action) {
  let newState, i, j
  switch (action.type) {
    case UPDATE_CART:
      return action.cart

    case ADD_TO_CART:
      newState = [...state]
      let newItem
      action.cart.map(item => {
        newItem = true
        newState.map(prevItem => {
          if (prevItem.id == item.id) {
            newItem = false
            prevItem.quantity += item.quantity
          }
        })
        if (newItem) newState.push(item)
      })
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

    case UPDATE_ORDER_PRICE:
      newState = []
      state.map(item => {
        if (item.id != action.itemId) {
          newState.push({...item, orderPrice: action.orderPrice})
        }
      })
      return newState

    default:
      return state
  }
}
