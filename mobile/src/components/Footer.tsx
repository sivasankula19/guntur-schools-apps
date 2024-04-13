

// Footer.tsx

import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonFooter, IonIcon } from '@ionic/react';
import { caretUpCircleOutline } from 'ionicons/icons';

const Footer: React.FC = () => {
  return (
    <IonFooter className='custome_footer_ion'>
      <IonToolbar className='g_txt_center tool_bar_container'>
        <IonIcon icon={caretUpCircleOutline} size="large"></IonIcon>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
