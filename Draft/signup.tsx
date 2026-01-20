import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    IonContent, IonPage, IonHeader, IonToolbar, IonButtons, 
    IonBackButton, IonButton, IonInput, IonItem, IonLabel, 
    IonCheckbox, IonLoading, IonToast 
} from '@ionic/react';
import './signup.css';

interface SignupData {
    firstName: string;
    lastName: string;
    suffixName: string;
    email: string;
    password: string;
}

const SignUP: React.FC = () => {
    const [formData, setFormData] = useState<SignupData>({
        firstName: '',
        lastName: '',
        suffixName: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [noneSuffix, setNoneSuffix] = useState(false);
    const history = useHistory();

    const handleInputChange = (field: keyof SignupData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNoneCheckbox = () => {
        setNoneSuffix(!noneSuffix);
        if (!noneSuffix) {
            setFormData(prev => ({
                ...prev,
                suffixName: ''
            }));
        }
    };

    const validateStep1 = (): boolean => {
        if (!formData.firstName.trim()) {
            setToastMessage('Please enter your first name');
            setShowToast(true);
            return false;
        }
        
        if (!formData.lastName.trim()) {
            setToastMessage('Please enter your last name');
            setShowToast(true);
            return false;
        }
        
        return true;
    };

    const handleNext = () => {
        if (validateStep1()) {
            // Save step 1 data to localStorage or context
            localStorage.setItem('signup_step1', JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                suffixName: noneSuffix ? '' : formData.suffixName
            }));
            
            // Navigate to step 2
            history.push('/signup-2');
        }
    };

    const handleGoogleSignup = () => {
        setToastMessage('Google signup is in development mode');
        setShowToast(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    };

    return (
        <IonPage>
            <IonContent className="login-content" fullscreen onKeyPress={handleKeyPress}>
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
                        <p className="formSubtitle">Create Account</p>
                        
                        <IonLabel position="stacked">First Name *</IonLabel>
                        <IonItem className="input-item">
                            <IonInput 
                                placeholder="Enter your first name" 
                                type="text" 
                                className="text-input"
                                value={formData.firstName}
                                onIonChange={(e) => handleInputChange('firstName', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>

                        <IonLabel position="stacked">Last Name *</IonLabel>
                        <IonItem className="input-item">
                            <IonInput 
                                placeholder="Enter your last name" 
                                type="text" 
                                className="text-input"
                                value={formData.lastName}
                                onIonChange={(e) => handleInputChange('lastName', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>     

                        <IonLabel position="stacked">Suffix Name (Optional)</IonLabel>
                        <IonItem className="input-item">
                            <IonInput 
                                placeholder="ex: Jr., Sr. I, II" 
                                type="text" 
                                className="text-input"
                                value={noneSuffix ? '' : formData.suffixName}
                                onIonChange={(e) => handleInputChange('suffixName', e.detail.value!)}
                                disabled={noneSuffix}
                                clearInput
                            />
                            <div className="checkbox-row">
                                <IonCheckbox 
                                    checked={noneSuffix}
                                    onIonChange={handleNoneCheckbox}
                                />
                                <label className="checkbox-label">None</label>
                            </div>  
                        </IonItem>
                        
                        <IonButton 
                            expand="block" 
                            className="next-button"
                            onClick={handleNext}
                            disabled={loading}
                        >
                            Next
                        </IonButton>
                        
                        <div className="signup">
                            <Link to="/login">Already have an account?</Link>
                        </div>
                        
                        <div className="divider">
                            <span>Or continue with</span>
                        </div>

                        <IonButton 
                            fill="outline" 
                            className="google-button"
                            onClick={handleGoogleSignup}
                        >
                            <img src="src/assets/images/google Logo.png" alt="google" />
                            Continue with Google
                        </IonButton>
                    </div>
                </div>

                <IonLoading 
                    isOpen={loading} 
                    message="Processing..." 
                    spinner="crescent"
                />
                
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    position="top"
                />
            </IonContent>
        </IonPage>
    );
}

export default SignUP;