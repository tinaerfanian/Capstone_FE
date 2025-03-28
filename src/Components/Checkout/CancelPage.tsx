import React from "react";
import { Link } from "react-router-dom";

const CancelPage: React.FC = () => {
  return (
    <div className="payment-status-container">
      <h1>Payment Cancelled ❌</h1>
      <p>It looks like you have cancelled your payment. If you need help, please contact our support.</p>
      <Link to="/payment">
        <button className="payment-btn">Retry Payment</button>
      </Link>
      <Link to="/">
        <button className="payment-btn secondary">Back to Home</button>
      </Link>
    </div>
  );
};

export default CancelPage;
