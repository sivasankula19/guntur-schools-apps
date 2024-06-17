import { IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router';

const GBreadCrumb: React.FC<IBreadCrumbProps> = ({ bName,path, isLast }) => {
  const navigate = useNavigate();
  const handleNavigate = (route:string) => {
    if(!isLast)
    navigate(route);
  }
  return (
    <div className={`g_bread ${isLast ? 'g_bread_last' : ''}`} onClick={()=> {handleNavigate(path)}}>
      <IonText>
        <p>{bName}</p>
      </IonText>
    </div>
  );
};

interface IBreadCrumbProps {
  bName: string;
  path: string;
  isLast:boolean;
  // children:React.ReactNode
}

export default GBreadCrumb;
