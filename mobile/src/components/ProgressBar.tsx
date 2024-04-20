// ProgressBar.tsx

import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';

const ProgressBar:  React.FC<IProgressBarProps> = ({
    filled
  }) => {
  return (
    <div className='progress_bar'>
        <div>h</div>
    </div>
  );
};

interface IProgressBarProps {
   filled:number
  }
  

export default ProgressBar;
