import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonToast
} from '@ionic/react';

import './ReportProblem.css';

const ReportProblem: React.FC = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);

  const submitReport = () => {
    if (!description) return;

    // 🔗 Later: send to backend / Firebase / email
    console.log({
      category,
      description
    });

    setShowToast(true);
    setDescription('');
    setCategory('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings/help" />
          </IonButtons>
          <IonTitle>Report a Problem</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel>Issue Category</IonLabel>
          <IonSelect
            placeholder="Select category"
            value={category}
            onIonChange={e => setCategory(e.detail.value)}
          >
            <IonSelectOption value="booking">Booking Issue</IonSelectOption>
            <IonSelectOption value="rating">Rating</IonSelectOption>
            <IonSelectOption value="account">Account</IonSelectOption>
            <IonSelectOption value="bug">App Bug</IonSelectOption>
            <IonSelectOption value="other">Other</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem className="textarea-item">
          <IonLabel position="stacked">Describe the problem</IonLabel>
          <IonTextarea
            rows={6}
            placeholder="Tell us what went wrong..."
            value={description}
            onIonChange={e => setDescription(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="submit-btn"
          disabled={!description}
          onClick={submitReport}
        >
          Submit Report
        </IonButton>

        <IonToast
          isOpen={showToast}
          message="Report submitted successfully"
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />

      </IonContent>
    </IonPage>
  );
};

export default ReportProblem;
