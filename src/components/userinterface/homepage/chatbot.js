import React, { useState } from "react";

const ChatWidget = ({ isVisible }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isVisible) return null;  // Do not render when not visible

    // Function to send message to Flask API
    const sendMessage = async () => {
        if (!userInput.trim()) return;
    
        setLoading(true);
        const newMessage = { sender: "user", text: userInput };
        setMessages((prev) => [...prev, newMessage]);
    
        try {
            console.log("Sending request to Flask API...");
    
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userInput }),
            });
    
            console.log("API Response Status:", response.status);
    
            if (!response.ok) {
                console.error("Error response:", await response.text());
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("API Response Data:", data);
    
            if (data.response) {
                const geminiResponse = { sender: "bot", text: data.response };
                setMessages((prev) => [...prev, geminiResponse]);
            } else {
                setMessages((prev) => [...prev, { sender: "bot", text: "No response from server." }]);
            }
        } catch (error) {
            console.error("API Error:", error);
            alert(`Error: ${error.message}`);  // Show detailed error in alert
            setMessages((prev) => [...prev, { sender: "bot", text: "Error connecting to server." }]);
        } finally {
            setLoading(false);
            setUserInput("");
        }
    };
    

    return (
        <div className="chat-container">
            <h3>Chat with Gemini!</h3>

            <div className="chat-content">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "user" ? "user" : "bot"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>

            <style>{`
                .chat-container {
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    width: 350px;
                    height: 400px;
                    background: white;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 20px;
                }

                .chat-content {
                    overflow-y: auto;
                    flex: 1;
                    margin-bottom: 10px;
                }

                .message {
                    padding: 10px;
                    margin: 5px;
                    border-radius: 5px;
                    max-width: 70%;
                }

                .user {
                    align-self: flex-end;
                    background: #007bff;
                    color: white;
                }

                .bot {
                    align-self: flex-start;
                    background: #f1f1f1;
                    color: black;
                }

                .chat-input {
                    display: flex;
                    gap: 10px;
                }

                .chat-input input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .chat-input button {
                    padding: 10px 15px;
                    background: #007bff;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .chat-input button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default ChatWidget;
