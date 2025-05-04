import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from './Pages/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "526620147494-io6di16rkp6c0847famqkbh45qfb0a3m.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    
  <Provider>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App 
    Title={'Welcome to Kirana Collection'}/>
    </GoogleOAuthProvider>
  </Provider>

);

