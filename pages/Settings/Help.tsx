import React, { useState } from 'react';
import './Help.css';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonAccordion,
  IonAccordionGroup,
  IonButton
} from '@ionic/react';
import {
  timeOutline,
  notificationsOutline,
  globeOutline,
  shieldCheckmarkOutline,
  headsetOutline,
  warningOutline,
  informationCircleOutline,
  documentTextOutline,
  chatbubblesOutline
} from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';

const HelpCenter: React.FC = () => {
  const router = useIonRouter();
  const [query, setQuery] = useState('');

  const goTo = (path: string) => router.push(path);

  const helpItems = [
    {
      title: 'Booking History',
      desc: 'View your past and completed tour bookings',
      icon: timeOutline,
      route: '/settings/bookings'
    },
    {
      title: 'Notification Settings',
      desc: 'Manage alerts, reminders, and updates',
      icon: notificationsOutline,
      route: '/settings/notification'
    },
    {
      title: 'Language',
      desc: 'Change the app display language',
      icon: globeOutline,
      route: '/settings/language'
    },
    {
      title: 'Privacy Settings',
      desc: 'Control profile visibility and data sharing',
      icon: shieldCheckmarkOutline,
      route: '/settings/privacy'
    },
    {
      title: 'Contact Support',
      desc: 'Reach our support team for help',
      icon: headsetOutline,
      route: '/settings/contact-support'
    },
    {
      title: 'Report a Problem',
      desc: 'Send feedback or report technical issues',
      icon: warningOutline,
      route: '/settings/report-problem'
    },
    {
      title: 'About App',
      desc: 'Learn more about the Pasig Tourism App',
      icon: informationCircleOutline,
      route: '/settings/about'
    },
    {
      title: 'Terms & Privacy',
      desc: 'Read our terms and privacy policy',
      icon: documentTextOutline,
      route: '/settings/terms'
    }
  ];

  const filteredItems = helpItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>Help Center</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {/* SEARCH */}
        <IonSearchbar 
          className="help-searchbar"
          placeholder="Search help topics"
          value={query}
          onIonChange={e => setQuery(e.detail.value!)}
        />

        {/* HELP TOPICS */}
        <IonList>
          {filteredItems.map((item, index) => (
            <IonItem key={index} button onClick={() => goTo(item.route)}>
              <IonIcon icon={item.icon} slot="start" />
              <IonLabel>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* FAQ SECTION */}
        <IonList>
          <IonItem lines="none">
            <IonLabel>
              <h2>Frequently Asked Questions</h2>
            </IonLabel>
          </IonItem>

          <IonAccordionGroup>
            <IonAccordion value="faq1">
              <IonItem slot="header">
                <IonLabel>How do I book a tour?</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                You can book a tour through the Tours section of the app.
              </div>
            </IonAccordion>

            <IonAccordion value="faq2">
              <IonItem slot="header">
                <IonLabel>Can I change my booking?</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                Yes, go to Booking History and select the booking to modify.
              </div>
            </IonAccordion>

            <IonAccordion value="faq3">
              <IonItem slot="header">
                <IonLabel>Is my data secure?</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                We prioritize your privacy and protect your personal data.
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </IonList>

        {/* CHAT WITH SUPPORT */}
        <div className="ion-padding">
          <IonButton
            expand="block"
            color="primary"
            onClick={() => goTo('/support/chat')}
          >
            <IonIcon icon={chatbubblesOutline} slot="start" />
            Chat with Support
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default HelpCenter;
