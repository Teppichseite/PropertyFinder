import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/app'
import rootReducer from './reducers'

//init store
const store = createStore(rootReducer);

//build app 
render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
);