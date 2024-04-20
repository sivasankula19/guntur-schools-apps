// Header.tsx

import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle  className='header_schoolname'>Government High School Madugula sov</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
