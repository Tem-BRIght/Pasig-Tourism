import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { arrowBack, location, star } from 'ionicons/icons';
import './DestinationDetail.css';

const DestinationDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dest = location.state as any;

  if (!dest) {
    return <IonPage><IonContent></IonContent></IonPage>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{dest.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="destination-detail">
          <IonImg src={dest.image} className="detail-image" />
          <div className="detail-info">
            <h2>{dest.title}</h2>
            <div className="rating">
              <IonIcon icon={star} />
              <span className="rating-value">{dest.rating}</span>
              <span className='reviews-value'>({dest.reviews})</span>
            </div>
            <div className="distance">
              <IonIcon icon={location} /> {dest.distance}
            </div>
            <p>Ranking: {dest.ranking}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DestinationDetail;