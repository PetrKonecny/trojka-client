import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { CookiesProvider } from 'react-cookie';

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <MuiThemeProvider>
        	<CookiesProvider>
    			<App />
    		</CookiesProvider>
        </MuiThemeProvider>
    </BrowserRouter>
  </Provider> 
  ,
  document.getElementById('root')
)
registerServiceWorker();
