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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';

import 'font-awesome/css/font-awesome.min.css'
const store = configureStore()

const lightTheme = getMuiTheme({
  palette: {
    primary1Color: '#5D4037',
    accent1Color: '#607D8B',
  },
});

const darkTheme = getMuiTheme({
  palette: {
    primary1Color: '#FF9800',
    accent1Color: '#FF5722',
    textColor: '#FFFFFF',
    secondaryTextColor: fade('#FFFFFF', 0.7),
    alternateTextColor: '#FFFFFF',
    canvasColor: '#303030',
    borderColor: fade('#FFFFFF', 0.3),
    disabledColor: fade('#FFFFFF', 0.3),
    pickerHeaderColor: fade('#FFFFFF', 0.12),
    clockCircleColor: fade('#FFFFFF', 0.12),
  },
});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <MuiThemeProvider muiTheme={lightTheme}>
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
