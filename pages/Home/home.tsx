import React, { useState } from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonAvatar, IonModal,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { search, personCircle, notifications, location, star, heart, calendar, map, list, colorFill, heartOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  const router = useHistory();
  const profilePic = localStorage.getItem('profilePic') || '/assets/images/Temporary.png';
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (title: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(title)) {
        newFavorites.delete(title);
      } else {
        newFavorites.add(title);
      }
      return newFavorites;
    });
  };
  const recommended = [
    {
      id: 1,
      image: '/assets/images/Pasig Museum.png',
      address: 'Plaza Rizal, 2 F. Concepcion, Pasig',
      title: 'Pasig City Museum',
      desc: 'Historic house museum in Pasig, Metro Manila in the Philippines.',
      rating: 4.2,
      distance: '2.3 km away',
    },
    {
      id: 2,
      image: 'assets/images/Ace Hotel.png',
      address: 'Ace Hotel & Suites',
      title: 'Ace Hotel Spa',
      desc: 'A safe haven to relax and enjoy the healing benefits of Hydrotherapy.',
      rating: 4.6,
      distance: '3.1 km away',
    },
    {
      id: 3,
      image: 'assets/images/dimas-alang.png',
      address: 'A. Mabini Street, Pasig',
      title: 'Panaderia Dimas-Alang',
      desc: 'The oldest bakery in Pasig, and possibly one of the oldest in the country.',
      rating: 4.7,
      distance: '4.5 km away',
    },

  ];

  

  const popular = [
    {
      image: '/assets/images/Pasig Cathedral.png',
      title: 'Pasig Cathedral',
      rating: 4.7,
      reviews: '1.5k',
      distance: '45 km away',
      ranking: '#1'
    },
    {
      image: '/assets/images/Pasig Rainfo.png',
      title: 'Rainforest Park',
      rating: 4.9,
      reviews: '2.1k',
      distance: '58 km away',
      ranking: '#2'
    },
    {
      image: '/assets/images/Pasig Kapitolyo.png',
      title: 'Kapitolyo',
      rating: 4.8,
      reviews: '980',
      distance: '92 km away',
      ranking: '#3'
    },
    {
      image: '/assets/images/Pasig Museum.png',
      title: 'Pasig City Museum',
      rating: 4.2,
      reviews: '1.2k',
      distance: '2.3 km away',
      ranking: '#4'
    },
  ];

  return (
    <IonPage>
      <IonHeader className='header'>
        <IonToolbar className="top-bar">
          <IonButtons slot="start" className="left-icons">
            <IonButton fill="clear" aria-label="notifications" onClick={() => router.push('/notifications')}>
              <span className="notification-badge"></span>
              <IonIcon icon={notifications} className='notification'/>
            </IonButton>
          </IonButtons>
          <div className="center-space" />
          <IonSearchbar className="main-search" placeholder="Search destinations..." searchIcon={search} />
          <IonButtons slot="end" className="right-icons">
            <IonButton fill="clear" aria-label="profile" onClick={() => router.push('/home/profile')}>
              {profilePic ? (
                <div className="profile-pic-container">
                  <IonImg src={profilePic} className="profile-pic" />
                </div>
              ) : (
                <IonIcon icon={personCircle} className='profile'/>
                
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <section className="section">
          <h2>Recommended for You</h2>
          <div className="horizontal-scroll">
            {recommended.map((place) => (
                <IonCard key={place.id} className="recommend-card">
                <div className="image-container">
                <IonImg src={place.image} />
                </div>
                <div className="card-body">
                  <div className="card-location">
                    <IonIcon icon={location} />
                    <span className="location-text">{place.address}</span>
                  </div>
                  <h3 className="card-title">{place.title}</h3>
                  <p className="card-desc">{place.desc}</p>
                  <div className="meta-row">
                    <div className="rating">
                      <IonIcon icon={star} />
                      <span className="rating-value">{place.rating}</span>
                    </div>
                    <span className="dot">•</span>
                    <span className="distance">{place.distance}</span>
                  </div>
                </div>
              </IonCard>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Popular Destinations</h2>
            <IonButton fill="clear" className="view-all">View All</IonButton>
          </div>
          <IonGrid className="popular-grid">
            <IonRow>
              {popular.map((dest) => (
                <IonCol key={dest.title}>
                  <div className="popular-card" onClick={() => router.push('/home/destination-detail', dest)}>
                    <div className="image-container">
                      <IonImg src={dest.image} />
                      <div className="heart-icon" onClick={() => toggleFavorite(dest.title)}>
                        <IonIcon icon={favorites.has(dest.title) ? heart : heartOutline} />
                      </div>
                      <div className="ribbon">
                        {dest.ranking}
                      </div>
                    </div>
                    <div className="card-info">
                      <h4>{dest.title}</h4>
                      <div className="rating">
                      <IonIcon icon={star} />
                      <span className="rating-value">{dest.rating}</span>
                      <span className='reviews-value'>({dest.reviews})</span>
                      </div>
                      <div className="distance">
                        <IonIcon icon={location} /> {dest.distance}
                      </div>
                    </div>
                  </div>
                </IonCol>
              ))}
            </IonRow>
            
          </IonGrid>
        </section>

        <section className="section">
          <h3>Cultural Highlights</h3>
          <IonCard className="featured-card">
            <IonImg src="assets/images/feature.jpg" />
            <IonCardContent>Explore cultural highlights in Pasig City.</IonCardContent>
          </IonCard>
        </section>
      </IonContent>
    </IonPage>

    
  );
};

export default Home;
