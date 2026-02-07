import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonAvatar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonLoading,
} from '@ionic/react';
import {
  ellipsisVertical,
  camera,
  person,
  location,
  language,
  mail,
  heart,
  star,
} from 'ionicons/icons';
import { useAuth } from '../../../context/AuthContext';
import { getUserProfile, UserProfile } from '../../../services/userProfileService';
import './profile.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const { user, logout, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Wait for auth to complete loading before fetching profile
      if (loading) return;
      
      if (user) {
        try {
          setError(null);
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          // Store profile picture in localStorage for offline access
          if (profile?.img) {
            localStorage.setItem('profilePic', profile.img);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Failed to load profile. Please check your connection and try again.');
        }
      }
    };

    fetchUserProfile();
  }, [user, loading]);

  const saveProfile = () => {
    console.log('Saved Profile:', )

  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      history.replace('/login');
    } catch (error) {
      console.error('Logout failed, Please try again', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <IonPage className="profile-page">
      <IonHeader className="profile-header">
        <IonToolbar className="profile-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="profile-content">
        <IonLoading
          isOpen={loading || isLoggingOut}
          message={isLoggingOut ? 'Logging out...' : 'Loading profile...'}
        />
        
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <IonButton size="small" fill="outline" onClick={() => window.location.reload()}>
              Retry
            </IonButton>
          </div>
        )}
        
        {userProfile && (
          <>
        <div className="profile-top-section">
          <div className="profile-photo-container">
            <IonAvatar className="profile-avatar">
              <img src={userProfile.img || ''} alt="Profile" />
            </IonAvatar>
            <div className="camera-icon">
              <IonIcon icon={camera} />
            </div>
          </div>
          <h1 className="profile-name">{userProfile.name?.firstname} {userProfile.name?.surname} {userProfile.name?.suffix}</h1>
          <p className="profile-username">@{userProfile.nickname}</p>
        </div>

        <div className="personal-info-section">
          <h2>Personal Information</h2>
          <IonList>
            <IonItem>
              <IonIcon icon={person} slot="start" />
              <IonLabel>
                <h3>Date of Birth</h3>
                <p>{userProfile.dateOfBirth ? new Date(userProfile.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={location} slot="start" />
              <IonLabel>
                <h3>Nationality</h3>
                <p>{userProfile.nationality ? (userProfile.nationality.charAt(0).toUpperCase() + userProfile.nationality.slice(1)) : '-'}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={mail} slot="start" />
              <IonLabel>
                <h3>Email</h3>
                <p>{userProfile.email}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>

        <div className="stats-section">
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <IonCard className="stat-card visited">
                  <IonCardContent className='visited'>
                    <h3>12</h3>
                    <p>Visited</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="4">
                <IonCard className="stat-card reviews">
                  <IonCardContent >
                    <h3>8</h3>
                    <p>Reviews</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="4">
                <IonCard className="stat-card soon">
                  <IonCardContent>
                    <h3>?</h3>
                    <p>Upcoming</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>


        <div className="action-buttons">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton expand="block" className="favorites-btn" onClick={() => console.log('Favorites')}>
                  <IonIcon icon={heart} slot="start" />
                  Favorites
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton expand="block" className="reviews-btn" onClick={() => console.log('My Reviews')}>
                  <IonIcon icon={star} slot="start" />
                  My Reviews
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div className="logout-section">
          <IonButton color="danger" expand="block" onClick={handleLogout}>
            Logout
          </IonButton>
        </div>
        </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Profile;
