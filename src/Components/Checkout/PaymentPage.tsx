import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../Css/PaymentPage.css";

const valore = "pk_test_51R1rSMIoWocUwFKpT3jYSfdL2hU5MRWn2Y6SUbdNVzbqS9n6d8hJqKIu1Uj7a5mgwj1a1LPldFkUX6AwsgQde2z800XmP57zmB";

const stripePromise = loadStripe(valore);

const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const handleCheckout = async () => {
    if (!token || !userId) {
      alert("You must be logged in to proceed with the payment.");
      return;
    }
  
    try {
      console.log(token);
      console.log(id, userId);
      const { data } = await axios.post(
        "http://localhost:8080/api/checkout/create-checkout-session",
        {
          userId: userId,
          progettoId: id, // 🔥 Usa l'ID dinamico

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error creating checkout session.");
      }
    } catch (error) {
      console.error("Error during checkout request:", error);
      alert("Error processing payment. Check the console for details.");
    }
  };
  

  return (
    <div className="payment-page">
      <h1 className="payment-title">Payment Page</h1>
      <button className= "payment-button" onClick={handleCheckout}>Proceed to Payment</button>
    </div>
  );
};

export default PaymentPage;
