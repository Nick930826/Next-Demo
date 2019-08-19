import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 

const initailState = {
  count: 0
}

const userInitailState = {
  username: 'Nick'
}

function countReducer (state = initailState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + action.num
      }
    default:
      return state
  }
}

function userReducer (state = userInitailState, action) {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return {
        ...state,
        username: action.name
      }
    default:
      return state
  }
}

const allReducer = combineReducers({
  counter: countReducer,
  user: userReducer
})

// 监听store状态变化的方法
// store.subscribe(() => {
//   console.log('changed', store.getState())
// })

export function add (num) {
  return {
    type: 'ADD',
    num
  }
}

function asyncAdd (num) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 2000)
  }
}

export default function initializeStore (state) {
  const store = createStore(
    allReducer,
    Object.assign({}, { counter: initailState, user: userInitailState }, state),
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}