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
} from '@ionic/react';
import {
  caretUpCircleOutline,
  keyOutline,
  notificationsCircleOutline,
  notificationsOffOutline,
  settingsOutline,
  thumbsUpOutline,
  thumbsUpSharp,
} from 'ionicons/icons';

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



  return (
    <IonFooter className="custome_footer_ion">
      {/* <div style={{position:'absolute', bottom:'0', zIndex:999, background:'red', width:'100%'}}>hello</div> */}
      <IonToolbar onClick={()=>setIsOpen(true)} className="g_txt_center tool_bar_container">
        <IonIcon icon={caretUpCircleOutline}></IonIcon>
      </IonToolbar>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        ref={modal}
        initialBreakpoint={0.6}
        breakpoints={[0, 0.6, 0.85]}
      >
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
          <div className="g_flex g_space_btwn">
            {iconsList.map((item) => (
              <IonIcon key={item.name} icon={item.icon}></IonIcon>
            ))}
          </div>
          <div className="poweredby_container">
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
        </IonContent>
      </IonModal>
    </IonFooter>
  );
};

export default Footer;
