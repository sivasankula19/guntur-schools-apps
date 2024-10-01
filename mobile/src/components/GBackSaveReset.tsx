import { IonIcon, IonText } from '@ionic/react'
import { arrowBackOutline, refreshOutline, saveOutline } from 'ionicons/icons'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

interface IBackSaveReset {
    handleSave: () => void;
    handleReset: () => void;
}

function GBackSaveReset({ handleReset, handleSave }: IBackSaveReset) {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(isAuthenticated ? '/dashboard' : '/home');
    }

    return (
        <div className='g_flex g-space-between g-back-save-reset g-height-60px'>
            <div className='g_flex g-align-center'>
                <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                <IonText onClick={handleBack}><p>Back</p></IonText>
            </div>
            <div className='g_flex g-align-center'>
                <IonIcon onClick={handleReset} icon={refreshOutline}></IonIcon>
                <IonIcon onClick={handleSave} className='m-left-20' icon={saveOutline}></IonIcon>
            </div>
        </div>
    )
}

export default GBackSaveReset