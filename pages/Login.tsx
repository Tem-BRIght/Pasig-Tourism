import React from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './Login.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        
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

            <IonLabel position="stacked">Password</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
              <IonInput placeholder="Enter your password" type="password" className="text-input" />
            </IonItem>
            
            <IonButton expand="block" className="login-button" routerLink="/Tab1">Log In</IonButton>

            <div className="forgot"><Link to="/forgot">Forgot password?</Link></div>

            <div className="divider"><span>Or continue with</span></div>

            <IonButton fill="outline" className="google-button">
              <img src="src/assets/images/google Logo.png" alt="google" />
              Continue with Google
            </IonButton>

            <div className="signup"><Link to="/signup">Don't have an account? Sign up</Link></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;