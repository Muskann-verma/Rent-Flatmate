import { useState, useRef, useEffect } from 'react';
import { mockMessages, mockUser } from '../data/mockData';
import './Chat.css';

export default function Chat() {
  const [activeConvo, setActiveConvo] = useState(mockMessages[0]);
  const [newMsg, setNewMsg] = useState('');
  const [conversations, setConversations] = useState(mockMessages);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConvo]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const msg = { id: Date.now(), sender: 'me', text: newMsg, time: 'Now' };
    const updated = conversations.map(c => {
      if (c.id === activeConvo.id) {
        return { ...c, messages: [...c.messages, msg] };
      }
      return c;
    });

    setConversations(updated);
    setActiveConvo(prev => ({ ...prev, messages: [...prev.messages, msg] }));
    setNewMsg('');

    // Simulate reply
    setTimeout(() => {
      const reply = { id: Date.now() + 1, sender: 'them', text: 'Thanks for your message! I\'ll get back to you shortly. 😊', time: 'Now' };
      setConversations(curr => curr.map(c => {
        if (c.id === activeConvo.id) return { ...c, messages: [...c.messages, msg, reply] };
        return c;
      }));
      setActiveConvo(prev => ({ ...prev, messages: [...prev.messages, reply] }));
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page page-enter">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar__header">
          <h2>Messages</h2>
          <span className="badge badge-primary">{conversations.length}</span>
        </div>

        <div className="chat-sidebar__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search conversations..." className="chat-sidebar__search-input" />
        </div>

        <div className="chat-sidebar__list">
          {conversations.map(convo => {
            const lastMsg = convo.messages[convo.messages.length - 1];
            const isActive = activeConvo.id === convo.id;
            return (
              <button
                key={convo.id}
                className={`chat-convo-item ${isActive ? 'chat-convo-item--active' : ''}`}
                onClick={() => setActiveConvo(convo)}
              >
                <div className="chat-convo-avatar-wrap">
                  <img src={convo.contact.avatar} alt={convo.contact.name} className="chat-convo-avatar" />
                  {convo.contact.lastSeen === 'Active now' && <div className="chat-convo-online" />}
                </div>
                <div className="chat-convo-info">
                  <div className="chat-convo-name">{convo.contact.name}</div>
                  <div className="chat-convo-preview">
                    {lastMsg.sender === 'me' ? 'You: ' : ''}{lastMsg.text.slice(0, 40)}...
                  </div>
                </div>
                <div className="chat-convo-meta">
                  <span className="chat-convo-time">{lastMsg.time}</span>
                  {isActive && <div className="chat-convo-dot" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-main__header">
          <div className="chat-main__contact">
            <img
              src={activeConvo.contact.avatar}
              alt={activeConvo.contact.name}
              className="chat-main__avatar"
            />
            <div>
              <div className="chat-main__name">{activeConvo.contact.name}</div>
              <div className="chat-main__status">
                {activeConvo.contact.lastSeen === 'Active now' && (
                  <span className="chat-status-dot" />
                )}
                {activeConvo.contact.lastSeen}
              </div>
            </div>
          </div>

          <div className="chat-main__listing-badge">
            <span>🏠 {activeConvo.listing}</span>
          </div>

          <div className="chat-main__actions">
            <button className="btn btn-ghost btn-icon" aria-label="Call">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 10.31a19.79 19.79 0 01-3.07-8.67A2 2 0 011.93 0h3.18a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.72v2.2z"/>
              </svg>
            </button>
            <button className="btn btn-ghost btn-icon" aria-label="More options">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {/* Date separator */}
          <div className="chat-date-sep">Today</div>

          {activeConvo.messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.sender === 'me' ? 'chat-msg--me' : 'chat-msg--them'}`}>
              {msg.sender === 'them' && (
                <img src={activeConvo.contact.avatar} alt="" className="chat-msg-avatar" />
              )}
              <div className="chat-msg__bubble-wrap">
                <div className="chat-msg__bubble">
                  {msg.text}
                </div>
                <div className="chat-msg__time">{msg.time}</div>
              </div>
              {msg.sender === 'me' && (
                <img src={mockUser.avatar} alt="" className="chat-msg-avatar" />
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-row">
            <button className="btn btn-ghost btn-icon" aria-label="Attach file">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
              </svg>
            </button>
            <input
              id="chat-message-input"
              type="text"
              placeholder="Type a message..."
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chat-input"
            />
            <button className="btn btn-ghost btn-icon" aria-label="Emoji">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </button>
            <button
              id="chat-send-btn"
              className="btn btn-primary btn-icon"
              onClick={sendMessage}
              disabled={!newMsg.trim()}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
