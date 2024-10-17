import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the Context
export const userContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Use 'Provider' with a capital P and pass the value */}
    <userContext.Provider value="manish">
      <App />
    </userContext.Provider>
  </React.StrictMode>
);

// Performance measurement
reportWebVitals();
