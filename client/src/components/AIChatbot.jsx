import { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const botReplies = {
  'hello': 'Hi there! 👋 I\'m RoomBot, your AI housing assistant. I can help you find rooms, match flatmates, or answer any questions!',
  'hi': 'Hello! 😊 Looking for a room or a flatmate? I\'m here to help!',
  'room': 'Great! To find the perfect room, just tell me — which city are you in, what\'s your budget, and do you prefer a PG, apartment, or hostel?',
  'flatmate': 'Finding a compatible flatmate is my specialty! 🎯 Our AI analyses your lifestyle, habits, and budget to find your perfect match. Head over to the Flatmate Finder page!',
  'price': 'Prices vary by city! In Bangalore, 1BHKs start from ₹10,000. PGs start from ₹6,000. Shall I show you options in a specific city?',
  'bangalore': 'Bangalore has amazing options! Popular areas: Koramangala, HSR Layout, Whitefield, Indiranagar. Budget starting from ₹8,000/month. Want me to filter by area?',
  'mumbai': 'Mumbai is vibrant! Budget options: Andheri, Malad, Thane from ₹12,000. Premium: Bandra, Powai from ₹25,000. What\'s your budget range?',
  'ai': 'Our AI compatibility score analyses 20+ factors including lifestyle, sleep schedule, budget, cleanliness, and social habits to give you the best match! ✨',
  'safe': 'Safety is our top priority! All owners are verified, listings are checked, and tenant reviews are displayed. We also support secure in-app messaging. 🔒',
  'post': 'You can post a listing for free! Click "Post Listing" in the nav bar. It takes under 5 minutes to list your property. 🏠',
  'default': 'That\'s a great question! For detailed help, you can browse our listings or use the Flatmate Finder. What else can I assist you with? 😊',
};

const suggestions = [
  '🏠 Find rooms in Bangalore',
  '🤝 How does AI matching work?',
  '💰 What are the price ranges?',
  '🔒 Is the platform safe?',
  '📝 How to post a listing?',
];

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const [key, reply] of Object.entries(botReplies)) {
    if (key !== 'default' && lower.includes(key)) return reply;
  }
  return botReplies.default;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hi! I'm RoomBot 🤖 Your AI assistant for finding rooms and flatmates. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(userText);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
      setIsTyping(false);
      setHasNew(true);
    }, 900 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Bubble */}
      <button
        id="chatbot-toggle-btn"
        className={`chatbot-bubble ${isOpen ? 'chatbot-bubble--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI chat assistant"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            <circle cx="9" cy="10" r="1" fill="currentColor"/>
            <circle cx="12" cy="10" r="1" fill="currentColor"/>
            <circle cx="15" cy="10" r="1" fill="currentColor"/>
          </svg>
        )}
        {hasNew && !isOpen && <span className="chatbot-bubble__dot" />}
      </button>
      <div className="chatbot-bubble__label">Ask AI</div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="chatbot-panel animate-fadeInUp">
          {/* Header */}
          <div className="chatbot-panel__header">
            <div className="chatbot-panel__avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div>
              <div className="chatbot-panel__name">RoomBot AI</div>
              <div className="chatbot-panel__status">
                <span className="chatbot-panel__status-dot" />
                Online · Powered by AI
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-panel__messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="chatbot-msg__avatar">🤖</div>
                )}
                <div className="chatbot-msg__bubble">{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg__avatar">🤖</div>
                <div className="chatbot-msg__bubble chatbot-msg__typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="chatbot-panel__suggestions">
            {suggestions.map((s, i) => (
              <button key={i} className="chatbot-suggestion" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-panel__input-row">
            <input
              ref={inputRef}
              className="chatbot-panel__input"
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              id="chatbot-input"
            />
            <button
              id="chatbot-send-btn"
              className="chatbot-panel__send"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
