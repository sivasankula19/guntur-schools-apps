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
  expandOutline,
} from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GCustomisedModal from '../components/GCustomisedModal';
import { useNavigate } from 'react-router';
import GImageDocPreview from '../components/GImageDocPreview';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { useSelector } from 'react-redux';

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
  const authInfo = useSelector((state: any) => state.auth);
  const [eventDateTime, setEventDateTime] = useState<any>('');
  const modal = useRef<HTMLIonModalElement>(null);
  const [eventModal, setEventModal] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  const [breadCrumbsState,setBreadCrumbsState] =useState([
    { bName: 'Home', path: '/dashboard' },
    { bName: 'Student', path: '/students-list' },
  ])

  useEffect(()=>{
    if(authInfo.user.regNumber === id){
      setBreadCrumbsState(prev => [prev[0], {bName:'My Profile', path:'/'} ])
    }
  },[])

  return (
    <IonPage className="my_page">
      <Header />
      <IonContent fullscreen>
        <GBreadCrumbs data={breadCrumbsState}></GBreadCrumbs>
        <div className="d-flex-jc-center">
          <IonCard className="profile-card">
            <div className="user_id profile-name">Sankula sivaiah</div>
            <img
              src={
                'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106'
              }
              height="80%"
              width="80%"
            ></img>
            <div className="icon_full_expand">
              {authInfo.user.regNumber === id && (
                <IonIcon icon={pencil}></IonIcon>
              )}
              <IonIcon
                onClick={() => setIsOpen(true)}
                icon={expandOutline}
              ></IonIcon>
            </div>
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
        {authInfo.user.regNumber === id && (
          <div className="bottom-button">
            <IonButton
              onClick={() => setEventModal(true)}
              size="small"
              className="button-text"
            >
              <IonIcon
                slot="start"
                icon={pencil}
              ></IonIcon>
              Edit Profile
            </IonButton>
          </div>
        )}
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
                    className="custom-ion-input"
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
      <GImageDocPreview
        src={
          'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106'
        }
        title={authInfo.user.fullName || 'Student Name'}
        onClose={() => {
          setIsOpen(false);
        }}
        onDownload={() => {}}
        isOpen={isOpen}
      ></GImageDocPreview>
      <Footer></Footer>
    </IonPage>
  );
};

export default UserByID;
