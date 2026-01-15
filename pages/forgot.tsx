import React from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonInput, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import './forgot.css';

const Forgot: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
        </IonToolbar>
        
        <div className="logo-wrap">
          <img src="src/assets/images/Pasig Logo.png" alt="Pasig Logo" className="logo" />
        </div>
        <h2 className="title">Tourism AI</h2>
        <p className="subtitle">DISCOVER THE PASIG WITH AI GUIDANCE!</p>
        <div className="login-card">
          <div className="form">
            <IonLabel position="stacked">Email</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={mailOutline} slot="start" className="input-icon" />
              <IonInput placeholder="Enter your email" type="email" className="text-input" />
            </IonItem>
            <IonButton expand="block" className="next-button">Next</IonButton>
            <div className="forgot"><Link to="/forgot_Number">Search by mobile number</Link></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Forgot;