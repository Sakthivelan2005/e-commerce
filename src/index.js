import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './Pages/CartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
  <Provider>
        <App 
    Title={'Welcome to Rakshita Collection'}/>
    </Provider>

);

