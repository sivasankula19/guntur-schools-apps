import React, { useEffect, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { caretDownOutline, caretDownCircleOutline } from 'ionicons/icons';
import { schoolAssetsDataDummy } from '../../common/utility';

const SchoolAssets: React.FC = () => {
  const [schoolAssetsData, setSchoolAssetsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Assets', path: '/assets' }];

  useEffect(() => {
    // make an api call -- if there is any changes in the assets info - with configuration api check
    // if(store.assets.length) no api needed as the data is made available and no assets data is changed in the be
    // as the configuration which is fetched every single time when we make app is launched at any time point.
    setIsLoading(true);
    setTimeout(() => {
      setSchoolAssetsData(schoolAssetsDataDummy)
      setIsLoading(false)
    }, 1500);
  }, [])

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue} />
      {isLoading ? <>
        <div className='m-10 school-assets'>
          <IonSkeletonText className='accordion_skeleton' animated={true} ></IonSkeletonText>
          <IonSkeletonText className='accordion_skeleton' animated={true} ></IonSkeletonText>
          <IonSkeletonText className='accordion_skeleton' animated={true} ></IonSkeletonText>
        </div>
      </> : <>
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
                  <IonLabel className="main-ion-label g-font-weight-600">{item.category}</IonLabel>
                </IonItem>
                {item?.assets?.length && <RenderCategories item={item} />}
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        </div>
      </>}
    </div>
  );
};

const RenderCategories = ({ item }: any) => {

  return (
    <div slot="content">
      <div>
        <IonAccordionGroup>
          {item.assets.map((asset: any) => (
            <IonAccordion
              key={asset.name}
              value={asset.name}
              toggleIcon={asset.types?.length ? caretDownCircleOutline : ''}
              toggleIconSlot="end"
              className="border-none"
            >
              <IonItem slot="header" color="light" className="border-none">
                <div className="school-assets-category"></div>
                <IonLabel className="g-font-weight-400 g-font-size-14 ml-6">{asset.name}</IonLabel>
              </IonItem>
              {asset.types?.length && <RenderSubtypes subType={asset.types} />}
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </div>
    </div>
  )
}

const RenderSubtypes = ({ subType }: any) => {
  return (
    <div slot="content" className='sub-type-parent'>
      {subType?.map((subtype: any, index: number) => {
        return (
          <div key={index} className="g-font-weight-400 g-font-size-14 sub-type">{subtype}</div>
        )
      })}
    </div>
  )
}

export default SchoolAssets;
