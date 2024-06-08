import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonToggle } from '@ionic/react';

const Messages: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  const navigate = useNavigate();

  const breadCrumbsValue = [{ bName: 'Home', path: '/' }, { bName: 'Messages', path: '/messages' }];

  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const handleUserChat = (userId:string) => {
    navigate(`/messages/${userId}`)
  }

  return (
    <div className='messages'>
      <div className='g_flex g_space_btwn'>
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div className='toggle_io'>
          <IonToggle
            className="custom-toggle"
            checked={isFilterEnabled}
            onIonChange={handleToggleChange}
          >
            <span
              className={`toggle-text ${
                isFilterEnabled ? 'enabled_filter' : 'disabled_filter'
              }`}
            >
              {isFilterEnabled ? 'On' : 'Off'}
            </span>
          </IonToggle>
        </div>
      </div>
      <div>select user for chat</div>
      <button onClick={()=>handleUserChat('Y24C8A019')}>navigate t</button>
    </div>
  );
};

export default Messages;
