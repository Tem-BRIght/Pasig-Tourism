import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonPage, IonHeader, IonToolbar, 
  IonButtons, IonBackButton, IonButton, IonInput, 
  IonItem, IonLabel, IonIcon, IonLoading, IonAlert,
  InputCustomEvent, InputChangeEventDetail
} from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './signup-2.css';

const SignUP2: React.FC = () => {
  const history = useHistory();
  const [step1Data, setStep1Data] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');

  useEffect(() => {
    // Get step 1 data from session storage
    const data = sessionStorage.getItem('signupStep1');
    if (data) {
      setStep1Data(JSON.parse(data));
    } else {
      // If no step 1 data, go back to step 1
      history.push('/signup');
    }
  }, [history]);

  const handleSignUp = async () => {
    if (!step1Data) {
      setAlertHeader('Error');
      setAlertMessage('Please complete Step 1 first');
      setShowAlert(true);
      return;
    }

    if (!email || !password || !confirmPassword) {
      setAlertHeader('Validation Error');
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertHeader('Validation Error');
      setAlertMessage('Passwords do not match');
      setShowAlert(true);
      return;
    }

    if (password.length < 6) {
      setAlertHeader('Validation Error');
      setAlertMessage('Password must be at least 6 characters');
      setShowAlert(true);
      return;
      }

    setShowLoading(true);
    try {
      // Combine step 1 and step 2 data
      
      // Clear session storage
      sessionStorage.removeItem('signupStep1');
      
      // Show success message
      setAlertHeader('Registration Successful');
      setAlertMessage('Your account has been created. Please log in.');
      setShowAlert(true);
      
      // After alert is dismissed, redirect to login
      setTimeout(() => {
        history.push('/login');
      }, 1000);
      
    } catch (error: any) {
      setShowLoading(false);
      setAlertHeader('Registration Failed');
      setAlertMessage(error.error || error.message || 'Registration failed. Please try again.');
      setShowAlert(true);
    }
  };

  if (!step1Data) {
    return (
      <IonPage>
        <IonContent className="login-content">
          <div>Loading...</div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
         
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/signup" />
            </IonButtons>
          </IonToolbar>

        <div className="logo-wrap">
          <img src="/public/assets/images/Pasig Logo.png" alt="Pasig Logo" className="logo" />
        </div>
        <h2 className="title">Tourism AI</h2>
        <p className="subtitle">DISCOVER THE PASIG WITH AI GUIDANCE!</p>
        
        <div className="login-card"> 
          <div className="form">
            <p className="formSubtitle">Create Account</p>
            
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

            <IonLabel position="stacked">Confirm Password</IonLabel>
            <IonItem className="input-item">
              <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
              <IonInput 
                placeholder="Confirm your password" 
                type="password" 
                className="text-input"
                value={confirmPassword}
                onIonChange={(e: InputCustomEvent<InputChangeEventDetail>) => setConfirmPassword(e.detail.value!)}
              />
            </IonItem>

            <IonButton 
              expand="block" 
              className="login-button"
              onClick={handleSignUp}
            >
              Sign Up
            </IonButton>
          </div>
        </div>

        <IonLoading
          isOpen={showLoading}
          message={'Creating account...'}
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

export default SignUP2;