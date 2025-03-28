
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Notifiche.css";

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    answer?: string;
}

const Notifiche: React.FC = () => {
  const [messages, setMessaggi] = useState<Contact[]>([]);
  const [chatAperta, setChatAperta] = useState<number | null>(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/contatti/utente/${userId}`)
      .then((response) => setMessaggi(response.data))
      .catch((error) => console.error("Error retrieving notifications:", error));
  }, [userId]);

  const toggleChat = (id: number) => {
    setChatAperta((prev) => (prev === id ? null : id));
  };

  return (
    <div className="notifiche-container">
      <h2>Your communications</h2>
      {messages.length === 0 ? (
        <p>You haven't sent any messages yet.</p>
      ) : (
        <ul className="notifiche-list">
          {messages.map((msg) => (
            <li key={msg.id} className="notifica-card">
              <h3>{msg.subject}</h3>
              <p><strong>Submitted by:</strong> {msg.name} ({msg.email})</p>

              <button className="chat-toggle-btn" onClick={() => toggleChat(msg.id)}>
                {chatAperta === msg.id ? "Close conversation" : "Open conversation"}
              </button>

              {chatAperta === msg.id && (
                <div className="chat-box">
                  <div className="chat-bolla user">
                    <p>{msg.message}</p>
                    <span>You</span>
                  </div>

                  {msg.answer ? (
                    <div className="chat-bolla admin">
                      <p>{msg. answer}</p>
                      <span>Admin</span>
                    </div>
                  ) : (
                    <p className="no-reply">No response received yet.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifiche;
