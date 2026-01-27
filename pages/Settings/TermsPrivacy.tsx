import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel
} from '@ionic/react';
import './TermsPrivacy.css';

const TermsPrivacy: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>Terms & Privacy</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="terms-content">
        <IonAccordionGroup className='terms-container'>

          <IonAccordion value="terms">
            <IonItem slot="header">
              <IonLabel>Terms of Service</IonLabel>
            </IonItem>
            <div className="accordion-body" slot="content">
              <p>
                By using this app, you agree to comply with all applicable laws
                and regulations. The app is intended for tourism guidance,
                booking services, and informational purposes only.
              </p>
              <p>
                Users are responsible for the accuracy of the information they
                provide. Misuse of the platform may result in suspension.
              </p>
            </div>
          </IonAccordion>

          <IonAccordion value="privacy">
            <IonItem slot="header">
              <IonLabel>Privacy Policy</IonLabel>
            </IonItem>
            <div className="accordion-body" slot="content">
              <p>
                We value your privacy. Personal data such as name, email, and
                booking activity are collected only to improve user experience.
              </p>
              <p>
                Your data is never sold to third parties. You may request data
                deletion at any time via Contact Support.
              </p>
            </div>
          </IonAccordion>

          <IonAccordion value="cookies">
            <IonItem slot="header">
              <IonLabel>Cookies & Tracking</IonLabel>
            </IonItem>
            <div className="accordion-body" slot="content">
              <p>
                Cookies are used to maintain login sessions and improve
                performance. You can disable cookies in your device settings.
              </p>
            </div>
          </IonAccordion>

          <IonAccordion value="updates">
            <IonItem slot="header">
              <IonLabel>Policy Updates</IonLabel>
            </IonItem>
            <div className="accordion-body" slot="content">
              <p>
                Terms and Privacy policies may be updated without prior notice.
                Continued use of the app means acceptance of changes.
              </p>
            </div>
          </IonAccordion>

        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default TermsPrivacy;
