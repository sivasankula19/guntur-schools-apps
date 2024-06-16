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
    <IonHeader className={`${isAuthenticated ? 'customised_head_auth' : ''}`}>
      <IonToolbar className={`${isAuthenticated ? 'customised_toolbar_auth' : ''}`}>
        {isAuthenticated ? (
          <>
            <IonButtons slot="start">
              <IonMenuButton className="customised_menu_btns_top" />
            </IonButtons>
            <div className="menu_profile_conatiner">
              <img
                src="https://avatars.githubusercontent.com/u/93701195?s=60&v=4"
                alt="Profile"
              />
            </div>
            {/* <IonTitle className={`${isPlatform('desktop') ? 'web_scl' : ''} header_schoolname`}>
              {authInfo?.user?.fullName || 'Name'}
            </IonTitle> */}
            <div className='g_flex header_caret'>
              <IonTitle className={`${isPlatform('desktop') ? 'web_scl' : ''} header_schoolname`}>
                {authInfo?.user?.fullName || 'Name'}
              </IonTitle>
              <IonIcon icon={caretDownOutline}></IonIcon>
            </div>
          </>
        ) : (
          <>
            <IonItem onClick={handleSearchBack} className="custom_header_item">
              <div className="g_flex g_align_cntr">
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
