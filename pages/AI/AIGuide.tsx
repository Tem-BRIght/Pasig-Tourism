import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { sparkles } from 'ionicons/icons';
import './AIGuide.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

type MessageType = {
  message: string;
  sentTime: string;
  sender: string;
  direction: 'incoming' | 'outgoing';
  position: 'single';
};

const AIGuide: React.FC = () => {
  const API_KEY = "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";
  const systemMessage = {
    "role": "system", "content": "You are a travel assistant for Pasig City, Philippines. Help users plan trips, suggest places, and answer questions about tourism. Explain things clearly and helpfully."
  }

  const [messages, setMessages] = useState<MessageType[]>([
    {
      message: "Mabuhay! I'm ALI, your AI travel assistant for Pasig City. Ask me anything about planning your trip!",
      sentTime: "just now",
      sender: "ALI",
      direction: "incoming",
      position: "single"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: string) => {
    const newMessage = {
      message,
      direction: 'outgoing' as const,
      sender: "user",
      position: "single" as const,
      sentTime: new Date().toLocaleTimeString()
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: any[]) {
    let apiMessages = chatMessages.map((messageObject: any) => {
      let role = "";
      if (messageObject.sender === "ALI") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ALI",
        direction: "incoming" as const,
        position: "single" as const,
        sentTime: new Date().toLocaleTimeString()
      }]);
      setIsTyping(false);
    });
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>AI Travel Assistant</IonTitle>
          <IonIcon icon={sparkles} slot="end" color="primary" className="ion-margin-end" />
        </IonToolbar>
      </IonHeader>

      <IonContent className="chat-content">
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ALI is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Ask me anything..." onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </IonContent>
    </IonPage>
  );
};

export default AIGuide;