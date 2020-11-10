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
//const defaultCart = []

//testing default
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

const modifyQuant = (item, quant) => ({
  type: REMOVE_ITEM,
  item,
  quant
})

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
            quant: action.quant
          }
        }
      })

    default:
      return state
  }
}
