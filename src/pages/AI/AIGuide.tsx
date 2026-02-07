import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonLoading,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { mic, micOff, send, volumeHigh, volumeMute, settingsOutline } from 'ionicons/icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AIGuide.css';

// Gemini API Key
const GEMINI_API_KEY = 'AIzaSyCB3ubd4gxCFzDS7ONPSqYbY5QXGYG4SLU';

type ChatMessage = {
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
};

const suggestedQuestions = [
  'What are the top 5 must-see places in Pasig?',
  'Recommend historical sites near me',
  'Plan a 1-day heritage tour',
  'Find family-friendly spots in Pasig',
];

const AIGuide: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm your Pasig AI Guide 👋\nHow can I help you explore today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState('en-US');
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceGender, setVoiceGender] = useState<'any' | 'female' | 'male'>('any');
  
  // Refs for speech recognition and synthesis
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices);
    };
    
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speakTextEnhanced = (text: string) => {
    if (isMuted) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      let preferredVoice: SpeechSynthesisVoice | undefined;

      if (voiceGender === 'female') {
        preferredVoice = voices.find(v => /female|zira|susan|karen|hazel|samantha|victoria/i.test(v.name) || /female/i.test(v.voiceURI));
      } else if (voiceGender === 'male') {
        preferredVoice = voices.find(v => /male|david|mark|paul|alex|james|robert/i.test(v.name) || /male/i.test(v.voiceURI));
      } else if (voiceGender === 'any') {
        preferredVoice = voices.find(voice => voice.lang.includes('en') && voice.default);
      }

      if (!preferredVoice) {
        preferredVoice = voices.find(voice => voice.lang.includes('en'));
      }

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = voiceSpeed;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!GEMINI_API_KEY) {
      return "API key not configured. Please set the Gemini API key.";
    }

    try {
      const prompt = `You are an AI tourism guide for Pasig City, Philippines.
Provide helpful, accurate, and engaging information about Pasig City.

User question: ${userMessage}

Please provide a helpful response that includes:
1. Direct answer to the question
2. Additional helpful information
3. If asking for recommendations, provide 3-5 specific places with brief descriptions
4. Keep response concise (2-4 paragraphs max)

Response:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I apologize, but I'm having trouble connecting to the information service. Please try again or ask another question about Pasig City!";
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setLoading(true);
    setInput('');

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(text);

      const aiMessage: ChatMessage = {
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Speak the AI response
      speakTextEnhanced(aiResponse);

    } catch (error) {
      console.error('Error in sendMessage:', error);
      const errorMessage: ChatMessage = {
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ai-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle>
            <div className="title">AI Pasig Guide</div>
            <div className="subtitle">Assistant for Pasig City</div>
          </IonTitle>
          <IonButton slot="end" fill="clear" onClick={() => setShowSettings(true)}>
            <IonIcon icon={settingsOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonModal isOpen={showSettings} onDidDismiss={() => setShowSettings(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
            <IonButton slot="end" fill="clear" onClick={() => setShowSettings(false)}>Close</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Mute</IonLabel>
              <IonToggle checked={isMuted} onIonChange={e => {
                const val = (e.detail as any).checked;
                setIsMuted(val);
                if (val) {
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                }
              }} />
            </IonItem>

            <IonItem>
              <IonLabel>Voice Gender</IonLabel>
              <IonSelect value={voiceGender} onIonChange={e => setVoiceGender(e.detail.value)}>
                <IonSelectOption value="any">Any</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
                <IonSelectOption value="female">Female</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>

      <IonContent className="chat-content">
        <IonLoading isOpen={loading} message="Generating response..." />
        
        {/* CHAT MESSAGES */}
        <div className="chat-area">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-container ${msg.sender === 'ai' ? 'ai' : 'user'}`}
            >
              {msg.sender === 'ai' && (
                <img src="/assets/images/AI/ALI 2.png" alt="AI Profile" className="profile-img" />
              )}
              <div
                className={`bubble ${msg.sender === 'ai' ? 'ai' : 'user'}`}
                onClick={msg.sender === 'ai' ? () => speakTextEnhanced(msg.text) : undefined}
                style={msg.sender === 'ai' ? { cursor: 'pointer' } : undefined}
              >
                {msg.text}
                <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.7 }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
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

          {/* TYPING INDICATOR */}
          {isTyping && (
            <div className="message-container ai">
              <img src="/assets/images/AI/ALI 2.png" alt="AI Profile" className="profile-img" />
              <div className="bubble ai typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="input-area">
          <button
            className="icon-btn"
            onClick={toggleListening}
            style={{ color: isListening ? '#ef4444' : '#2563eb' }}
            aria-label="Toggle voice input"
          >
            <IonIcon icon={isListening ? micOff : mic} />
          </button>

          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question or tap mic..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          />

          <button
            className="send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <IonIcon icon={send} />
          </button>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default AIGuide;