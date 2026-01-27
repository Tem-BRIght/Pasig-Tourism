import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonButton
} from '@ionic/react';
import {
  chatbubblesOutline,
  mailOutline,
  callOutline
} from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';

import './ContactSupport.css';

const ContactSupport: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings/help" />
          </IonButtons>
          <IonTitle>Contact Support</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {/* INTRO */}
        <div className="support-intro">
          <h2>Need help?</h2>
          <p>Choose how you’d like to contact our support team.</p>
        </div>

        {/* SUPPORT OPTIONS */}
        <IonList>

          {/* CHAT */}
          <IonItem button onClick={() => router.push('/support/chat')}>
            <IonIcon icon={chatbubblesOutline} slot="start" />
            <IonLabel>
              <h3>Chat with Support</h3>
              <p>Get instant help from ALI or a live agent</p>
            </IonLabel>
          </IonItem>

          {/* EMAIL */}
          <IonItem
            button
            href="mailto:support@pasigtourism.app"
          >
            <IonIcon icon={mailOutline} slot="start" />
            <IonLabel>
              <h3>Email Support</h3>
              <p>support@pasigtourism.app</p>
            </IonLabel>
          </IonItem>

          {/* CALL */}
          <IonItem
            button
            href="tel:6431111"
          >
            <IonIcon icon={callOutline} slot="start" />
            <IonLabel>
              <h3>Call Support</h3>
              <p>643-1111 loc. 1156</p>
            </IonLabel>
          </IonItem>

        </IonList>

        {/* EXTRA CTA */}
        <div className="support-footer">
          <IonButton
            expand="block"
            fill="outline"
            onClick={() => router.push('/settings/help')}
          >
            Back to Help Center
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ContactSupport;
