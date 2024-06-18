// ProgressBar.tsx

import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';

const ProgressBar:  React.FC<IProgressBarProps> = ({
    filled=0,
    color='#1D7AF5'
  }) => {
  return (
    <div className='progress_bar'>
        <div className={`bar ${filled==100 ? 'full_progress_inner' : ''}`} style={{backgroundColor:color, width:`${filled}%`}}></div>
    </div>
  );
};

interface IProgressBarProps {
   filled:number
   color?:string
  }
  

export default ProgressBar;
