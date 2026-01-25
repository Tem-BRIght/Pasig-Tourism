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
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/signup';
import SignUP2 from './pages/SignUp/signup-2';
import ForgotPassword from './pages/Forgot/forgot';
import ForgotNumber from './pages/Forgot/forgot_Number';
import AIGuide from './pages/AI/AIGuide';
import TourGuide from './pages/TourGuide/TourGuide';
import Settings from './pages/Settings/Settings';
import Home from './pages/Home/home';
import Profile from './pages/Home/Profile/profile';
import AllActivities from './pages/Home/Profile/AllActivities';
import DestinationDetail from './pages/Home/DestinationDetail/DestinationDetail';
import LanguageRegion from './pages/Settings/Language';
import NotificationSettings from './pages/Settings/Notifications';
import Notifications from './pages/Home/Notifications/Notifications';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup-2" component={SignUP2} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/forgot_Number" component={ForgotNumber} />
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/" component={TabContainer} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

const TabContainer: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/destination-detail" component={DestinationDetail} />
      <Route exact path="/ai-guide" component={AIGuide} />
      <Route exact path="/tour-guide" component={TourGuide} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path ="/home/profile" component={Profile} />
      <Route exact path="/home/profile/all-activities" component={AllActivities} />
      <Route exact path="/settings/language-region" component={LanguageRegion} />
      <Route exact path="/settings/notification" component={NotificationSettings} />
      <Route exact path="/notifications" component={Notifications} />
      <Route exact path="/" component={() => <Redirect to="/home" />} />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home" className="home-tab">
        <IonIcon icon={home} className='Active' />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="ai-guide" href="/ai-guide">
        <IonIcon icon={chatbubble} />
        <IonLabel>AI Guide</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/settings">
        <IonIcon icon={settings} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
      
    </IonTabBar>
  </IonTabs>
);

export default App;