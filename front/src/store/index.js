import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import CurrentUserReducer from './current-user/reducer'
import ChannelReducer from './channel/reducer'

import LeaseChannelReducer from './lease-channel/reducer'
import AllocateChannelReducer from './allocate-channel/reducer'

const reducers = combineReducers({
  currentUser: CurrentUserReducer,
  channel: ChannelReducer,
  lease: LeaseChannelReducer,
  allocate: AllocateChannelReducer,
  form: formReducer
})

const enhancers = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers
)

export default createStore(reducers, composedEnhancers)
