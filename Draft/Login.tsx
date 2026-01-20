import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    IonContent, IonPage, IonButton, IonInput, IonItem, 
    IonLabel, IonIcon, IonLoading, IonToast, IonAlert, IonCard 
} from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { login, checkBackendHealth } from '../services/authService';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showBackendAlert, setShowBackendAlert] = useState(false);
    const [backendStatus, setBackendStatus] = useState<any>(null);
    const history = useHistory();

    // Check if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('tabs/home');
        }
    }, [history]);

    // Check backend connection
    useEffect(() => {
        const checkBackend = async () => {
            try {
                const status = await checkBackendHealth();
                setBackendStatus(status);
            } catch (error) {
                console.error('Backend not responding:', error);
                setBackendStatus({ status: 'error', message: 'Backend not connected' });
                setShowBackendAlert(true);
            }
        };
        
        checkBackend();
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            setToastMessage('Please fill in all fields');
            setShowToast(true);
            return;
        }

        if (!email.includes('@')) {
            setToastMessage('Please enter a valid email address');
            setShowToast(true);
            return;
        }

        setLoading(true);
        try {
            const response = await login(email, password);
            
            setToastMessage(response.message || 'Login successful!');
            setShowToast(true);
            
            // Redirect to Tab1
            setTimeout(() => {
                history.push('/home');
            }, 500);
            
        } catch (error: any) {
            console.error('Login error:', error);
            setToastMessage(error.error || 'Login failed. Please check your credentials.');
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setToastMessage('Google login is in development mode');
        setShowToast(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <IonPage>
            <IonContent className="login-content" fullscreen onKeyPress={handleKeyPress}>
                <div className="logo-wrap">
                    <img src="src/assets/images/Pasig Logo.png" alt="Pasig Logo" className="logo" />
                </div>
                
                <h2 className="title">Tourism AI</h2>
                <p className="subtitle">DISCOVER PASIG WITH AI GUIDANCE!</p>
                
                {/* Backend Status */}
                {backendStatus && (
                    <IonCard className={`backend-status ${backendStatus.status === 'ok' ? 'connected' : 'disconnected'}`}>
                        <div className="status-content">
                            <strong>Backend Status:</strong> 
                            {backendStatus.status === 'ok' ? ' ✅ Connected' : ' ❌ Disconnected'}
                            {backendStatus.database && ` | Database: ${backendStatus.database}`}
                        </div>
                    </IonCard>
                )}
                
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
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                clearInput
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
                                onIonChange={(e) => setPassword(e.detail.value!)}
                                clearInput
                            />
                        </IonItem>
                        
                        <IonButton 
                            expand="block" 
                            className="login-button"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </IonButton>

                        <div className="forgot">
                            <Link to="/forgot">Forgot password?</Link>
                        </div>

                        <div className="divider">
                            <span>Or continue with</span>
                        </div>

                        <IonButton 
                            fill="outline" 
                            className="google-button"
                            onClick={handleGoogleLogin}
                        >
                            <img src="src/assets/images/google Logo.png" alt="Google" />
                            Continue with Google
                        </IonButton>

                        <div className="signup">
                            <Link to="/signup">Don't have an account? Sign up</Link>
                        </div>
                    </div>
                </div>

                <IonLoading 
                    isOpen={loading} 
                    message="Logging in..." 
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
                    isOpen={showBackendAlert}
                    onDidDismiss={() => setShowBackendAlert(false)}
                    header="Backend Connection Issue"
                    message="The backend server is not responding. Make sure you've started the backend server on port 5000."
                    buttons={[
                        {
                            text: 'Continue Anyway',
                            role: 'cancel'
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Login;