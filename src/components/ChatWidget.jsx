import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isFirst, setIsFirst] = useState(true);
  const messagesEndRef = useRef(null);
  const chatWidgetRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWidgetRef.current && !chatWidgetRef.current.contains(event.target)) {
        if (event.target.id !== 'chat-toggle') {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const waitMsg = { sender: "bot", text: "در انتظار پاسخ..." };
    setMessages((prev) => [...prev, waitMsg]);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, is_first: isFirst }),
      });
      setIsFirst(false);
      const data = await res.json();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: data.reply || "❌ مشکلی در پاسخ به وجود آمد." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: "❌ ارتباط با سرور برقرار نشد." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div id="chat-toggle" onClick={() => setIsOpen(!isOpen)}>💬</div>
      {isOpen && (
        <div id="chat-widget" ref={chatWidgetRef}>
          <button id="chat-close" onClick={() => setIsOpen(false)}>×</button>
          <div id="chat-header">پشتیبانی لند امین</div>
          <div id="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <textarea
            id="chat-input"
            placeholder="سوال خود را بنویسید..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button id="chat-send" onClick={sendMessage}>ارسال</button>
        </div>
      )}
    </>
  );
};

export default ChatWidget;