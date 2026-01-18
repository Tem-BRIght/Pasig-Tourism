import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const TourGuide: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tour Guide</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-content">
          <h2>Tour Guide</h2>
          <p>Your personal tour guide.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TourGuide;