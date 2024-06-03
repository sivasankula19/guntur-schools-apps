
import { IonButton, IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router';

const PreLoginFoot: React.FC = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/home');
    }
  return (
    <div className="pre_footer">
     <IonButton onClick={handleNavigate}>Back To Login</IonButton>
    </div>
  );
};


export default PreLoginFoot;
