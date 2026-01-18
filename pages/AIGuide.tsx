import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const AIGuide: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AI Guide</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-content">
          <h2>AI Guide</h2>
          <p>Your AI-powered tour guide.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AIGuide;