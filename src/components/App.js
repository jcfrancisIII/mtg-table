import React from 'react'
import Home from './Home'

// store
import { Provider } from 'react-redux'
import { store } from '../store/configureStore'

export default () => (
    <Provider store={store}>
        <Home />
    </Provider>
)
