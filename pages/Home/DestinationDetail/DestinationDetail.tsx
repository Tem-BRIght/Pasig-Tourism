import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonImg, IonModal, IonText } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { arrowBack, location as locationIcon, star } from 'ionicons/icons';
import './DestinationDetail.css';

const DestinationDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dest = location.state as any;
  const [showItinerary, setShowItinerary] = useState(false);
  const [itinerary, setItinerary] = useState('');

  const API_KEY = "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";
  const systemMessage = {
    "role": "system", "content": "You are a travel assistant for Pasig City, Philippines. Generate detailed information about destinations."
  };

  const callOpenAI = async (userMessage: string) => {
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        { role: "user", content: userMessage }
      ]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const generateItinerary = async () => {
    const prompt = `Generate a detailed day itinerary for visiting ${dest.title} in Pasig City. Include activities, timings, and tips.`;
    try {
      const response = await callOpenAI(prompt);
      setItinerary(response);
      setShowItinerary(true);
    } catch (error) {
      console.error('Error generating itinerary:', error);
    }
  };

  const handleNavigate = () => {
    const address = dest.location || dest.address || dest.distance;
    if (address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }
  };

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
            <p className="description">{dest.desc || 'Pasig Recreational and Adventure Venue for Events'}</p>
            <div className="rating">
              <IonIcon icon={star} />
              <span className="rating-value">{dest.rating} out of 5</span>
              <span className='reviews-value'>({dest.reviews} reviews)</span>
              <span>, {dest.ranking} of 5 most visited</span>
            </div>
            <div className="location">
              <IonIcon icon={locationIcon} /> {dest.location || dest.address || dest.distance}
            </div>
            <p>Hours: {dest.hours || '6 AM - 10 PM'}</p>
            <p>Entrance: {dest.entrance || 'Free'}</p>
            <p>Good for: {dest.goodFor || 'Families, Events'}</p>
            <p>Parking: Available {dest.parking || 'P50/hour'}</p>
            <p>Last updated: {dest.lastUpdated || 'January 2026'}</p>
            <div className="action-buttons">
              <IonButton fill="outline" onClick={handleNavigate}>Navigate</IonButton>
              <IonButton fill="outline" onClick={generateItinerary}>Itinerary</IonButton>
              <IonButton fill="outline" onClick={() => history.push('/ai-guide')}>Guide</IonButton>
            </div>
            <div className="about-section">
              <h3>About {dest.title}</h3>
              <p>{dest.about || dest.desc}</p>
            </div>
            {dest.history && (
              <div className="section">
                <h3>History</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.history}</p>
              </div>
            )}
            {dest.features && (
              <div className="section">
                <h3>Features</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.features}</p>
              </div>
            )}
            {dest.massSchedule && (
              <div className="section">
                <h3>Mass Schedule</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.massSchedule}</p>
              </div>
            )}
            {dest.attractions && (
              <div className="section">
                <h3>Attractions & Activities</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.attractions}</p>
              </div>
            )}
            {dest.operatingHours && (
              <div className="section">
                <h3>Operating Hours by Zone</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.operatingHours}</p>
              </div>
            )}
            {dest.packages && (
              <div className="section">
                <h3>Package Deals</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.packages}</p>
              </div>
            )}
            {dest.safety && (
              <div className="section">
                <h3>Safety Information</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.safety}</p>
              </div>
            )}
            {dest.foodCategories && (
              <div className="section">
                <h3>Top Restaurants</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.foodCategories}</p>
              </div>
            )}
            {dest.mustTryDishes && (
              <div className="section">
                <h3>Must-Try Dishes</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.mustTryDishes}</p>
              </div>
            )}
            {dest.bestTimes && (
              <div className="section">
                <h3>Best Times to Visit</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.bestTimes}</p>
              </div>
            )}
            {dest.parkingInfo && (
              <div className="section">
                <h3>Parking Information</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.parkingInfo}</p>
              </div>
            )}
            {dest.walkingTour && (
              <div className="section">
                <h3>Walking Tour Routes</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.walkingTour}</p>
              </div>
            )}
            {dest.specialEvents && (
              <div className="section">
                <h3>Special Events</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.specialEvents}</p>
              </div>
            )}
            {dest.exhibitHalls && (
              <div className="section">
                <h3>Exhibit Halls</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.exhibitHalls}</p>
              </div>
            )}
            {dest.specialExhibits && (
              <div className="section">
                <h3>Special Exhibits</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.specialExhibits}</p>
              </div>
            )}
            {dest.guidedTours && (
              <div className="section">
                <h3>Guided Tours</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.guidedTours}</p>
              </div>
            )}
            {dest.collections && (
              <div className="section">
                <h3>Collections</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.collections}</p>
              </div>
            )}
            {dest.researchFacilities && (
              <div className="section">
                <h3>Research Facilities</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.researchFacilities}</p>
              </div>
            )}
            {dest.visitorServices && (
              <div className="section">
                <h3>Visitor Services</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.visitorServices}</p>
              </div>
            )}
            {dest.rules && (
              <div className="section">
                <h3>Rules & Guidelines</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.rules}</p>
              </div>
            )}
            {dest.specialPrograms && (
              <div className="section">
                <h3>Special Programs</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.specialPrograms}</p>
              </div>
            )}
            {dest.visitorTips && (
              <div className="section">
                <h3>Visitor Tips</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.visitorTips}</p>
              </div>
            )}
            {dest.nearbyAttractions && (
              <div className="section">
                <h3>Nearby Attractions</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.nearbyAttractions}</p>
              </div>
            )}
            {dest.reviewsSummary && (
              <div className="section">
                <h3>Reviews Summary</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.reviewsSummary}</p>
              </div>
            )}
            {dest.ecoFeatures && (
              <div className="section">
                <h3>Eco-Features</h3>
                <p style={{whiteSpace: 'pre-line'}}>{dest.ecoFeatures}</p>
              </div>
            )}
          </div>
        </div>
      </IonContent>
      <IonModal isOpen={showItinerary} onDidDismiss={() => setShowItinerary(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Itinerary for {dest.title}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowItinerary(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonText>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{itinerary}</pre>
            </IonText>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default DestinationDetail;