import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 
import axios from 'axios'



const userInitailState = {
  
}


function userReducer (state = userInitailState, action) {
  switch (action.type) {
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

const allReducer = combineReducers({
  user: userReducer
})

// 监听store状态变化的方法
// store.subscribe(() => {
//   console.log('changed', store.getState())
// })
const LOGOUT = 'LOGOUT'
export function logout() {
  return (dispatch) => {
    axios.post('/logout').then(resp => {
      if (resp.status === 200) {
        dispatch({ type: LOGOUT })
      } else {
        console.error('resp', resp)
      }
    })
  }
}

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
    Object.assign({}, { user: userInitailState }, state),
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}