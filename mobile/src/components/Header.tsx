// Header.tsx

import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonSearchbar,
  IonIcon,
  IonText,
} from '@ionic/react';
import { useSelector } from 'react-redux';
import { searchOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const navigate = useNavigate()
  console.log('is auth', isAuthenticated);

  const handleSearchBack = () => {
    navigate('/select-school')
  }

  return (
    <IonHeader>
      <IonToolbar className={`${isAuthenticated && 'customised_toolbar_auth'} `}>
        {isAuthenticated ? (
          <>
            <IonButtons slot="start">
              <IonMenuButton className='customised_menu_btns_top' />
            </IonButtons>
            <div className='menu_profile_conatiner'>
              <img src='https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg' />
            </div>
            <IonTitle className="header_schoolname">
              Siva Sankula User 123
            </IonTitle>
          </>
        ) : (
          <>
            <IonItem onClick={handleSearchBack} className="custom_header_item">
              <div className="g_flex g_align_cntr">
                <IonIcon icon={searchOutline}></IonIcon>
                <IonText>
                  <p>Government High School Madugula sov</p>
                </IonText>
              </div>
            </IonItem>
          </>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
