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
      image: '/assets/images/Museum/Pasig Museum.png',
      address: 'Plaza Rizal, 2 F. Concepcion, Pasig',
      title: 'Pasig City Museum',
      desc: 'Historic house museum in Pasig, Metro Manila in the Philippines.',
      rating: 4.2,
      distance: '2.3 km away',
    },
    {
      id: 2,
      image: 'assets/images/Ace hotel/Ace Hotel.png',
      address: 'Ace Hotel & Suites',
      title: 'Ace Hotel Spa',
      desc: 'A safe haven to relax and enjoy the healing benefits of Hydrotherapy.',
      rating: 4.6,
      distance: '3.1 km away',
    },
    {
      id: 3,
      image: 'assets/images/Dimas-Alang/dimas-alang.png',
      address: 'A. Mabini Street, Pasig',
      title: 'Panaderia Dimas-Alang',
      desc: 'The oldest bakery in Pasig, and possibly one of the oldest in the country.',
      rating: 4.7,
      distance: '4.5 km away',
    },

  ];

  

  const popular = [
    {
      image: '/assets/images/Cathedral/Pasig Cathedral.png',
      title: 'Pasig Cathedral',
      rating: 4.7,
      reviews: '1.5k',
      distance: '45 km away',
      ranking: '#1',
      desc: 'The Immaculate Conception Cathedral, commonly known as Pasig Cathedral, is one of the oldest churches in Metro Manila. Established in 1572, it has withstood earthquakes, wars, and time, serving as a spiritual and historical landmark for over 450 years. The cathedral features Spanish colonial architecture with intricate baroque details, including a historic pipe organ and beautifully preserved religious artifacts.',
      location: 'San Nicolas, Pasig City',
      coordinates: '14.5715° N, 121.0750° E',
      hours: 'Open 6:00 AM - 8:00 PM daily',
      entrance: 'Free entry (donations welcome)',
      suggestedVisit: '30-45 mins',
      goodFor: 'Religious, History',
      wheelchairAccessible: 'Partial',
      parking: 'Parking available beside the cathedral',
      lastUpdated: 'January 2026',
      about: 'The Immaculate Conception Cathedral, commonly known as Pasig Cathedral, is one of the oldest churches in Metro Manila. Established in 1572, it has withstood earthquakes, wars, and time, serving as a spiritual and historical landmark for over 450 years. The cathedral features Spanish colonial architecture with intricate baroque details, including a historic pipe organ and beautifully preserved religious artifacts.',
      history: '• 1572: Founded by Augustinian missionaries\n• 1639: Destroyed during the Chinese uprising\n• 1690: Rebuilt in its current form\n• 1945: Survived World War II bombing\n• 2003: Declared a National Cultural Treasure\n• 2012: Major restoration completed',
      features: '✓ Historic pipe organ (18th century)\n✓ Museum of religious artifacts\n✓ Prayer garden\n✓ Gift shop with local crafts\n✓ Mass in English and Tagalog\n✓ Air-conditioned main chapel\n✓ Free guided tours (Sundays)',
      massSchedule: 'WEEKDAYS:\n• 6:00 AM (Tagalog)\n• 12:15 PM (English)\n• 6:00 PM (Tagalog)\n\nSATURDAYS:\n• 6:00 AM, 12:15 PM, 6:00 PM\n• Anticipated Mass: 5:30 PM\n\nSUNDAYS:\n• 6:00 AM, 8:00 AM, 10:00 AM (Tagalog)\n• 12:00 PM, 4:00 PM, 6:00 PM (English)\n• 2:00 PM (Youth Mass)',
      visitorTips: '• Dress modestly (shoulders and knees covered)\n• Photography allowed but no flash during services\n• Best time to visit: Weekday mornings (less crowded)\n• Parking available beside the cathedral\n• Free Wi-Fi in the courtyard\n• Restrooms available near the entrance',
      nearbyAttractions: '• Pasig City Museum (200m walk)\n• Plaza Rizal (across the street)\n• Old Pasig Market (300m)\n• Pasig River Walk (500m)',
      reviewsSummary: '⭐⭐⭐⭐⭐ "Beautiful and historic" - Maria S.\n⭐⭐⭐⭐⭐ "Peaceful atmosphere" - Juan D.\n⭐⭐⭐⭐  "Great for photography" - Sarah L.\n⭐⭐⭐⭐⭐ "Must-visit in Pasig" - TravelerMike'
    },
    {
      image: '/assets/images/Rave/Pasig Rainfo.png',
      title: 'Rainforest Park',
      rating: 4.5,
      reviews: '2.1k',
      distance: '58 km away',
      ranking: '#2',
      desc: 'RAVE (Rainforest Adventure Experience) Park is Pasig\'s urban oasis, offering 8 hectares of green space with adventure activities, educational exhibits, and recreational facilities. Originally part of the Pasig Rainforest Park, it was revitalized as an eco-adventure destination in 2010. The park combines nature conservation with adventure tourism, featuring ziplines, rope courses, and wildlife exhibits within the city.',
      location: 'Caruncho Ave, Pasig City',
      coordinates: '14.5650° N, 121.0880° E',
      hours: 'Open 8:00 AM - 6:00 PM daily',
      entrance: 'FREE (Some activities may have fees)',
      activities: '₱100-500 each',
      suggestedVisit: '2-4 hours',
      goodFor: 'Adventure, Family',
      wheelchairAccessible: 'Limited',
      parking: 'Available',
      lastUpdated: 'January 2026',
      about: 'RAVE (Rainforest Adventure Experience) Park is Pasig\'s urban oasis, offering 8 hectares of green space with adventure activities, educational exhibits, and recreational facilities. Originally part of the Pasig Rainforest Park, it was revitalized as an eco-adventure destination in 2010. The park combines nature conservation with adventure tourism, featuring ziplines, rope courses, and wildlife exhibits within the city.',
      attractions: 'Adventure Zone:\n1. **Canopy Zipline** ⭐ 4.8\n   • Length: 200 meters\n   • Height: 15 meters\n   • Price: ₱250 per ride\n   • Requirements: 12+ years, 40-100 kg\n\n2. **Aerial Rope Course** ⭐ 4.6\n   • Difficulty: Beginner to Advanced\n   • Duration: 30-45 minutes\n   • Price: ₱350\n   • Safety gear provided\n\n3. **Wall Climbing** ⭐ 4.5\n   • Height: 10 meters\n   • Routes: 6 difficulty levels\n   • Price: ₱150 per session\n\nNature Zone:\n• Butterfly Garden (100+ species)\n• Bird Aviary (native Philippine birds)\n• Botanical Garden (300+ plant species)\n• Koi Pond (feeding allowed)\n• Nature Trail (1.5 km walk)\n\nFamily Zone:\n• Children\'s Playground\n• Picnic Areas (tables available)\n• Biking Trail (bike rentals: ₱100/hour)\n• Fishing Pond (₱50 rental)\n• Mini Zoo (farm animals)',
      operatingHours: 'ADVENTURE ZONE:\n• Weekdays: 9:00 AM - 5:00 PM\n• Weekends: 8:00 AM - 6:00 PM\n\nNATURE ZONE:\n• Daily: 8:00 AM - 6:00 PM\n\nFAMILY ZONE:\n• Daily: 8:00 AM - 7:00 PM',
      packages: 'FAMILY PACKAGE (4 persons): ₱1,500\n• Entrance for 4\n• Zipline (2 rides each)\n• Rope course\n• 1-hour bike rental\n\nADVENTURE PACKAGE: ₱800\n• Entrance\n• All adventure activities (1 each)\n• Locker rental\n• Safety briefing',
      safety: '• All adventure activities have safety briefings\n• Certified guides and safety officers\n• First aid station on-site\n• Emergency evacuation plan\n• Weather monitoring system',
      visitorTips: '• Wear comfortable clothes and closed shoes\n• Bring water and snacks (food available)\n• Apply mosquito repellent\n• Arrive early on weekends (gets crowded)\n• Lockers available for ₱50\n• Best for photos: Butterfly Garden (10-11 AM)\n• Avoid rainy days for adventure activities',
      ecoFeatures: '✓ Solar-powered lighting\n✓ Rainwater harvesting\n✓ Waste segregation system\n✓ Native plant conservation\n✓ Wildlife rehabilitation'
    },
    {
      image: '/assets/images/Kapitolyo/Pasig Kapitolyo.png',
      title: 'Kapitolyo',
      rating: 4.6,
      reviews: '980',
      distance: '92 km away',
      ranking: '#3',
      desc: 'Kapitolyo is Pasig\'s premier food destination, known as the "Foodie Paradise of Pasig." This vibrant district features over 100 restaurants, cafes, and bars ranging from hole-in-the-wall eateries to upscale dining establishments. Once a quiet residential area, Kapitolyo transformed in the 2000s into a culinary hotspot, offering everything from traditional Filipino dishes to international cuisine.',
      location: 'Kapitolyo, Pasig City',
      coordinates: '14.5790° N, 121.0840° E',
      hours: 'Best 11:00 AM - 11:00 PM',
      entrance: 'Free (Cost of food varies)',
      suggestedVisit: '2-3 hours',
      goodFor: 'Food, Nightlife',
      parking: 'Street/paid lots',
      lastUpdated: 'January 2026',
      about: 'Kapitolyo is Pasig\'s premier food destination, known as the "Foodie Paradise of Pasig." This vibrant district features over 100 restaurants, cafes, and bars ranging from hole-in-the-wall eateries to upscale dining establishments. Once a quiet residential area, Kapitolyo transformed in the 2000s into a culinary hotspot, offering everything from traditional Filipino dishes to international cuisine.',
      foodCategories: 'Top Restaurants:\n1. **Crispy King Pata** ⭐ 4.8\n   • Specialty: Crispy Pata\n   • Price: ₱300-500\n   • Must-try: Lechon Kawali\n\n2. **Silantro Fil-Mex** ⭐ 4.7\n   • Specialty: Mexican-Filipino fusion\n   • Price: ₱200-400\n   • Must-try: Beef Nachos\n\n3. **The Mango Tree** ⭐ 4.6\n   • Specialty: Thai cuisine\n   • Price: ₱400-800\n   • Must-try: Pad Thai\n\n4. **Raven\'s Burger** ⭐ 4.5\n   • Specialty: Gourmet burgers\n   • Price: ₱250-450\n   • Must-try: Double Bacon Cheeseburger',
      mustTryDishes: '• Crispy Pata (Filipino crispy pork leg)\n• Sisig (Sizzling pork dish)\n• Halo-halo (Filipino dessert)\n• Craft beers from local breweries\n• Artisanal coffee from specialty cafes',
      bestTimes: '• Lunch: 11:00 AM - 2:00 PM\n• Merienda: 3:00 PM - 5:00 PM\n• Dinner: 6:00 PM - 9:00 PM\n• Nightlife: 9:00 PM - 12:00 AM',
      parkingInfo: '✓ Street parking (pay parking)\n✓ Private lots: ₱50 first 3 hours\n✓ Valet available at some restaurants\n✓ Motorcycle parking areas',
      walkingTour: 'FOOD CRAWL ROUTE (2 hours):\n1. Start at Silantro (appetizers)\n2. Walk to Crispy King Pata (main course)\n3. Coffee break at Yardstick Coffee\n4. Dessert at Razon\'s Halo-Halo\n5. End at The Perfect Pint (drinks)',
      specialEvents: '• Food Festival: Every October\n• Kapitolyo Night Market: Weekends\n• Artisan Market: 1st Saturday monthly\n• Live Music Nights: Fridays',
      visitorTips: '• Come hungry - portions are generous\n• Share dishes to try more restaurants\n• Weekdays are less crowded\n• Many restaurants are cash-only\n• Make reservations for dinner on weekends\n• Try the "paluto" style at local carinderias'
    },
    {
      image: '/assets/images/Museum/Pasig Museum.png',
      title: 'Pasig City Museum',
      rating: 4.8,
      reviews: '1.2k',
      distance: '18 km away',
      ranking: '#4',
      desc: 'The Pasig City Museum, housed in the historic Bahay na Tisa (the oldest standing house in Pasig), showcases over 300 years of local history and culture. The museum features artifacts from pre-colonial times through Spanish colonization, American period, and modern development. The building itself is a historical treasure, originally constructed in the 1850s and restored to preserve its architectural heritage.',
      location: 'Plaza Rizal, Pasig City',
      coordinates: '14.5710° N, 121.0760° E',
      hours: 'Open 9:00 AM - 5:00 PM (Closed Mondays)',
      entrance: 'Free Entrance',
      suggestedVisit: '1-2 hours',
      goodFor: 'History, Education',
      wheelchairAccessible: 'Full',
      parking: 'Available behind building',
      lastUpdated: 'January 2026',
      about: 'The Pasig City Museum, housed in the historic Bahay na Tisa (the oldest standing house in Pasig), showcases over 300 years of local history and culture. The museum features artifacts from pre-colonial times through Spanish colonization, American period, and modern development. The building itself is a historical treasure, originally constructed in the 1850s and restored to preserve its architectural heritage.',
      exhibitHalls: 'Ground Floor:\n• **Pre-Colonial Gallery**\n  - Ancient pottery and tools\n  - Trade artifacts with China\n  - Early settlement models\n  - Interactive touch screens\n\n• **Spanish Colonial Gallery**\n  - Religious artifacts\n  - Documents from Spanish era\n  - Replica of the Pasig River trading port\n  - Audio guide available\n\nSecond Floor:\n• **American Period Gallery**\n  - World War II memorabilia\n  - Photographs of old Pasig\n  - Educational exhibits\n  - Video documentary room\n\n• **Modern Pasig Gallery**\n  - City development timeline\n  - Mayoral portraits\n  - Awards and achievements\n  - Future development plans',
      specialExhibits: '• **Rotating Gallery** (changes quarterly)\n  Currently: "Pasig River: Life Source"\n• **Children\'s Interactive Zone**\n  Hands-on history activities\n• **Digital Archive Room**\n  Access to historical documents',
      guidedTours: 'REGULAR TOURS:\n• English: 10:00 AM, 2:00 PM\n• Tagalog: 11:00 AM, 3:00 PM\n• Duration: 45 minutes\n• Max group: 20 persons\n• Price: Included with entrance\n\nSPECIALTY TOURS:\n• Architecture Tour (Saturdays, 4:00 PM)\n• Kids History Tour (Sundays, 10:30 AM)\n• Photography Tour (by appointment)',
      collections: '• 500+ historical artifacts\n• 2,000+ photographs archive\n• 300+ historical documents\n• 50+ scale models\n• Oral history recordings\n• Digital interactive displays',
      researchFacilities: '✓ Library with historical references\n✓ Digital archives access\n✓ Research assistance\n✓ Photo reproduction services\n✓ Academic collaboration',
      visitorServices: '• Free Wi-Fi throughout\n• Air-conditioned galleries\n• Gift shop (local crafts, books)\n• Cafe with local snacks\n• Nursing room\n• Prayer room\n• Wheelchair rentals (free)\n• Luggage storage (₱50)',
      rules: '• No flash photography\n• No food or drinks in galleries\n• Silence mobile phones\n• Children must be supervised\n• No touching of exhibits\n• Sketching allowed (pencil only)',
      specialPrograms: '• School Field Trips (discounted rates)\n• Senior Citizen Wednesdays (free)\n• Museum Nights (last Friday monthly)\n• Historical Workshops (monthly)\n• Volunteer Program',
      visitorTips: '• Best time: Weekday mornings (quietest)\n• Allow 1.5 hours minimum\n• Join the 2:00 PM tour (less crowded)\n• Check website for special exhibits\n• Combine visit with Plaza Rizal\n• Parking available behind building\n• Photography allowed (no flash)',
      nearbyAttractions: '• Plaza Rizal (adjacent)\n• Pasig Cathedral (200m)\n• Pasig River Esplanade (500m)\n• Old Pasig Market (300m)'
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
                <IonCard key={place.id} className="recommend-card" onClick={() => router.push('/home/destination-detail', place)}>
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
