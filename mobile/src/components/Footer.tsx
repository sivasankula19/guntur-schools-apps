// Footer.tsx

import React, { useRef, useState } from 'react';
import {
  IonToolbar,
  IonFooter,
  IonIcon,
  IonModal,
  IonText,
  IonContent,
  IonLabel,
  IonItemDivider,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/react';
import {
  caretUpCircleOutline,
  keyOutline,
  notificationsCircleOutline,
  settingsOutline,
  thumbsUpOutline,
} from 'ionicons/icons';
import { useNavigate } from 'react-router';

const Footer: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const iconsList = [
    { name: 'Settings', icon: settingsOutline, path: '/settings' },
    { name: 'Reset Password', icon: keyOutline, path: '/reset-password' },
    { name: 'Rate Us', icon: thumbsUpOutline, path: '/rate-us ' },
    {
      name: 'Notifications',
      icon: notificationsCircleOutline,
      path: '/notifications ',
    },
  ];

  const navigate = useNavigate();

  return (
    <IonFooter className="custom_footer_ion">
      <IonToolbar onClick={() => setIsOpen(true)} className="g_txt_center tool-bar-container">
        <IonIcon icon={caretUpCircleOutline}></IonIcon>
      </IonToolbar>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        ref={modal}
        initialBreakpoint={0.6}
        breakpoints={[0, 0.6, 0.85]}
      >
        {location.pathname === '/select-school' ?
          (<><OwnSchoolUI /></>)
          :
          (<><DefaultUI iconsList={iconsList} /></>)
        }
      </IonModal>
    </IonFooter>
  );
};

const PoweredBy = () => {
  return (
    <div className="powered-by-container">
      <IonText>
        <h4>Powered By</h4>
      </IonText>
      <div className="g_flex">
        <div className="logo">logo</div>
        <div>Title</div>
      </div>
      <div>
        <a>Privacy & Polacy</a>
        <a>WebSite</a>
      </div>
    </div>
  )
}

const ColumnUI = ({ columnName }: any) => {
  return (
    <IonCol size="6" className='own-school-main' >
      <div className='own-school g-font-weight-400 g-font-size-14'>{columnName}</div>
    </IonCol>
  )
}

const RowUI = ({ firstEle, secondEle }: any) => {
  return (
    <IonRow>
      <ColumnUI columnName={firstEle} />
      <ColumnUI columnName={secondEle} />
    </IonRow>
  )
}

const OwnSchoolUI = () => {

  const navigate = useNavigate();

  const handleRegisterSchool = (registerType: string) => {
    switch (registerType) {
      case 'Register': // navigate to register page
        navigate('/register-school');
        break;
      case 'Register Call Back': // navigate to register call back
        break;
      default:
    }
  }

  return (
    <IonContent className="ion-padding footer_container">
      <IonText>
        <h6 className='g-font-weight-600'>Own a school ?</h6>
      </IonText>
      <div >
        <p className='g-font-weight-500 g-font-size-14'>
          Register With Us And Get
        </p>
        <div >
          <IonGrid style={{ marginBottom: 10 }}>
            <RowUI firstEle='Unlimited Cloud Storage' secondEle='Interactive Learning' />
            <RowUI firstEle='Accessibility' secondEle='Attendance Management' />
            <RowUI firstEle='Focusing Individually' secondEle='Time Efficiency' />
          </IonGrid>
        </div>
        <div className="g_flex g-justify-center">
          <button className='reg-req-cb g-font-weight-600 g-font-size-18' onClick={() => handleRegisterSchool('Register')}>Register</button>
        </div>
        <p className='g-font-weight-500'>Request Call Back</p>
        <div className="g_flex g-justify-center">
          <button className='reg-req-cb g-font-weight-600 g-font-size-18' onClick={() => handleRegisterSchool('Register Call Back')}>Request Call Back</button>
        </div>
      </div>

      <PoweredBy />
    </IonContent>
  )
}

const DefaultUI = ({ iconsList }: any) => {
  return (
    <IonContent className="ion-padding footer_container">
      <IonText>
        <h6>Government High School Madugula </h6>
      </IonText>
      <div className="g_flex scl_info_container">
        <div className="left">
          <div className="logo"></div>
          <p>
            <a>School Website </a>
          </p>
          <p>
            <a>Privacy & Polocy</a>
          </p>
        </div>
        <div className="right">
          <IonLabel>Mobile</IonLabel>
          <IonText>
            <p>+91 7995954105</p>
          </IonText>
          <IonLabel>Email</IonLabel>
          <IonText>
            <p>student@school.com</p>
          </IonText>
          <IonLabel>Address</IonLabel>
          <IonText>
            <p>
              <a>Maduglar</a>
            </p>
          </IonText>
        </div>
      </div>
      <div>
        <IonItemDivider></IonItemDivider>
      </div>
      <div className="g_flex g-space-between">
        {iconsList.map((item: any) => (
          <IonIcon key={item.name} icon={item.icon}></IonIcon>
        ))}
      </div>
      <PoweredBy />
    </IonContent>
  )
}


export default Footer;
