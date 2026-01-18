import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
import Tab1 from './pages/Tab1';

// Import auth service
import { isAuthenticated } from './services/authService';

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
          
          {/* Protected Routes - Only accessible when logged in */}
          <Route exact path="/Tab1" render={() => 
            isAuthenticated() ? <Tab1 /> : <Redirect to="/login" />
          } />
          
          {/* Default redirect */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;