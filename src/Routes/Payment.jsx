import React, { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import "../assets/style/Space.css";
import { useNavigate } from 'react-router-dom'

import "../assets/style/Payment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe(`${process.env.STRIPE_KEY}`);
const stripePromise = loadStripe(`pk_test_51M152rABbpLr9iO4CBr74NqVkAXruYuGc8RpFb6sARa4QqWb4QcPRFbw4PR5wtLQ19lfkcFiLEn55yR7FPKtKe9G00kehBBPp7`);

export default function Payment(props) {
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))?.token;
    console.log(token);
    // Create PaymentIntent as soon as the page loads
    if (!token) {
      navigate("/")
    }
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    //  headers: { "Content-Type": "application/json" },
    // fetch("http://vos.es/api/v1/payment", {
    // fetch("http://vos.es/api/v1/payment", {
    fetch(`${process.env.REACT_APP_DOMAIN_API}payment`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify({ "items": [{ id: "xl-tshirt", "preu": props.getJoc().preu }] }),
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
    <div className="container-fluid">
      <div className="row h-75-vh">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <div className="d-grid justify-content-center align-items-center w-100 h-auto">
            <button className="btn btn-primary w-25 my-1" onClick={()=>navigate(-1)} title="Tornar arrere">
              <i class="bi bi-arrow-left"></i>
            </button>
            <h1>Comprar joc</h1>
            <h3>Titol: {props?.getJoc()?.titul}</h3>
            <img src={`${props?.getJoc()?.portada}`} className="w-100 h-auto" alt="" />
            <p>Preu: {props?.getJoc()?.preu}€</p>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
        <div className="col-12 col-lg-2"></div>
      </div>

    </div>
  );
}