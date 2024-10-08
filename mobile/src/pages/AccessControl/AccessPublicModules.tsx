import React, { useEffect, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonIcon, IonLabel, IonText } from '@ionic/react';
import { arrowBackOutline, bookOutline, businessOutline, callOutline, imageOutline, informationCircleOutline, ribbonOutline, saveOutline, trophyOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomToggle from '../../components/GCustomToggle';

function AccessPublicModules() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [chipsData, setChipsData] = useState<any>([]);
    const breadCrumbsValue = [
        { bName: 'Home', path: '/dashboard' },
        { bName: 'Access Control', path: '/access-control' },
        { bName: 'Public Modules', path: '/access-public-modules' }
    ];

    const handleSave = () => {
        // save api
    }

    const handleBack = () => {
        navigate('/access-control');
    }

    const chipsDataPrivate: any = [
        { id: 14, active: false, isFixed: false, moduleName: 'Ex-Circular', icon: ribbonOutline, redirectTo: '/ex-circular' },
        { id: 888, active: true, isFixed: false, moduleName: 'Assets', icon: businessOutline, redirectTo: '/assets' },
        { id: 15, active: false, isFixed: false, moduleName: 'Gallery', icon: imageOutline, redirectTo: '/gallery' },
        { id: 16, active: true, isFixed: false, moduleName: 'Achievements', icon: trophyOutline, redirectTo: '/achievements' },
        { id: 17, active: false, isFixed: true, moduleName: 'Contact-Us', icon: callOutline, redirectTo: '/contact-us' },
        { id: 18, active: true, isFixed: true, moduleName: 'About', icon: informationCircleOutline, redirectTo: '/about' },
        { id: 19, active: false, isFixed: false, moduleName: 'Courses', icon: bookOutline, redirectTo: '/courses' }
    ];

    useEffect(() => {
        setChipsData(chipsDataPrivate);
    }, [])

    const handleModelClose = () => {
        setIsOpen(false);
    }

    const handleSubmit = () => {
        // submit logic
    }

    const handleEditModel = () => {
        setIsOpen(true);
    }

    // Update state immutably
    const handleToggleChange = (event: any, moduleItem: any) => {
        const updatedChipsData = chipsData.map((item: any) =>
            item.id === moduleItem.id ? { ...item, active: event.detail.checked } : item
        );
        setChipsData(updatedChipsData);
    };

    return (
        <div className='access-private-modules g_full_height'>
            <GBreadCrumbs data={breadCrumbsValue} />
            <div className='back-save-icons m-top-10 p-h-16'>
                <div className='g_flex g-align-center'>
                <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                <IonText onClick={handleBack}><p>Back</p></IonText>
                </div>
                <IonIcon onClick={handleSave} icon={saveOutline}></IonIcon>
            </div>
            <div className='p-h-16 m-top-10 card-modules'>
                <div className='g_flex g-space-between'>
                    <IonLabel>Private Modules</IonLabel>
                    <div>
                        <a onClick={handleEditModel}>Edit</a>
                    </div>
                </div>
                <div className='items-pvt'>
                    {chipsData.map((moduleItem: any) => (<div key={moduleItem.id} className='item-pvt'>
                        <IonIcon icon={moduleItem.icon}></IonIcon>
                        <IonLabel className='g_text_ellipses'>{moduleItem.moduleName}</IonLabel>
                    </div>))}
                </div>
            </div>
            <CustomizedModal
                title={`Add Class`}
                isOpen={isOpen}
                onClose={handleModelClose}
                onSave={handleSubmit}
            >
                <div className='items-pvt'>
                    {chipsData.map((moduleItem: any) => (
                        <div key={moduleItem.id} className='g_flex g-space-between g-align-center'>
                            <div className='item-pvt width-50'>
                                <IonIcon icon={moduleItem.icon}></IonIcon>
                                <IonLabel className='g_text_ellipses'>{moduleItem.moduleName}</IonLabel>
                            </div>
                            <GCustomToggle checked={moduleItem.active} isDisabled={moduleItem.isFixed} onHandleChange={(e: any) => handleToggleChange(e, moduleItem)} />
                        </div>
                    ))}
                </div>
            </CustomizedModal>
        </div>
    )
}

export default AccessPublicModules;
