import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import "../../Css/SuccessPage.css"

const SuccessPage: React.FC = () => {
  const [webhookData, setWebhookData] = useState<any>(null);
  const [transactionSaved, setTransactionSaved] = useState(false);
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/webhook/last-event", {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        console.log("✅ Data received from webhook:", response.data);
        setWebhookData(response.data);
      })
      .catch((error) => {
        console.error("❌ Error retrieving data from webhook:", error);
      });
  }, [token]);

  useEffect(() =>{
    if (webhookData && !transactionSaved) {
        handleSaveTransaction();
    }
  }, [webhookData]);

  const handleSaveTransaction = () => {
    if (!webhookData) return;
    
    const transactionData = {
        stripeSessionId: webhookData.session_id,
        amount: webhookData.amount / 100,
        userId: webhookData.user_id,
        progettoId: webhookData.progetto_id, 
      };

    axios
        .post("http://localhost:8080/api/transactions", transactionData, {
            headers: {Authorization: `Bearer ${token}`
        },
        })
        .then((response) => {
            console.log("transaction saved successfully", response.data);
            setTransactionSaved(true);
        })
        .catch((error) => {
            console.error("error saving transaction", error);
        });
  };

  return (
    <div className="payment-status-container">
      {transactionSaved && <Confetti />}

      <h1 className="thank-you-message">
        Thank you for your support!!<br /> Know that you played an influential role <br /> in making a dream come true! 🎊
      </h1>

      <div className="button-container">
        <button className="navigate-button" onClick={() => navigate("/dashboard")}>
          🏠 Go to Dashboard!
        </button>
        <button className="navigate-button" onClick={() => navigate("/projects")}>
          📂 Explore Projects
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
