import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSearchbar, IonButtons, IonButton, IonIcon, IonGrid, 
  IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonImg, IonAvatar, IonLabel
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { 
  search, personCircle, notifications, location, 
  star, heart, heartOutline, calendar, map, list, 
  colorFill, chevronForward, navigate, time, cash, 
  call, globe, restaurant, bed, chatbubble, flag, 
  settings, home
} from 'ionicons/icons';
import { getHomeData, getDestinations, getCurrentUser } from '../services/authService';
import './home.css';

const Home: React.FC = () => {
  const history = useHistory();
  const currentUser = getCurrentUser();
  const profilePic = localStorage.getItem('profilePic') || '/src/assets/images/Temporary.png';
  
  const [recommended, setRecommended] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [cultural, setCultural] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFavorites, setUserFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadHomeData();
    loadUserFavorites();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      const data = await getHomeData();
      setRecommended(data.recommended || []);
      setPopular(data.popular || []);
      setCultural(data.cultural || []);
    } catch (error) {
      console.error('Error loading home data:', error);
      // Fallback to static data
      setRecommended([
        {
          id: 1,
          image_url: '/src/assets/images/Pasig Museum.png',
          address: 'Plaza Rizal, 2 F. Concepcion, Pasig',
          title: 'Pasig City Museum',
          description: 'Historic house museum in Pasig, Metro Manila in the Philippines.',
          rating: 4.2,
          total_reviews: 1200,
          distance: 2.3,
          category: 'recommended'
        },
        {
          id: 2,
          image_url: '/src/assets/images/Ace Hotel.png',
          address: 'Ace Hotel & Suites',
          title: 'Ace Hotel Spa',
          description: 'A safe haven to relax and enjoy the healing benefits of Hydrotherapy.',
          rating: 4.6,
          total_reviews: 850,
          distance: 3.1,
          category: 'recommended'
        },
        {
          id: 3,
          image_url: '/src/assets/images/dimas-alang.png',
          address: 'A. Mabini Street, Pasig',
          title: 'Panaderia Dimas-Alang',
          description: 'The oldest bakery in Pasig, and possibly one of the oldest in the country.',
          rating: 4.7,
          total_reviews: 670,
          distance: 4.5,
          category: 'recommended'
        },
      ]);
      setPopular([
        {
          id: 4,
          image_url: '/src/assets/images/Pasig Cathedral.png',
          address: 'Plaza Rizal, Pasig City',
          title: 'Pasig Cathedral',
          description: 'One of the oldest Roman Catholic churches in the Philippines.',
          rating: 4.7,
          total_reviews: 1500,
          distance: 45,
          category: 'popular',
          ranking: '#1'
        },
        {
          id: 5,
          image_url: '/src/assets/images/Pasig Rainfo.png',
          address: 'Rainforest Ave, Pasig City',
          title: 'Rainforest Park',
          description: 'A nature park with various attractions and activities.',
          rating: 4.9,
          total_reviews: 2100,
          distance: 58,
          category: 'popular',
          ranking: '#2'
        },
        {
          id: 6,
          image_url: '/src/assets/images/Pasig Kapitolyo.png',
          address: 'Kapitolyo, Pasig City',
          title: 'Kapitolyo',
          description: 'Food district known for its diverse restaurants and cafes.',
          rating: 4.8,
          total_reviews: 980,
          distance: 92,
          category: 'popular',
          ranking: '#3'
        },
        {
          id: 1,
          image_url: '/src/assets/images/Pasig Museum.png',
          address: 'Plaza Rizal, 2 F. Concepcion, Pasig',
          title: 'Pasig City Museum',
          description: 'Historic house museum in Pasig, Metro Manila in the Philippines.',
          rating: 4.2,
          total_reviews: 1200,
          distance: 2.3,
          category: 'popular',
          ranking: '#4'
        },
      ]);
      setCultural([
        {
          id: 7,
          image_url: '/src/assets/images/feature.jpg',
          title: 'Cultural Heritage Walk',
          description: 'Explore the rich cultural heritage of Pasig City through historical landmarks.',
          rating: 4.5,
          total_reviews: 560,
          distance: 1.5,
          category: 'cultural'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserFavorites = () => {
    // This would normally come from an API
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setUserFavorites(new Set(favorites));
  };

  const handlePlaceClick = (id: number) => {
    history.push(`/destination/${id}`);
  };

  const handleViewAll = (category: string) => {
    history.push('/all-destinations', { category });
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleNotificationClick = () => {
    history.push('/notifications');
  };

  const handleAIGuideClick = () => {
    history.push('/tabs/ai-guide');
  };

  const handleTourGuideClick = () => {
    history.push('/tabs/tour-guide');
  };

  const handleSettingsClick = () => {
    history.push('/tabs/settings');
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      history.push('/search-results', { query: searchQuery });
    }
  };

  const handleFavoriteClick = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent card click
    const newFavorites = new Set(userFavorites);
    
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    
    setUserFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
    
    // In a real app, you would call an API here
    // await toggleFavorite(id);
  };

  const handleNavigationClick = (e: React.MouseEvent, place: any) => {
    e.stopPropagation();
    if (place.latitude && place.longitude) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`, '_blank');
    } else {
      // Fallback to address search
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`, '_blank');
    }
  };

  const handleQuickActions = (action: string) => {
    switch (action) {
      case 'nearby':
        history.push('/nearby');
        break;
      case 'restaurants':
        history.push('/all-destinations', { category: 'restaurant' });
        break;
      case 'attractions':
        history.push('/all-destinations', { category: 'attraction' });
        break;
      case 'hotels':
        history.push('/all-destinations', { category: 'hotel' });
        break;
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader className='header'>
          <IonToolbar className="top-bar">
            <IonButtons slot="start" className="left-icons">
              <IonButton fill="clear" aria-label="notifications">
                <span className="notification-badge"></span>
                <IonIcon icon={notifications} className='notification'/>
              </IonButton>
            </IonButtons>
            <div className="center-space" />
            <IonSearchbar 
              className="main-search" 
              placeholder="Search destinations..." 
              searchIcon={search}
              value={searchQuery}
              onIonChange={e => setSearchQuery(e.detail.value || '')}
              onKeyPress={e => e.key === 'Enter' && handleSearchSubmit()}
            />
            <IonButtons slot="end" className="right-icons">
              <IonButton fill="clear" aria-label="profile" onClick={handleProfileClick}>
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
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading amazing destinations...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader className='header'>
        <IonToolbar className="top-bar">
          <IonButtons slot="start" className="left-icons">
            <IonButton fill="clear" aria-label="notifications" onClick={handleNotificationClick}>
              <span className="notification-badge"></span>
              <IonIcon icon={notifications} className='notification'/>
            </IonButton>
          </IonButtons>
          <div className="center-space" />
          <IonSearchbar 
            className="main-search" 
            placeholder="Search destinations..." 
            searchIcon={search}
            value={searchQuery}
            onIonChange={e => setSearchQuery(e.detail.value || '')}
            onKeyPress={e => e.key === 'Enter' && handleSearchSubmit()}
          />
          <IonButtons slot="end" className="right-icons">
            <IonButton fill="clear" aria-label="profile" onClick={handleProfileClick}>
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
        {/* Welcome Message */}
        <div className="welcome-section">
          <h1>Welcome back, {currentUser?.firstName || 'Traveler'}!</h1>
          <p>Discover amazing places in Pasig City</p>
        </div>

        {/* Quick Actions */}
        <section className="section quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <div className="quick-action" onClick={() => handleQuickActions('nearby')}>
              <div className="action-icon nearby">
                <IonIcon icon={location} />
              </div>
              <span>Near Me</span>
            </div>
            <div className="quick-action" onClick={() => handleQuickActions('restaurants')}>
              <div className="action-icon restaurants">
                <IonIcon icon={restaurant} />
              </div>
              <span>Restaurants</span>
            </div>
            <div className="quick-action" onClick={() => handleQuickActions('attractions')}>
              <div className="action-icon attractions">
                <IonIcon icon={colorFill} />
              </div>
              <span>Attractions</span>
            </div>
            <div className="quick-action" onClick={() => handleQuickActions('hotels')}>
              <div className="action-icon hotels">
                <IonIcon icon={bed} />
              </div>
              <span>Hotels</span>
            </div>
          </div>
        </section>

        {/* Recommended for You Section */}
        <section className="section">
          <div className="section-header">
            <h2>Recommended for You</h2>
            <IonButton 
              fill="clear" 
              className="view-all"
              onClick={() => handleViewAll('recommended')}
            >
              View All <IonIcon icon={chevronForward} slot="end" />
            </IonButton>
          </div>
          <div className="horizontal-scroll">
            {recommended.map((place) => (
              <IonCard 
                key={place.id} 
                className="recommend-card"
                onClick={() => handlePlaceClick(place.id)}
              >
                <div className="image-container">
                  <IonImg src={place.image_url || place.image} />
                  <button 
                    className="favorite-button"
                    onClick={(e) => handleFavoriteClick(e, place.id)}
                  >
                    <IonIcon 
                      icon={userFavorites.has(place.id) ? heart : heartOutline} 
                      color={userFavorites.has(place.id) ? "danger" : "medium"}
                    />
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-location">
                    <IonIcon icon={location} />
                    <span className="location-text">{place.address}</span>
                  </div>
                  <h3 className="card-title">{place.title}</h3>
                  <p className="card-desc">{place.description || place.desc}</p>
                  <div className="meta-row">
                    <div className="rating">
                      <IonIcon icon={star} />
                      <span className="rating-value">{place.rating}</span>
                      <span className="reviews-value">({place.total_reviews || '1.2k'})</span>
                    </div>
                    <span className="dot">•</span>
                    <span className="distance">{place.distance} km away</span>
                  </div>
                  <div className="action-buttons">
                    <IonButton 
                      size="small" 
                      fill="outline"
                      onClick={(e) => handleNavigationClick(e, place)}
                    >
                      <IonIcon icon={navigate} slot="start" />
                      Navigate
                    </IonButton>
                    <IonButton 
                      size="small" 
                      fill="solid"
                      onClick={() => handlePlaceClick(place.id)}
                    >
                      Details
                    </IonButton>
                  </div>
                </div>
              </IonCard>
            ))}
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="section">
          <div className="section-header">
            <h2>Popular Destinations</h2>
            <IonButton 
              fill="clear" 
              className="view-all"
              onClick={() => handleViewAll('popular')}
            >
              View All <IonIcon icon={chevronForward} slot="end" />
            </IonButton>
          </div>
          <IonGrid className="popular-grid">
            <IonRow>
              {popular.slice(0, 2).map((dest) => (
                <IonCol size="6" key={dest.id || dest.title}>
                  <div 
                    className="popular-card"
                    onClick={() => handlePlaceClick(dest.id)}
                  >
                    <div className="image-container">
                      <IonImg src={dest.image_url || dest.image} />
                      <button 
                        className="heart-icon"
                        onClick={(e) => handleFavoriteClick(e, dest.id)}
                      >
                        <IonIcon 
                          icon={userFavorites.has(dest.id) ? heart : heartOutline} 
                          color={userFavorites.has(dest.id) ? "danger" : "light"}
                        />
                      </button>
                      <div className="ribbon">
                        {dest.ranking || `#${popular.indexOf(dest) + 1}`}
                      </div>
                    </div>
                    <div className="card-info">
                      <h4>{dest.title}</h4>
                      <div className="rating">
                        <IonIcon icon={star} />
                        <span className="rating-value">{dest.rating}</span>
                        <span className='reviews-value'>({dest.total_reviews || dest.reviews})</span>
                      </div>
                      <div className="distance">
                        <IonIcon icon={location} /> {dest.distance} km away
                      </div>
                    </div>
                  </div>
                </IonCol>
              ))}
            </IonRow>
            <IonRow>
              {popular.slice(2, 4).map((dest) => (
                <IonCol size="6" key={dest.id || dest.title}>
                  <div 
                    className="popular-card"
                    onClick={() => handlePlaceClick(dest.id)}
                  >
                    <div className="image-container">
                      <IonImg src={dest.image_url || dest.image} />
                      <button 
                        className="heart-icon"
                        onClick={(e) => handleFavoriteClick(e, dest.id)}
                      >
                        <IonIcon 
                          icon={userFavorites.has(dest.id) ? heart : heartOutline} 
                          color={userFavorites.has(dest.id) ? "danger" : "light"}
                        />
                      </button>
                      <div className="ribbon">
                        {dest.ranking || `#${popular.indexOf(dest) + 1}`}
                      </div>
                    </div>
                    <div className="card-info">
                      <h4>{dest.title}</h4>
                      <div className="rating">
                        <IonIcon icon={star} />
                        <span className="rating-value">{dest.rating} ({dest.total_reviews || dest.reviews})</span>
                      </div>
                      <div className="distance">
                        <IonIcon icon={location} /> {dest.distance} km away
                      </div>
                    </div>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>

        {/* Cultural Highlights Section */}
        <section className="section">
          <div className="section-header">
            <h2>Cultural Highlights</h2>
            <IonButton 
              fill="clear" 
              className="view-all"
              onClick={() => handleViewAll('cultural')}
            >
              View All <IonIcon icon={chevronForward} slot="end" />
            </IonButton>
          </div>
          <div className="cultural-container">
            {cultural.map((place) => (
              <IonCard 
                key={place.id} 
                className="cultural-card"
                onClick={() => handlePlaceClick(place.id)}
              >
                <div className="cultural-content">
                  <div className="cultural-image">
                    <IonImg src={place.image_url || '/src/assets/images/feature.jpg'} />
                  </div>
                  <div className="cultural-info">
                    <h3>{place.title || 'Cultural Heritage Walk'}</h3>
                    <p>{place.description || 'Explore cultural highlights in Pasig City.'}</p>
                    <div className="cultural-meta">
                      <div className="rating">
                        <IonIcon icon={star} />
                        <span>{place.rating || 4.5}</span>
                      </div>
                      <div className="distance">
                        <IonIcon icon={location} />
                        <span>{place.distance || 1.5} km away</span>
                      </div>
                    </div>
                    <IonButton 
                      fill="solid" 
                      size="small"
                      onClick={() => handlePlaceClick(place.id)}
                    >
                      Explore Now
                    </IonButton>
                  </div>
                </div>
              </IonCard>
            ))}
            {cultural.length === 0 && (
              <IonCard className="cultural-card">
                <div className="cultural-content">
                  <div className="cultural-image">
                    <IonImg src="/src/assets/images/feature.jpg" />
                  </div>
                  <div className="cultural-info">
                    <h3>Cultural Heritage Walk</h3>
                    <p>Explore cultural highlights in Pasig City.</p>
                    <IonButton fill="solid" size="small">
                      Explore Now
                    </IonButton>
                  </div>
                </div>
              </IonCard>
            )}
          </div>
        </section>

        {/* Quick Navigation Tiles */}
        <section className="section navigation-tiles">
          <h3>Plan Your Visit</h3>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <div className="tile ai-guide" onClick={handleAIGuideClick}>
                  <IonIcon icon={chatbubble} />
                  <h4>AI Guide</h4>
                  <p>Get personalized recommendations</p>
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="tile tour-guide" onClick={handleTourGuideClick}>
                  <IonIcon icon={flag} />
                  <h4>Tour Guide</h4>
                  <p>Book local guides</p>
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="tile itineraries">
                  <IonIcon icon={calendar} />
                  <h4>Itineraries</h4>
                  <p>Pre-made travel plans</p>
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="tile settings" onClick={handleSettingsClick}>
                  <IonIcon icon={settings} />
                  <h4>Settings</h4>
                  <p>App preferences</p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>

        {/* Footer */}
        <div className="footer">
          <p>© 2024 Tourism App - Discover Pasig City</p>
          <div className="footer-links">
            <a onClick={() => history.push('/about')}>About</a>
            <a onClick={() => history.push('/contact')}>Contact</a>
            <a onClick={() => history.push('/privacy')}>Privacy Policy</a>
            <a onClick={() => history.push('/terms')}>Terms of Service</a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;