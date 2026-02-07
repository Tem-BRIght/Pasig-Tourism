import React, { useState, useEffect } from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonAvatar, IonModal,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { search, personCircle, notifications, location, star, heart, calendar, map, list, colorFill, heartOutline } from 'ionicons/icons';
import { useAuth } from '../../context/AuthContext';
import { fetchRecommendedDestinations, fetchPopularDestinations } from '../../services/destinationService';
import './Home.css';

const Home: React.FC = () => {
  const router = useHistory();
  const { isAuthenticated, loading } = useAuth();
  const profilePic = localStorage.getItem('profilePic') || '/assets/images/Temporary.png';
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Fetch destination data from Firebase
  useEffect(() => {
    const loadDestinationData = async () => {
      try {
        setDataLoading(true);
        const [recData, popData] = await Promise.all([
          fetchRecommendedDestinations(),
          fetchPopularDestinations(),
        ]);
        setRecommended(recData || []);
        setPopular(popData || []);
      } catch (error) {
        console.error('Error loading destinations:', error);
      } finally {
        setDataLoading(false);
      }
    };

    if (!loading && isAuthenticated) {
      loadDestinationData();
    }
  }, [loading, isAuthenticated]);

  useEffect(() => {
    if (!loading) {
      checkLocationPermission();
    }
  }, [loading]);

  const checkLocationPermission = async () => {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        if (permission.state === 'denied') {
          setShowLocationPermission(true);
        }
      }
    } catch (error) {
      console.log('Location permission check not supported');
    }
  };


  const handleUpgradeConfirm = () => {
    setShowUpgradePrompt(false);
    router.push('/signup');
  };

  const handleUpgradeCancel = () => {
    setShowUpgradePrompt(false);
    setPendingAction(null);
  };

  const handleLocationPermissionGranted = () => {
    setShowLocationPermission(false);
    // Could trigger location-based features here
  };

  const handleLocationPermissionDenied = () => {
    setShowLocationPermission(false);
    // Handle denied permission - maybe show limited features
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            Loading...
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const toggleFavorite = (title: string) => {
    {
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
  };


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
            <IonButton fill="clear" aria-label="profile" onClick={() => router.push('/profile')}>
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
        {/* AI Navigation Button */}
        <div className="ai-nav-button" onClick={() => router.push('/ai-guide')}>
          <IonImg src="/assets/images/AI/ALI 3.png" />
        </div>

        <section className="section">
          <h2>Recommended for You</h2>
          <div className="horizontal-scroll">
            {recommended.map((place) => (
                <IonCard key={place.id} className="recommend-card" onClick={() => router.push('/destination/:id', place)}>
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
                  <div className="popular-card">
                    <div className="image-container">
                      <IonImg src={dest.image} />
                      <div className="heart-icon" onClick={() => toggleFavorite(dest.title)}>
                        <IonIcon icon={favorites.has(dest.title) ? heart : heartOutline} />
                      </div>
                      <div className="ribbon">
                        {dest.ranking}
                      </div>
                    </div>
                    <div className="card-info"  onClick={() => router.push('/destination/:id', dest)}>
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
