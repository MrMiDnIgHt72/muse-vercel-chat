import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "You" }];
    setMessages(newMessages);

    try {
      const res = await fetch("/chat.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });

      const data = await res.json();
      setMessages([...newMessages, { text: data.response, sender: "AI" }]);
    } catch {
      setMessages([...newMessages, { text: "Error contacting AI", sender: "AI" }]);
    }

    setInput("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Chat with Muse AI</h1>
      <div style={{ border: "1px solid #ccc", padding: "1rem", height: "400px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}><strong>{m.sender}:</strong> {m.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "80%", padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <button onClick={sendMessage} style={{ padding: "0.5rem 1rem" }}>Send</button>
    </div>
  );
}
