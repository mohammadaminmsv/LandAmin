import React, { useState, useEffect, useRef } from "react";
import { FaComments } from 'react-icons/fa';
import { chatWithAssistant, getChatHistory } from "../services/Chat/ChatWidget";
import "../styles/ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatWidgetRef = useRef(null);
  const [unread, setUnread] = useState(false);

  // اسکرول به پایین هنگام تغییر پیام‌ها
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // مدیریت کلیک خارج از ویجت
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

    const userMessage = input;
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      setMessages(prev => [...prev, {
        text: userMessage,
        isUser: true,
        timestamp: new Date().toISOString()
      }]);

      // ارسال به سرور و دریافت پاسخ
      const isFirst = messages.length === 0;
      const response = await chatWithAssistant(userMessage, isFirst);

      setMessages(prev => [...prev, {
        text: response.reply,
        isUser: false,
        timestamp: new Date().toISOString()
      }]);

      // اگر چت بسته بود، نشانگر پیام خوانده نشده را فعال کن
      if (!isOpen) {
        setUnread(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.message || "خطا در ارسال پیام");

      // نمایش خطا به کاربر
      setMessages(prev => [...prev, {
        text: "متاسفانه مشکلی در ارتباط با سرور پیش آمده. لطفاً دوباره تلاش کنید.",
        isUser: false,
        isError: true,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // بارگذاری تاریخچه چت هنگام اولین باز شدن
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const loadChatHistory = async () => {
        try {
          const history = await getChatHistory();
          setMessages(history.map(msg => ({
            text: msg.content,
            isUser: msg.role === 'user',
            timestamp: msg.createdAt
          })));
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      };

      loadChatHistory();
    }
  }, [isOpen]);

  // مدیریت باز شدن چت و بازنشانی پیام‌های خوانده نشده
  const handleToggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      setUnread(false);
    }
  };

  // مدیریت ارسال با کلید Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        id="chat-toggle"
        onClick={handleToggleChat}
        className={isOpen ? 'chat-toggle-active' : ''}
        aria-label="چت پشتیبانی"
      >
        <FaComments size={24} color="white" />
        {unread && <span className="unread-badge" aria-hidden="true"></span>}
      </div>

      {isOpen && (
        <div id="chat-widget" ref={chatWidgetRef}>
          <button
            id="chat-close"
            onClick={() => setIsOpen(false)}
            aria-label="بستن پنجره چت"
          >
            ×
          </button>

          <div id="chat-header">
            <h2>پشتیبانی لند امین</h2>
          </div>

          <div id="chat-messages">
            {messages.length === 0 && (
              <div className="chat-message bot-message">
                سلام! چطور می‌تونم کمکتون کنم؟
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={`${msg.timestamp}-${idx}`}
                className={`chat-message ${msg.isUser ? 'user-message' : 'bot-message'} ${msg.isError ? 'error-message' : ''}`}
              >
                {msg.text}
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <textarea
              id="chat-input"
              placeholder="پیام خود را بنویسید..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              disabled={isLoading}
              aria-label="متن پیام"
            />

            <button
              id="chat-send"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="ارسال پیام"
            >
              {isLoading ? '...' : 'ارسال'}
            </button>
          </div>

          {error && (
            <div className="chat-error">
              {error}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;