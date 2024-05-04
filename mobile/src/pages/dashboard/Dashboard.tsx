
import { IonCard, IonCardContent, IonItem } from '@ionic/react';
import React from 'react';
import NavChipCard from './NavChipsCard';
import "./Dashboard.css"

const dashboard: React.FC = () => {

  const chipsData = [
    { id: 1, moduleName: 'Module 1' },
    { id: 2, moduleName: 'Modulehnkkwbc 2' },
    { id: 3, moduleName: 'Module 3' },
    { id: 4, moduleName: 'Module 4' },
    { id: 5, moduleName: 'Module 5' },
    { id: 6, moduleName: 'Module 6' },
    { id: 7, moduleName: 'Module 7' },
    { id: 8, moduleName: 'Module 8' },
    { id: 9, moduleName: 'Module 9' },
  ];

  return (
    <div className='dsbrd'>
      <NavChipCard  chips={chipsData}></NavChipCard>
    </div>
  );
};

export default dashboard;


