import {
  IonModal, IonList, IonNote, IonThumbnail, IonProgressBar,
  IonAlert, IonFab, IonFabButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
  IonIcon, IonAvatar, IonText, IonCard, IonItem, IonLabel
} from '@ionic/react';
import { qrCodeOutline, star } from 'ionicons/icons';
import React, { useState } from 'react';

import './TourGuide.css';

const TourGuide: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleBook = (guide: any) => {
    setSelectedGuide(guide);
    setShowBooking(true);
  };

  return (
    <IonPage>
      {/* ... Header as before ... */}
      <IonContent>
        {/* 1. Guide Cards with Booking Action */}
        <IonCard className="guide-card">
          <IonItem lines="none">
            <IonAvatar slot="start"><img src="public/assets/images/Pasig Logo.png" /></IonAvatar>
            <IonLabel>
              <h2>Maria Santos</h2>
              <div className="stars">
                <IonIcon icon={star} color="warning" />
                <IonIcon icon={star} color="warning" />
                <IonIcon icon={star} color="warning" />
                <IonIcon icon={star} color="warning" />
                <IonText color="medium"> (4.8)</IonText>
              </div>
            </IonLabel>
            <IonButton slot="end" shape="round" onClick={() => handleBook({name: 'Maria Santos'})}>
              Book
            </IonButton>
          </IonItem>
          {/* Reviews Preview */}
          <div className="review-preview ion-padding-start ion-padding-bottom">
            <IonNote>"Maria was amazing! She knows all the secret food spots."</IonNote>
          </div>
        </IonCard>

        {/* 2. QR Survey FAB */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="secondary" onClick={() => setShowAlert(true)}>
            <IonIcon icon={qrCodeOutline} />
          </IonFabButton>
        </IonFab>

        {/* Booking Confirmation Modal */}
        <IonModal isOpen={showBooking} onDidDismiss={() => setShowBooking(false)} initialBreakpoint={0.5} breakpoints={[0, 0.5, 0.8]}>
          <div className="ion-padding">
            <h2>Confirm Booking</h2>
            <p>You are booking <b>{selectedGuide?.name}</b> for a city tour.</p>
            <IonButton expand="block" onClick={() => { setShowBooking(false); alert("Booking Successful!"); }}>
              Confirm & Pay
            </IonButton>
          </div>
        </IonModal>

        {/* QR Survey Alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'QR Survey'}
          message={'Please scan the QR code at the tourism office or click below to answer our visitor survey.'}
          buttons={['Open Survey Link', 'Cancel']}
        />
      </IonContent>
    </IonPage>
  );
};

export default TourGuide;
