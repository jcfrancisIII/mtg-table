import React from 'react'
import App from './App'

// store
import { Provider } from 'react-redux'
import { store } from '../store/index'

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
)
