import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import allProducts from './allProducts'
import singleProduct from './singleProduct'
import currentOrder from './currentOrder'
import orderHistory from './orderHistory'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
  user,
  cart,
  allProducts,
  singleProduct,
  currentOrder,
  orderHistory
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(persistedReducer, middleware)
export const persistor = persistStore(store)

export default store
export * from './user'
