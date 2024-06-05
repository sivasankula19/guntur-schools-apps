import { IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router';

const GBreadCrumb: React.FC<IBreadCrumbProps> = ({ bName,path }) => {
  const navigate = useNavigate();
  const handleNavigate = (route:string) => {
    console.log('rtt', route)
    navigate(route);
  }
  return (
    <div className="g_bread" onClick={()=> {handleNavigate(path)}}>
      <IonText>
        <p>{bName}</p>
      </IonText>
    </div>
  );
};

interface IBreadCrumbProps {
  bName: string;
  path: string;
  // children:React.ReactNode
}

export default GBreadCrumb;
