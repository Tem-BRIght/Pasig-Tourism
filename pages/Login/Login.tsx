import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonPage, IonButton, IonInput, 
  IonItem, IonLabel, IonIcon, IonLoading, IonAlert,
  InputCustomEvent, InputChangeEventDetail
} from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertHeader('Validation Error');
      setAlertMessage('Please enter both email and password');
      setShowAlert(true);
      return;
    }

    setShowLoading(true);
    try {
      const response = await login(email, password);
      setShowLoading(false);
      
      // Store user info for profile
      localStorage.setItem('profilePic', '/assets/images/Temporary.png');
      localStorage.setItem('profileName', `${response.user.firstName} ${response.user.lastName}`);
      localStorage.setItem('profileEmail', response.user.email);
      
      // Redirect to home
      history.push('/home');
    } catch (error: any) {
      setShowLoading(false);
      setAlertHeader('Login Failed');
      setAlertMessage(error.error || error.message || 'Invalid email or password');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        
        <div className="logo-wrap">
          <img src="public/assets/images/Pasig Logo.png" alt="Pasig Logo" className="logo" />
        </div>
        <h2 className="title">Tourism AI</h2>
        <p className="subtitle">DISCOVER THE PASIG WITH AI GUIDANCE!</p>
        
        <div className="login-card">
          <div className="form">
            <IonLabel position="stacked">Email</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={mailOutline} slot="start" className="input-icon" />
              <IonInput 
                placeholder="Enter your email" 
                type="email" 
                className="text-input"
                value={email}
                onIonChange={(e: InputCustomEvent<InputChangeEventDetail>) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonLabel position="stacked">Password</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
              <IonInput 
                placeholder="Enter your password" 
                type="password" 
                className="text-input"
                value={password}
                onIonChange={(e: InputCustomEvent<InputChangeEventDetail>) => setPassword(e.detail.value!)}
              />
            </IonItem>
            
            <IonButton 
              expand="block" 
              className="login-button" 
              onClick={handleLogin}
            >
              Log In
            </IonButton>

            <div className="forgot">
              <a href="/forgot">Forgot password?</a>
            </div>

            <div className="divider"><span>Or continue with</span></div>

            <IonButton fill="outline" className="google-button">
              <img src="/public/assets/images/google Logo.png" alt="google" />
              Continue with Google
            </IonButton>

            <div className="signup">
              <a href="/signup">Don't have an account? Sign up</a>
            </div>
          </div>
        </div>

        <IonLoading
          isOpen={showLoading}
          message={'Logging in...'}
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertHeader}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;