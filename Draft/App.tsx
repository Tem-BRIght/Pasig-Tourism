import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Theme variables */
import './theme/variables.css';

// Import pages
import Login from './pages/Login';
import Forgot from './pages/forgot';
import Forgot_Number from './pages/forgot_Number';
import SignUP from './pages/signup';
import SignUP2 from './pages/signup-2';
import Home from './pages/home';
import Profile from './pages/profile';
import AIGuide from './pages/AIGuide';
import TourGuide from './pages/TourGuide';
import SettingsPage from './pages/Settings';
import DestinationDetail from './pages/DestinationDetail';
import AllDestinations from './pages/AllDestinations';

// Import auth service
import { isAuthenticated } from './services/authService';
import { chatbubble, flag, home as homeIcon, settings } from 'ionicons/icons';

setupIonicReact();

// Protected Route Component
const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  return isAuthenticated() ? <Component /> : <Redirect to="/login" />;
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Public Routes */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/forgot_Number" component={Forgot_Number} />
          <Route exact path="/signup" component={SignUP} />
          <Route exact path="/signup-2" component={SignUP2} />
          
          {/* Protected Routes */}
          <Route exact path="/profile" render={() => 
            isAuthenticated() ? <Profile /> : <Redirect to="/login" />
          } />
          <Route exact path="/destination/:id" render={() => 
            isAuthenticated() ? <DestinationDetail /> : <Redirect to="/login" />
          } />
          <Route exact path="/all-destinations" render={() => 
            isAuthenticated() ? <AllDestinations /> : <Redirect to="/login" />
          } />
          
          {/* Tabs Routes */}
          <Route path="/tabs" render={() => <TabContainer />} />
          
          {/* Default redirect */}
          <Route exact path="/">
            <Redirect to={isAuthenticated() ? "/tabs/home" : "/login"} />
          </Route>
          
          {/* Redirect /home to tabs/home for backward compatibility */}
          <Route exact path="/home">
            <Redirect to="/tabs/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const TabContainer: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs/home" component={Home} />
      <Route exact path="/tabs/ai-guide" component={AIGuide} />
      <Route exact path="/tabs/tour-guide" component={TourGuide} />
      <Route exact path="/tabs/settings" component={SettingsPage} />
      <Route exact path="/tabs/destination/:id" component={DestinationDetail} />
      <Route exact path="/tabs/all-destinations" component={AllDestinations} />
      <Route exact path="/tabs" render={() => <Redirect to="/tabs/home" />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={homeIcon} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="ai-guide" href="/tabs/ai-guide">
        <IonIcon icon={chatbubble} />
        <IonLabel>AI Guide</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tour-guide" href="/tabs/tour-guide">
        <IonIcon icon={flag} />
        <IonLabel>Tour Guide</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/tabs/settings">
        <IonIcon icon={settings} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default App;