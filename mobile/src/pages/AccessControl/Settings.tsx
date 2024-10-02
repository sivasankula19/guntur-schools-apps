import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonIcon, IonLabel } from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import { logout } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { resetAccessState } from '../../redux/reducers/accessControlSlice';

function Settings() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Settings', path: '/settings' },];

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(resetAccessState())
    navigate('/home');
  }

  return (
    <div className='settings'>
      <GBreadCrumbs data={breadCrumbsValue} />
      <div className='settings-container'></div>
      <div className='logout-btn'>
        <div className="g_flex m-v-10 g-justify-center ">
          <div onClick={handleLogOut} className='g_flex g-align-center'><IonLabel>Log out</IonLabel> </div>
          <IonIcon onClick={handleLogOut} icon={logInOutline}></IonIcon>
        </div>
      </div>
    </div>
  )
}

export default Settings