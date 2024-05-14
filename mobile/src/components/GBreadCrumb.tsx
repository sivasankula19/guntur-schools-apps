import { IonText } from '@ionic/react';
import React, { ReactElement } from 'react';

const GBreadCrumb: React.FC<IBreadCrumbProps> = ({ bName }) => {
  return (
    <div className="g_bread">
      <IonText>
        <p>{bName}</p>
      </IonText>
    </div>
  );
};

interface IBreadCrumbProps {
  bName: string;
  // children:React.ReactNode
}

export default GBreadCrumb;
