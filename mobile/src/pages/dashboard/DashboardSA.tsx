import { IonCard, IonCardContent, IonText } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react'
import NavChipCard from '../../components/NavChipsCard';
import './Dashboard.css';
import { keyOutline } from 'ionicons/icons';
import DashboardTimeView from './DashboardTimeView';
import { useSelector } from 'react-redux';
import { chipsDataPrivate, chipsDataPublic } from '../../common/common-routes-list';

export const DashboardSA = () => {
    const [moduleSelected, setModuleSelected] = useState('');
    const [chipsToRender, setChipsRender] = useState<any>([]);
    const [publicChipsToRender, setPublicChipsToRender] = useState<any>([]);
    const dashboardRef = useRef<any>(null);
    const currentRole = useSelector((state: any) => state.auth.role);

    const handleModule = (e: any) => {
        let value = e?.target?.name || ''
        if (value !== moduleSelected) {
            setTimeout(() => {
                setModuleSelected(value)
            }, 100);
            setModuleSelected('');
        }
    }

    const chipsDataPublic1 = chipsDataPublic;
    const chipsDataPrivate1 = chipsDataPrivate;

    useEffect(() => {
        let chipsData = [...chipsDataPrivate1];
        if (currentRole === 'SuperAdmin') {
            chipsData.unshift({ id: 999, moduleName: 'Access Control', icon: keyOutline, redirectTo: '/access-control' });
        }
        setChipsRender(chipsData);
        setPublicChipsToRender(chipsDataPublic1);
    }, [currentRole]);

    return (
        <div className='dashboard_sa'>
            <IonCard>
                <IonCardContent className='resource_content'>
                    <div className='resources_text g_flex g-space-between'>
                        <div className='g_flex g-align-center width-30'>
                            <IonText>
                                <h1>Resources</h1>
                            </IonText>
                        </div>
                        <div className='g_flex width-70 btn-resources'>
                            <button className={`${moduleSelected === 'privateModule' ? 'selected-module-btn' : ''}`} name='privateModule' id='privateModule' onClick={handleModule}>Private Modules</button>
                            <button className={`${moduleSelected === 'publicModule' ? 'selected-module-btn' : ''}`} name='publicModule' id='publicModule' onClick={handleModule}>Public Modules</button>
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>
            {moduleSelected !== '' &&
                (<div className='dashboard dashboard-sa'>
                    <NavChipCard
                        isOpen={true}
                        handleView={() => handleModule(null)}
                        chips={moduleSelected === 'publicModule' ? publicChipsToRender : chipsToRender}
                    ></NavChipCard>
                </div>)
            }
            <div onClick={handleModule} className='analytics-container p-h-10'>
                <div className='g_txt_center analytics-holder-ds'>
                    Analytics Here!
                </div>
                <DashboardTimeView dashboardRef={dashboardRef} />
            </div>
        </div>
    )
}

