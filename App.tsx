import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, chatbubble, flag, settings} from 'ionicons/icons';
import Login from './pages/Login';
import Forgot from './pages/forgot';
import ForgotNumber from './pages/forgot_Number';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import SignUP from './pages/signup';
import SignUP2 from './pages/signup-2';
import Home from './pages/home';
import AIGuide from './pages/AIGuide';
import TourGuide from './pages/TourGuide';
import SettingsPage from './pages/Settings';
import Profile from './pages/profile';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Login} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/forgot_Number" component={ForgotNumber} />
        <Route exact path="/signup" component={SignUP} />
        <Route exact path="/signup-2" component={SignUP2} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/home" component={() => <Redirect to="/tabs/home" />} />
        <Route path="/tabs" component={TabContainer} />
        <Route component={() => <Redirect to="/" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

const TabContainer: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs/home" component={Home} />
      <Route exact path="/tabs/ai-guide" component={AIGuide} />
      <Route exact path="/tabs/tour-guide" component={TourGuide} />
      <Route exact path="/tabs/settings" component={SettingsPage} />
      <Route exact path="/tabs" component={() => <Redirect to="/tabs/home" />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home" className="home-tab">
        <IonIcon icon={home} className='Active' />
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