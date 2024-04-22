import { IonBreadcrumb, IonBreadcrumbs } from '@ionic/react';
import React, {  } from 'react';

const GBreadCrumbs: React.FC<IBreadCrumbsProps> = ({ data }) => {
  return (
    <IonBreadcrumbs>
      {data.map((breadItem, index) => (
        <React.Fragment key={index}>
          <IonBreadcrumb>
            <div>{breadItem.bName}</div>{' '}
            {index !== data.length - 1 && <div slot="separator"></div>}
          </IonBreadcrumb>
          {index !== data.length - 1 && (
            <>
              <div className="separator_bread">/</div>
            </>
          )}
        </React.Fragment>
      ))}
    </IonBreadcrumbs>
  );
};

interface NavigationItem {
    bName: string;
    path: string;
  }
interface IBreadCrumbsProps {

  data: NavigationItem[];
}

export default GBreadCrumbs;
