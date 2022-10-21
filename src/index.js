import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51KqwahSGaCSVUxPYBWxb5HCBLWDyIRdesOdoNM59K49kx6OXaO24obUZu9nyEXAshonMnmbOvth0ST4h3ceyrBMy00NIGEihNS");

console.log("stripePromise", stripePromise);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);

