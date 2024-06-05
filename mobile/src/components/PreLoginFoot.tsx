
import { IonButton, IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const PreLoginFoot: React.FC = () => {
  const isAuthenticated = useSelector((state:any)=>state.auth.isAuthenticated)
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/home');
    }
  if(!isAuthenticated)
  return (
    <div className="pre_footer">
     <IonButton onClick={handleNavigate}>Back To Login</IonButton>
    </div>
  );
  else 
  return <></>
};


export default PreLoginFoot;
