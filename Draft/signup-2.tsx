import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    IonContent, IonPage, IonHeader, IonToolbar, IonButtons, 
    IonButton, IonInput, IonItem, IonLabel, 
    IonIcon, IonLoading, IonToast, IonAlert 
} from '@ionic/react';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, arrowBack } from 'ionicons/icons';
import { register } from '../services/authService';
import './signup-2.css';

interface SignupStep1Data {
    firstName: string;
    lastName: string;
    suffixName: string;
}

const SignUP2: React.FC = () => {
    const [step1Data, setStep1Data] = useState<SignupStep1Data>({
        firstName: '',
        lastName: '',
        suffixName: ''
    });
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const history = useHistory();

    // Load step 1 data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('signup_step1');
        if (savedData) {
            try {
                const data = JSON.parse(savedData) as SignupStep1Data;
                setStep1Data(data);
            } catch (error) {
                console.error('Error loading step 1 data:', error);
                history.push('/signup');
            }
        } else {
            history.push('/signup');
        }
    }, [history]);

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.email.trim()) {
            setToastMessage('Please enter your email');
            setShowToast(true);
            return false;
        }
        
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setToastMessage('Please enter a valid email address');
            setShowToast(true);
            return false;
        }
        
        if (!formData.password) {
            setToastMessage('Please enter your password');
            setShowToast(true);
            return false;
        }
        
        if (formData.password.length < 6) {
            setToastMessage('Password must be at least 6 characters');
            setShowToast(true);
            return false;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setToastMessage('Passwords do not match');
            setShowToast(true);
            return false;
        }
        
        return true;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            console.log('Attempting registration with:', {
                ...step1Data,
                email: formData.email
            });
            
            const response = await register(
                step1Data.firstName,
                step1Data.lastName,
                step1Data.suffixName,
                formData.email,
                formData.password
            );
            
            console.log('Registration successful:', response);
            
            // Clear saved data
            localStorage.removeItem('signup_step1');
            
            // Show success alert - DO NOT auto-login
            setShowSuccessAlert(true);
            
        } catch (error: any) {
            console.error('Registration error:', error);
            setToastMessage(error.error || 'Registration failed. Please try again.');
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessConfirm = () => {
        setShowSuccessAlert(false);
        // ✅ FIXED: Redirect to LOGIN page, not dashboard
        history.push('/login');
    };

    const handleBack = () => {
        history.push('/signup');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSignup();
        }
    };

    return (
        <IonPage>
            <IonContent className="login-content" fullscreen onKeyPress={handleKeyPress}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={handleBack}>
                                <IonIcon icon={arrowBack} slot="icon-only" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                
                <div className="logo-wrap">
                    <img src="src/assets/images/Pasig Logo.png" alt="Pasig Logo" className="logo" />
                </div>
                
                <h2 className="title">Tourism AI</h2>
                <p className="subtitle">DISCOVER THE PASIG WITH AI GUIDANCE!</p>
                
                <div className="login-card"> 
                    <div className="form">
                        <p className="formSubtitle">Create Account</p>
                        
                        <div className="step-indicator">
                            <span className="step-active">Step 1: Personal Info ✓</span>
                            <span className="step-current">Step 2: Account Details</span>
                        </div>
                        
                        <IonLabel position="stacked">Email *</IonLabel>
                        <IonItem className="input-item">
                            <IonIcon icon={mailOutline} slot="start" className="input-icon" />
                            <IonInput 
                                placeholder="Enter your email" 
                                type="email" 
                                className="text-input"
                                value={formData.email}
                                onIonChange={(e) => handleInputChange('email', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>

                        <IonLabel position="stacked">Password *</IonLabel>
                        <IonItem className="input-item">
                            <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
                            <IonInput 
                                placeholder="Enter your password" 
                                type={showPassword ? "text" : "password"}
                                className="text-input"
                                value={formData.password}
                                onIonChange={(e) => handleInputChange('password', e.detail.value!)}
                                clearInput
                            />
                            <IonIcon 
                                icon={showPassword ? eyeOffOutline : eyeOutline} 
                                slot="end" 
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            />
                        </IonItem>

                        <IonLabel position="stacked">Confirm Password *</IonLabel>
                        <IonItem className="input-item">
                            <IonIcon icon={lockClosedOutline} slot="start" className="input-icon" />
                            <IonInput 
                                placeholder="Confirm your password" 
                                type={showConfirmPassword ? "text" : "password"}
                                className="text-input"
                                value={formData.confirmPassword}
                                onIonChange={(e) => handleInputChange('confirmPassword', e.detail.value!)}
                                clearInput
                            />
                            <IonIcon 
                                icon={showConfirmPassword ? eyeOffOutline : eyeOutline} 
                                slot="end" 
                                className="password-toggle"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </IonItem>

                        <div className="password-requirements">
                            <p className="requirements-title">Password must contain:</p>
                            <ul>
                                <li className={formData.password.length >= 6 ? 'valid' : ''}>
                                    At least 6 characters
                                </li>
                                <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                                    One uppercase letter
                                </li>
                                <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                                    One number
                                </li>
                            </ul>
                        </div>

                        <IonButton 
                            expand="block" 
                            className="signup-button"
                            onClick={handleSignup}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </IonButton>

                        <div className="login-link">
                            <p>
                                Already have an account?{' '}
                                <Link to="/login">Log In</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <IonLoading 
                    isOpen={loading} 
                    message="Creating your account..." 
                    spinner="crescent"
                />
                
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    position="top"
                />
                
                <IonAlert
                    isOpen={showSuccessAlert}
                    onDidDismiss={handleSuccessConfirm}
                    header="🎉 Registration Successful!"
                    message="Your account has been created successfully. Please log in with your credentials."
                    buttons={[
                        {
                            text: 'Go to Login',
                            handler: handleSuccessConfirm
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
}

export default SignUP2;