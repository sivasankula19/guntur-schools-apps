import { IonIcon, IonText } from '@ionic/react'
import { arrowBackOutline, refreshOutline, saveOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setWarnToast } from '../redux/reducers/toastMessageSlice';

interface IBackSaveReset {
    handleSave: () => void;
    handleReset: () => void;
}

function GBackSaveReset({ handleReset, handleSave }: IBackSaveReset) {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const currentRole = useSelector((state: any) => state.auth.role);
    const rootAccess = useSelector((state: any) => state.accessControl.rootAccess);
    const accessModules = useSelector((state: any) => state.accessControl.accessModules) || [];
    const [unableProceed, setUnableProceed] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(isAuthenticated ? '/dashboard' : '/home');
    }

    const unAuthRoles = ["Student", "Parent"];

    useEffect(() => {
        if (currentRole === 'Teacher') {
            if (!rootAccess) {
                const attendanceModuleItem = accessModules.find((att: any) => att?.moduleId === 'schoolPublicInfo');
                if (attendanceModuleItem?.moduleRootAccess) {
                    setUnableProceed(false);
                } else {
                    setUnableProceed(true);
                    dispatch(setWarnToast('You Have Read Only Access!...'));
                }
            }
        }
    }, []);

    if ((!unAuthRoles.includes(currentRole) && isAuthenticated)) {
        return (<div className='g_flex g-space-between g-back-save-reset g-height-60px'>
            <div className='g_flex g-align-center'>
                <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                <IonText onClick={handleBack}><p>Back</p></IonText>
            </div>
            {unableProceed === false && (<div className='g_flex g-align-center'>
                <IonIcon onClick={handleReset} icon={refreshOutline}></IonIcon>
                <IonIcon onClick={handleSave} className='m-left-20' icon={saveOutline}></IonIcon>
            </div>)}
        </div>)
    } else {
        return null
    }
}

export default GBackSaveReset