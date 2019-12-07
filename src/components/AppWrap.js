import React from 'react'
import App from './App'

// store
import { Provider } from 'react-redux'
import { store } from '../store/index'

// marerial theme
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
const defaultTheme = createMuiTheme()

export default () => (
    <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
            <App />
        </ThemeProvider>
    </Provider>
)
