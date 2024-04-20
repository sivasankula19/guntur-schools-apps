import { IonBreadcrumb, IonBreadcrumbs } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';

const AcedamicSubject: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>
      <IonBreadcrumbs>
        <IonBreadcrumb>
          <div>Home</div> <div slot="separator"></div>
        </IonBreadcrumb>
        <div className="separator_bread">/</div>
        <IonBreadcrumb>AcedamicSubject</IonBreadcrumb>
      </IonBreadcrumbs>
    </div>
  );
};

export default AcedamicSubject;
