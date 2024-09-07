import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonIcon,
  IonText,
  IonButton,
  IonPopover,
  IonContent,
} from '@ionic/react';
import { useSelector } from 'react-redux';
import { caretDownOutline, searchOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';
import { isPlatform } from '@ionic/react';

const Header: React.FC = React.memo(() => {
  const selectedSchool = useSelector((state: any) => state.school.selectedSchool);
  const isMobile = isPlatform('desktop');
  const authInfo = useSelector((state: any) => state.auth);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleSearchBack = () => {
    navigate('/select-school');
  };

  return (
    <IonHeader className={`${isAuthenticated ? 'customized-head-auth' : ''}`}>
      <IonToolbar className={`${isAuthenticated ? 'customized-toolbar-auth' : ''}`}>
        {isAuthenticated ? (
          <>
            <IonButtons slot="start">
              <IonMenuButton className="customized-menu-btns-top" />
            </IonButtons>
            <div className="menu-profile-container">
              <img
                src="https://avatars.githubusercontent.com/u/93701195?s=60&v=4"
                alt="Profile"
              />
            </div>
            {/* <IonTitle className={`${isPlatform('desktop') ? 'web_scl' : ''} header-school-name`}>
              {authInfo?.user?.fullName || 'Name'}
            </IonTitle> */}
            <div className='g_flex header_caret'>
              <IonTitle className={`${isPlatform('desktop') ? 'web_scl' : ''} header-school-name`}>
                {authInfo?.user?.fullName || 'Name'}
              </IonTitle>

              <IonButton fill="clear" id="click-trigger"><IonIcon slot="icon-only" icon={caretDownOutline}></IonIcon></IonButton>
              <IonPopover trigger="click-trigger" triggerAction="click">
                <IonContent class="ion-padding">Hello World!</IonContent>
              </IonPopover>

            </div>
          </>
        ) : (
          <>
            <IonItem onClick={handleSearchBack} className="custom_header_item">
              <div className="g_flex g-align-center">
                <IonIcon icon={searchOutline} />
                <IonText>
                  <p>{selectedSchool?.schoolName}</p>
                </IonText>
              </div>
            </IonItem>
          </>
        )}
      </IonToolbar>
    </IonHeader>
  );
});

export default Header;
