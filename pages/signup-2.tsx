import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonInput, IonItem, IonLabel, IonCheckbox, IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './signup-2.css';

const SignUP2: React.FC = () => {
    return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/signup" />
          </IonButtons>
        </IonToolbar>
        <div className="logo-wrap">
          <img src="src/assets/images/Pasig Logo.png" alt="Pasig Logo" className="logo" />
        </div>
        <h2 className="title">Tourism AI</h2>
        <p className="subtitle">DISCOVER THE PASIG WITH AI GUIDANCE!</p>
        <div className="login-card"> 
        
        <div className="form">
          <p className="formSubtitle">Create Accout</p>
            <IonLabel position="stacked">Email</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={mailOutline} slot="start" className="input-icon" />
              <IonInput placeholder="Enter your email" type="email" className="text-input" />
            </IonItem>

            <IonLabel position="stacked">Password</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
              <IonInput placeholder="Enter your password" type="password" className="text-input" />
            </IonItem>

            <IonLabel position="stacked">Confirm Password</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
              <IonInput placeholder="Confirm your password" type="password" className="text-input" />
            </IonItem>

            <IonButton expand="block" className="login-button">Sign Up</IonButton>
        </div>
        </div>
            
      </IonContent>
    </IonPage>
    );
}

export default SignUP2;