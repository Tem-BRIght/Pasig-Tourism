import React from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, IonIcon, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { callOutline } from 'ionicons/icons';
import './forgot.css';

const Forgot_Number: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>

        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
        </IonToolbar>

        <div className="logo-wrap">
          <img src={"public/assets/images/Pasig Logo.png"} alt="Pasig Logo" className="logo" />
        </div>
        <h2 className="title">Tourism AI</h2>
        <p className="subtitle">DISCOVER THE PASIG WITH AI GUIDANCE!</p>
        <div className="login-card">
          <div className="form">
            <IonLabel position="stacked">Mobile Number</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={callOutline} slot="start" className="input-icon" />
              <IonInput placeholder="Enter your mobile number" type="text" className="text-input" />
            </IonItem>
            <IonButton expand="block" className="next-button">Next</IonButton>
            <div className="forgot"><Link to="/forgot">Search by email</Link></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Forgot_Number;