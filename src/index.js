import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ModalProvider from './context/ModalProvider';
import { AuthProvider } from './context/AuthProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <Provider store={store}>
        <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  // </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
