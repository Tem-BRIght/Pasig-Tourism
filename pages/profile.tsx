import React from 'react';
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
import './profile.css';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="profile-header">
        <IonToolbar className="profile-toolbar">
            <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="profile-content">
        <div className="profile-top-section">
          <div className="profile-photo-container">
            <IonAvatar className="profile-avatar">
              <img src="assets/images/Temporary.png" alt="Profile" />
            </IonAvatar>
            <div className="camera-icon">
              <IonIcon icon={camera} />
            </div>
          </div>
          <h1 className="profile-name">Maria Santos</h1>
          <p className="profile-username">@maria_explorer</p>
        </div>

        <div className="personal-info-section">
          <h2>Personal Information</h2>
          <IonList>
            <IonItem>
              <IonIcon icon={person} slot="start" />
              <IonLabel>
                <h3>Age & Birthdate</h3>
                <p>26, December 1</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={location} slot="start" />
              <IonLabel>
                <h3>Location</h3>
                <p>In National Capital Region, Philippines</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={language} slot="start" />
              <IonLabel>
                <h3>Language</h3>
                <p>English</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={mail} slot="start" />
              <IonLabel>
                <h3>Email</h3>
                <p>Maria@explorer.com</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>

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
                    <p>Soon</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div className="recent-activity-section">
          <h2>Recent Activity</h2>
          <IonList>
            <IonItem>
              <IonLabel>
                <h3>Reviewed Pasig Museum</h3>
                <p>Today</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>Visited RAVE Park</h3>
                <p>Nov 15</p>
              </IonLabel>
            </IonItem>
          </IonList>
          <IonButton fill="outline" expand="block">
            See All Activity
          </IonButton>
        </div>

        <div className="action-buttons">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton expand="block" className="favorites-btn">
                  <IonIcon icon={heart} slot="start" />
                  Favorites
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton expand="block" className="reviews-btn">
                  <IonIcon icon={star} slot="start" />
                  My Reviews
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
