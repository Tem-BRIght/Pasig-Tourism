import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/react';
import { mic, send } from 'ionicons/icons';

import './AIGuide.css';

type ChatMessage = {
  text: string;
  sender: 'ai' | 'user';
  typing?: boolean;
};

const suggestedQuestions = [
  'What are the top 5 must-see places?',
  'Recommend historical sites near me',
  'Plan a 1-day heritage tour',
  'Find family-friendly spots'
];

const AIGuide: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm your Pasig AI Guide 👋\nHow can I help you explore today?",
      sender: 'ai'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "Great choice! 😊 Let me suggest some wonderful places in Pasig for you.",
          sender: 'ai'
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <IonPage>
      <IonHeader className="ai-header">
        <IonToolbar>
          <IonTitle>
            <div className="title">AI Pasig Guide</div>
            <div className="subtitle">Your personal assistant for Pasig City</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="chat-content">

        {/* CHAT MESSAGES */}
        <div className="chat-area">
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-container ${msg.sender === 'ai' ? 'ai' : 'user'}`}
            >
              {msg.sender === 'ai' && (
                <img src="public/assets/images/AI/ALI 2.png" alt="AI Profile" className="profile-img" />
              )}
              <div
                className={`bubble ${msg.sender === 'ai' ? 'ai' : 'user'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* SUGGESTED QUESTIONS */}
          {messages.length === 1 && (
            <div className="suggestions">
              <p className="suggest-title">Suggested Questions</p>
              {suggestedQuestions.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* TYPING */}
          {isTyping && (
            <div className="bubble ai typing">
              <span></span><span></span><span></span>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="input-area">
          <button className="icon-btn">
            <IonIcon icon={mic} />
          </button>

          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question..."
          />

          <button
            className="send-btn"
            onClick={() => {
              sendMessage(input);
              setInput('');
            }}
          >
            <IonIcon icon={send} />
          </button>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default AIGuide;
