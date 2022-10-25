import "../src/assets/css/style.css";
import AppRouter from "./router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

function App() {
  // const [isPaymentLoading, setPaymentLoading] = useState(false);
  // const stripe = useStripe();
  // const elements = useElements();

  // const clientSecret = getClientSecret();

  return <AppRouter />;
}

export default App;
