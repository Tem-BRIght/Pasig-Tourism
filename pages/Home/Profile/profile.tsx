import React, { useState } from 'react';
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
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  camera,
  person,
  location,
  language,
  mail,
  heart,
  star,
} from 'ionicons/icons';
import './profile.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Maria Santos',
    username: '@maria_explorer',
    age: '26',
    birthdate: 'December 1',
    location: 'National Capital Region, Philippines',
    language: 'English',
    email: 'Maria@explorer.com',
  });

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const saveProfile = () => {
    console.log('Saved profile:', profile);
    setIsEditing(false);
  };

  return (
    <IonPage className="profile-page">
      <IonHeader className="profile-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>

          <IonTitle>{isEditing ? 'Edit Profile' : 'Profile'}</IonTitle>

          <IonButtons slot="end">
            {isEditing ? (
              <IonButton onClick={saveProfile}>Save</IonButton>
            ) : (
              <IonButton onClick={() => setIsEditing(true)}>Edit</IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-content">

        {/* TOP */}
        <div className="profile-top-section">
          <div className="profile-photo-container">
            <IonAvatar className="profile-avatar">
              <img src="assets/images/Temporary.png" alt="Profile" />
            </IonAvatar>

            {isEditing && (
              <div className="camera-icon">
                <IonIcon icon={camera} />
              </div>
            )}
          </div>

          {isEditing ? (
            <>
              <IonInput
                value={profile.name}
                onIonChange={e => handleChange('name', e.detail.value!)}
                className="edit-input"
              />
              <IonInput
                value={profile.username}
                onIonChange={e => handleChange('username', e.detail.value!)}
                className="edit-input"
              />
            </>
          ) : (
            <>
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-username">{profile.username}</p>
            </>
          )}
        </div>

        {/* PERSONAL INFO */}
        <div className="personal-info-section">
          <h2>Personal Information</h2>

          <IonList>
            <IonItem>
              <IonIcon icon={person} slot="start" />
              {isEditing ? (
                <>
                  <IonInput
                    placeholder="Age"
                    value={profile.age}
                    onIonChange={e => handleChange('age', e.detail.value!)}
                  />
                  <IonInput
                    placeholder="Birthdate"
                    value={profile.birthdate}
                    onIonChange={e => handleChange('birthdate', e.detail.value!)}
                  />
                </>
              ) : (
                <IonLabel>
                  <h3>Age & Birthdate</h3>
                  <p>{profile.age}, {profile.birthdate}</p>
                </IonLabel>
              )}
            </IonItem>

            <IonItem>
              <IonIcon icon={location} slot="start" />
              {isEditing ? (
                <IonInput
                  value={profile.location}
                  onIonChange={e => handleChange('location', e.detail.value!)}
                />
              ) : (
                <IonLabel>
                  <h3>Location</h3>
                  <p>{profile.location}</p>
                </IonLabel>
              )}
            </IonItem>

            <IonItem>
              <IonIcon icon={language} slot="start" />
              {isEditing ? (
                <IonSelect
                  value={profile.language}
                  onIonChange={e => handleChange('language', e.detail.value)}
                >
                  <IonSelectOption value="English">English</IonSelectOption>
                  <IonSelectOption value="Filipino">Filipino</IonSelectOption>
                </IonSelect>
              ) : (
                <IonLabel>
                  <h3>Language</h3>
                  <p>{profile.language}</p>
                </IonLabel>
              )}
            </IonItem>

            <IonItem>
              <IonIcon icon={mail} slot="start" />
              {isEditing ? (
                <IonInput
                  value={profile.email}
                  onIonChange={e => handleChange('email', e.detail.value!)}
                />
              ) : (
                <IonLabel>
                  <h3>Email</h3>
                  <p>{profile.email}</p>
                </IonLabel>
              )}
            </IonItem>
          </IonList>
        </div>

        {/* VIEW-ONLY SECTIONS */}
        {!isEditing && (
          <>
            <div className="stats-section">
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    <IonCard className="stat-card visited">
                      <IonCardContent>
                        <h3>12</h3>
                        <p>Visited</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="4">
                    <IonCard className="stat-card reviews">
                      <IonCardContent>
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
                    <IonButton expand="block">
                      <IonIcon icon={heart} slot="start" />
                      Favorites
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block">
                      <IonIcon icon={star} slot="start" />
                      My Reviews
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Profile;
