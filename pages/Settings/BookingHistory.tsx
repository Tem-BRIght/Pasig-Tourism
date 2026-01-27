import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
  IonAvatar
} from '@ionic/react';
import { calendar, location, checkmarkCircle, time, closeCircle } from 'ionicons/icons';
import './BookingHistory.css';

const BookingHistory: React.FC = () => {
  const bookings = [
    {
      id: 1,
      place: 'Pasig Rainforest Park',
      date: 'Jan 10, 2026',
      guide: 'Juan Dela Cruz',
      status: 'Completed'
    },
    {
      id: 2,
      place: 'Pasig Museum',
      date: 'Jan 28, 2026',
      guide: 'Maria Santos',
      status: 'Upcoming'
    },
    {
      id: 3,
      place: 'RAVE Park',
      date: 'Dec 20, 2025',
      guide: 'Pedro Reyes',
      status: 'Cancelled'
    }
  ];

  const statusChip = (status: string) => {
    switch (status) {
      case 'Completed':
        return <IonChip color="success"><IonIcon icon={checkmarkCircle} />Completed</IonChip>;
      case 'Upcoming':
        return <IonChip color="warning"><IonIcon icon={time} />Upcoming</IonChip>;
      case 'Cancelled':
        return <IonChip color="danger"><IonIcon icon={closeCircle} />Cancelled</IonChip>;
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>Booking History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="booking-history-content">
        <IonList>
          {bookings.map(booking => (
            <IonItem key={booking.id} lines="full">
              <IonAvatar slot="start">
                <img src="public/assets/images/Booking/girl.png" alt="Guide" />
              </IonAvatar>

              <IonLabel>
                <h2>{booking.place}</h2>
                <p><IonIcon icon={calendar} /> {booking.date}</p>
                <p><IonIcon icon={location} /> Guide: {booking.guide}</p>
                {statusChip(booking.status)}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default BookingHistory;
