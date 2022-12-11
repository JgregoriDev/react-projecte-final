import React, { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import "../assets/style/Space.css";

// import "../assets/style/Payment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe(`${process.env.STRIPE_KEY}`);
const stripePromise = loadStripe(

  'pk_test_51M152rABbpLr9iO4CBr74NqVkAXruYuGc8RpFb6sARa4QqWb4QcPRFbw4PR5wtLQ19lfkcFiLEn55yR7FPKtKe9G00kehBBPp7'
);
export default function Payment({ props }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")).token;
    console.log(token);
    // Create PaymentIntent as soon as the page loads
    fetch("http://vos.es/api/v1/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      "Authorization": `"Bearer ${token}`,
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="h-75-vh">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}