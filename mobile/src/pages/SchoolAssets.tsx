import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { caretDownOutline, folderOutline, warning,addCircleOutline } from 'ionicons/icons';
import { schoolAssetsData } from '../common/utility';

const SchoolAssets: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Assets', path: '/assets' }];

  const renderSubtypes=(subType:any)=>{
      return (
        
      <div slot="content" className='sub-type-parent'>
         {subType?.map((subtype:any,index:number)=>{
          return (
            <div key={index} className="g-fontweight-400 g-fontsize-14 sub-type">{subtype}</div>
          )
         })}
      </div>
      )
  }

  const renderCategories=(item:any)=>{
     return (
      <div slot="content">
      <div>
      <IonAccordionGroup>
          {item.assets.map((asset: any) => (
            <IonAccordion
              key={asset.name}
              value={asset.name}
              toggleIcon={asset.types?.length ? addCircleOutline : ''}
              toggleIconSlot="end"
              className="border-none"
            >
              <IonItem slot="header" color="light" className="border-none">
                <div className="school-assets-category"></div>
                <IonLabel className="g-fontweight-400 g-fontsize-14 ml-6">{asset.name}</IonLabel>
              </IonItem>
              {asset.types?.length && renderSubtypes(asset.types)}
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </div>
      </div>
     )
  }

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue} />
      <div className='school-assets'>
        <IonAccordionGroup>
          {schoolAssetsData.map((item: any) => (
            <IonAccordion
              key={item.id}
              value={item.id}
              toggleIcon={item?.assets?.length ? caretDownOutline : ''}
              toggleIconSlot="end"
            >
              <IonItem slot="header" color="light">
                <IonLabel className="main-ion-label g-fontweight-600">{item.category}</IonLabel>
              </IonItem>
             {item?.assets?.length && renderCategories(item)}
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </div>
    </div>
  );
};

export default SchoolAssets;
