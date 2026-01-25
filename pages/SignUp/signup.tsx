import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonPage, IonHeader, IonToolbar, 
  IonButtons, IonBackButton, IonButton, IonInput, 
  IonItem, IonLabel, IonCheckbox,
  InputCustomEvent, InputChangeEventDetail,
  CheckboxCustomEvent, CheckboxChangeEventDetail
} from '@ionic/react';
import './signup.css';

const SignUP: React.FC = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffixName, setSuffixName] = useState('');
  const [hasSuffix, setHasSuffix] = useState(false);

  const handleNext = () => {
    // Store step 1 data in session storage
    sessionStorage.setItem('signupStep1', JSON.stringify({
      firstName,
      lastName,
      suffixName: hasSuffix ? '' : suffixName
    }));
    
    // Navigate to step 2
    history.push('/signup-2');
  };

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>

        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
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
            
            <IonLabel position="stacked">First Name</IonLabel>
            <IonItem className="input-item">
              <IonInput 
                placeholder="Enter your first name" 
                type="text" 
                className="text-input"
                value={firstName}
                onIonChange={(e: InputCustomEvent<InputChangeEventDetail>) => setFirstName(e.detail.value!)}
              />
            </IonItem>

            <IonLabel position="stacked">Last Name</IonLabel>
            <IonItem className="input-item">
              <IonInput 
                placeholder="Enter your last name" 
                type="text" 
                className="text-input"
                value={lastName}
                onIonChange={(e: InputCustomEvent<InputChangeEventDetail>) => setLastName(e.detail.value!)}
              />
            </IonItem>     

            <IonLabel position="stacked">Suffix Name</IonLabel>
            <IonItem className="input-item">
              <IonInput 
                placeholder="ex: Jr., Sr. I, II" 
                type="text" 
                className="text-input"
                value={suffixName}
                onIonChange={(e: InputCustomEvent<InputChangeEventDetail>) => setSuffixName(e.detail.value!)}
                disabled={hasSuffix}
              />
              <div className="checkbox-row">
                <IonCheckbox 
                  checked={hasSuffix}
                  onIonChange={(e: CheckboxCustomEvent<CheckboxChangeEventDetail>) => setHasSuffix(e.detail.checked)}
                />
                <label className="checkbox-label">None</label>
              </div>  
            </IonItem>
             
            <IonButton 
              expand="block" 
              className="next-button" 
              onClick={handleNext}
              disabled={!firstName || !lastName}
            >
              Next
            </IonButton>
            
            <div className="signup">
              <button 
                className="link-button"
                onClick={() => history.push('/login')}
              >
                Already have an account?
              </button>
            </div>
            
            <div className="divider"><span>Or continue with</span></div>

            <IonButton fill="outline" className="google-button">
              <img src="/public/assets/images/google Logo.png" alt="google" />
              Continue with Google
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUP;