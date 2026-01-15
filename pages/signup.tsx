import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonInput, IonItem, IonLabel, IonCheckbox } from '@ionic/react';
import './signup.css';

const SignUP: React.FC = () => {
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
            <p className="formSubtitle">Create Accout</p>
            <IonLabel position="stacked">First Name</IonLabel>
            <IonItem className="input-item">
              <IonInput placeholder="Enter your first name" type="text" className="text-input" />
            </IonItem>

            <IonLabel position="stacked">Last Name</IonLabel>
            <IonItem className="input-item">
              <IonInput placeholder="Enter your last name" type="text" className="text-input" />
            </IonItem>     

            <IonLabel position="stacked">Suffix Name</IonLabel>
            <IonItem className="input-item">
              <IonInput placeholder="ex: Jr., Sr. I, II" type="text" className="text-input" />
              <div className="checkbox-row">
              <IonCheckbox />
              <label className="checkbox-label">None</label>
              </div>  
            </IonItem>
             
            <IonButton expand="block" className="next-button" routerLink="/signup-2">Next</IonButton>
            
            <div className="signup"><Link to="/login">Already have an account?</Link></div>
            
            <div className="divider"><span>Or continue with</span></div>

            <IonButton fill="outline" className="google-button">
              <img src="src/assets/images/google Logo.png" alt="google" />
              Continue with Google
            </IonButton>

        </div>
        </div>
            
      </IonContent>
    </IonPage>
    );
}

export default SignUP;