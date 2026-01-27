import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton
} from '@ionic/react';

import './Notification.css';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    newMessages: true,
    bookingUpdates: true,
    paymentConfirmations: true,
    promotions: false,
    forumReplies: true,

    emailBooking: true,
    emailNewsletter: false,
    emailOffers: false,

    quietHours: true,
    sound: true,
    vibration: true,
    led: false
  });

  const toggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/settings" />
          </IonButtons>
          <IonTitle>Notification Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="notification-page">

        {/* PUSH NOTIFICATIONS */}
        <div className="section">
          <h3>Push Notifications</h3>

          <IonItem>
            <IonLabel>Booking Updates</IonLabel>
            <IonToggle checked={settings.bookingUpdates} onIonChange={() => toggle('bookingUpdates')} />
          </IonItem>

          <IonItem>
            <IonLabel>Payment Confirmations</IonLabel>
            <IonToggle checked={settings.paymentConfirmations} onIonChange={() => toggle('paymentConfirmations')} />
          </IonItem>

          <IonItem>
            <IonLabel>Promotions</IonLabel>
            <IonToggle checked={settings.promotions} onIonChange={() => toggle('promotions')} />
          </IonItem>

          <IonItem>
            <IonLabel>Forum Replies</IonLabel>
            <IonToggle checked={settings.forumReplies} onIonChange={() => toggle('forumReplies')} />
          </IonItem>
        </div>

        {/* EMAIL NOTIFICATIONS */}
        <div className="section">
          <h3>Email Notifications</h3>

          <IonItem>
            <IonLabel>Booking Confirmations</IonLabel>
            <IonToggle checked={settings.emailBooking} onIonChange={() => toggle('emailBooking')} />
          </IonItem>

          <IonItem>
            <IonLabel>Special Offers</IonLabel>
            <IonToggle checked={settings.emailOffers} onIonChange={() => toggle('emailOffers')} />
          </IonItem>
        </div>  

        {/* ACTION BUTTONS */}
        <div className="actions">
          <IonButton fill="outline" color="medium">Reset to Default</IonButton>
          <IonButton color="primary">Save</IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default NotificationSettings;
