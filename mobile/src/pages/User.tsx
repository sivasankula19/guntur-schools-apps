import {
  IonContent,
  IonPage,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCard,
  IonInput,
  IonButton,
  IonIcon,
  IonList,
} from '@ionic/react';
import {
  personCircleOutline,
  pencil,
  calendarClearOutline,
} from 'ionicons/icons';
import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GCustomisedModal from '../components/GCustomisedModal';
import { useNavigate } from 'react-router';

const userData: any = [
  { key: 'Full Name', value: 'Sivaiah Sankula' },
  { key: 'Mobile Number', value: '7995954105' },
  { key: 'Email Address', value: 'Sivaiah Sankula' },
  { key: 'Register Number', value: 'Y17EC124' },
  { key: 'Class of Study', value: 'class 8-A' },
  { key: 'Date of Birth', value: '06-04-1998' },
  { key: 'Gender', value: 'Male' },
];
const UserByID: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [eventDateTime, setEventDateTime] = useState<any>('');
  const modal = useRef<HTMLIonModalElement>(null);
  const [eventModal, setEventModal] = useState(false);
  const navigate=useNavigate()

  function getNextHourDateTime(isCurrent: boolean = false) {
    const now = new Date();

    let nextHour = isCurrent
      ? new Date()
      : new Date(now.getTime() + 60 * 60 * 1000);
    const year = nextHour.getFullYear();
    const month = String(nextHour.getMonth() + 1).padStart(2, '0');
    const day = String(nextHour.getDate()).padStart(2, '0');
    const hours = String(nextHour.getHours()).padStart(2, '0');
    const minutes = String(nextHour.getMinutes()).padStart(2, '0');
    const seconds = String(nextHour.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  }

  return (
    <IonPage className="my_page">
      <Header />
      <IonContent fullscreen>
        <IonBreadcrumbs>
          <IonBreadcrumb>
            <div>Home</div> <div slot="separator"></div>
          </IonBreadcrumb>
          <div className="separator_bread">/</div>
          <IonBreadcrumb>Students List - 8A001</IonBreadcrumb>
        </IonBreadcrumbs>
        <div className="d-flex-jc-center">
          <IonCard className="profile-card">
            <div className="user_id profile-name">Sankula sivaiah</div>
            <img src={personCircleOutline} height="80%" width="80%"></img>
          </IonCard>
        </div>
        <div className="display-data">
          {userData.map((user: any, index: number) => {
            return (
              <div className="display-data-main" key={index}>
                <div className="display-data-key">{user.key}</div>
                <div className="display-data-value">{user.value}</div>
              </div>
            );
          })}
        </div>
        <div className="bottom-button">
          <IonButton
            onClick={() => setEventModal(true)}
            size="small"
            className="button-text"
          >
            <IonIcon
              slot="start"
              icon={pencil}
              style={{ color: 'black' }}
            ></IonIcon>
            Edit Profile
          </IonButton>
        </div>
        <GCustomisedModal
          title="Update Profile"
          isOpen={eventModal}
          onClose={() => {
            setEventModal(false);
          }}
          onSave={() => {}}
        >
          <IonList>
            {userData.map((user: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{ paddingBottom: '2%' }}
                  className="custom-ion-input-wrapper"
                >
                  <IonInput
                    style={{ minHeight: 41 }}
                    className="custom-ion-input"
                    value={user.value}
                    label={user.key}
                    labelPlacement="floating"
                    fill="outline"
                    placeholder={`Enter ${user.key}`}
                  ></IonInput>
                </div>
              );
            })}
          </IonList>
        </GCustomisedModal>
      </IonContent>
      <Footer></Footer>
    </IonPage>
  );
};

export default UserByID;
