import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import themeLight from './theme/themeLight'

import App from './App';

import { createStore } from 'redux'
import {Provider} from 'react-redux'
import reducers from './stores/index'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <ThemeProvider theme={themeLight}>
    <CssBaseline />
    <Provider store={store}>
        <App />
    </Provider>
  </ThemeProvider>,
  
  document.getElementById('root')
);

