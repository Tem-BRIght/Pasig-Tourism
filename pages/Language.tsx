import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonIcon
} from '@ionic/react';
import { arrowBackOutline, globeOutline, locationOutline, timeOutline, calendarOutline, thermometerOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './Language.css';

const LanguageRegion: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon
            icon={arrowBackOutline}
            className="back-icon"
            onClick={() => history.goBack()}
          />
          <IonTitle>Language & Region</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* APP LANGUAGE */}
        <section className="section">
          <h3><IonIcon icon={globeOutline} /> App Language</h3>
          <IonRadioGroup value="en">
            <IonItem>
              <IonLabel>English (Default)</IonLabel>
              <IonRadio value="en" />
            </IonItem>
            <IonItem>
              <IonLabel>Filipino</IonLabel>
              <IonRadio value="fil" />
            </IonItem>
            <IonItem>
              <IonLabel>Español</IonLabel>
              <IonRadio value="es" />
            </IonItem>
            <IonItem>
              <IonLabel>中文</IonLabel>
              <IonRadio value="zh" />
            </IonItem>
            <IonItem>
              <IonLabel>日本語</IonLabel>
              <IonRadio value="jp" />
            </IonItem>
            <IonItem>
              <IonLabel>한국어</IonLabel>
              <IonRadio value="kr" />
            </IonItem>
          </IonRadioGroup>
        </section>

        {/* REGION */}
        <section className="section">
          <h3><IonIcon icon={locationOutline} /> Region</h3>
          <IonRadioGroup value="ph">
            <IonItem>
              <IonLabel>Philippines (Default)</IonLabel>
              <IonRadio value="ph" />
            </IonItem>
            <IonItem>
              <IonLabel>United States</IonLabel>
              <IonRadio value="us" />
            </IonItem>
            <IonItem>
              <IonLabel>United Kingdom</IonLabel>
              <IonRadio value="uk" />
            </IonItem>
            <IonItem>
              <IonLabel>Australia</IonLabel>
              <IonRadio value="au" />
            </IonItem>
            <IonItem>
              <IonLabel>Singapore</IonLabel>
              <IonRadio value="sg" />
            </IonItem>
          </IonRadioGroup>
        </section>

        {/* TIME FORMAT */}
        <section className="section">
          <h3><IonIcon icon={timeOutline} /> Time Format</h3>
          <IonRadioGroup value="12">
            <IonItem>
              <IonLabel>12-hour (2:30 PM)</IonLabel>
              <IonRadio value="12" />
            </IonItem>
            <IonItem>
              <IonLabel>24-hour (14:30)</IonLabel>
              <IonRadio value="24" />
            </IonItem>
          </IonRadioGroup>
        </section>

        {/* DATE FORMAT */}
        <section className="section">
          <h3><IonIcon icon={calendarOutline} /> Date Format</h3>
          <IonRadioGroup value="mdy">
            <IonItem>
              <IonLabel>MM/DD/YYYY (11/20/2023)</IonLabel>
              <IonRadio value="mdy" />
            </IonItem>
            <IonItem>
              <IonLabel>DD/MM/YYYY (20/11/2023)</IonLabel>
              <IonRadio value="dmy" />
            </IonItem>
            <IonItem>
              <IonLabel>YYYY-MM-DD (2023-11-20)</IonLabel>
              <IonRadio value="ymd" />
            </IonItem>
          </IonRadioGroup>
        </section>

        {/* TEMPERATURE UNIT */}
        <section className="section">
          <h3><IonIcon icon={thermometerOutline} /> Temperature Unit</h3>
          <IonRadioGroup value="c">
            <IonItem>
              <IonLabel>Celsius (°C)</IonLabel>
              <IonRadio value="c" />
            </IonItem>
            <IonItem>
              <IonLabel>Fahrenheit (°F)</IonLabel>
              <IonRadio value="f" />
            </IonItem>
          </IonRadioGroup>
        </section>

        {/* ACTION BUTTONS */}
        <div className="action-buttons">
          <IonButton fill="outline" color="medium">Cancel</IonButton>
          <IonButton color="primary">Save</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LanguageRegion;
