import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { caretDownCircleOutline, caretDownOutline, saveOutline } from 'ionicons/icons';
import { schoolAssetsDataDummy } from '../../common/utility';

function SchoolAssetsSA() {
    const [schoolAssetsData, setSchoolAssetsData] = useState<any>([])
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Assets', path: '/assets' }];

    useEffect(() => {
        setSchoolAssetsData(schoolAssetsDataDummy)
    }, [])

    return (
        <div className='g_full_height school_assets_sa'>
            <div className='g_flex g_space_btwn'>
                <GBreadCrumbs data={breadCrumbsValue} />
                <div className='save_icon'>
                    <IonIcon icon={saveOutline}></IonIcon>
                </div>
            </div>
            <div className='school-assets school-assets-sa'>
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
                            {item?.assets?.length && <RenderCategories item={item} />}
                        </IonAccordion>
                    ))}
                </IonAccordionGroup>
            </div>
            <div className='add_assets_cnt'>
                <div className='input_btn_assets g_flex g_space_btwn'>
                    <input placeholder='Add new category' /> <button>Add</button>
                </div>
            </div>
        </div>
    )
}


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
                                <IonLabel className="g-fontweight-400 g-fontsize-14 ml-6">{asset.name}</IonLabel>
                            </IonItem>
                            {asset.types?.length && <RenderSubtypes subType={asset.types} />}
                        </IonAccordion>
                    ))}
                </IonAccordionGroup>
            </div>
            <div>hello</div>
        </div>
    )
}

const RenderSubtypes = ({ subType }: any) => {
    return (
      <div slot="content" className='sub-type-parent'>
        {subType?.map((subtype: any, index: number) => {
          return (
            <div key={index} className="g-fontweight-400 g-fontsize-14 sub-type">{subtype}</div>
          )
        })}
      </div>
    )
  }


export default SchoolAssetsSA