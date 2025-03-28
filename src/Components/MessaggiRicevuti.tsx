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

const MessagesReceived: React.FC = () => {
  const [messages, setMessaggi] = useState<Contact[]>([]);
  const [answers, setRisposte] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/contatti/tutti")
      .then((res) => setMessaggi(res.data))
      .catch((err) => console.error("Error retrieving messages:", err));
  }, []);

  const handleSend = async (id: number) => {
    try {
      const answer = answers[id];
      await axios.put(`http://localhost:8080/api/contatti/rispondi/${id}`, answer, {
        headers: { "Content-Type": "text/plain" }
      });
      alert("Answer sent!");
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  return (
    <div className="notifiche-container">
      <h2>Manage received messages</h2>
      {messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <ul className="notifiche-list">
          {messages.map((msg) => (
            <li key={msg.id} className="notifica-card">
              <h3>{msg.subject}</h3>
              <p><strong>From:</strong> {msg.name} ({msg.email})</p>
              <p><strong>Message:</strong> {msg.message}</p>

              {msg. answer ? (
                <div className="chat-bolla admin">
                  <p>{msg.answer}</p>
                  <span>Already answered</span>
                </div>
              ) : (
                <>
                  <textarea
                    placeholder="Write your answer..."
                    rows={4}
                    style={{ width: "100%", marginTop: "10px", borderRadius: "8px", padding: "8px" }}
                    value={answers[msg.id] || ""}
                    onChange={(e) =>
                      setRisposte({ ...answers, [msg.id]: e.target.value })
                    }
                  />
                  <button
                    className="chat-toggle-btn"
                    onClick={() => handleSend(msg.id)}
                  >
                   Send reply
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesReceived;
