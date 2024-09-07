import { IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline, closeCircleOutline, saveOutline } from 'ionicons/icons';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { setPreLoginPublicView } from '../redux/reducers/schoolSlice';

const PreLoginHead: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const location = useLocation();
  const selectedView = useSelector((state: any) => state.school.preLoginModule);
  const role = useSelector((state: any) => state.auth.role) || 'student';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const preLoginBtns = [
    { name: 'About', redirectTo: '/about', id: 'About', path: 'about' },
    { name: 'Courses', redirectTo: '/courses', id: 'Courses', path: 'courses' },
    { name: 'Contact-Us', redirectTo: '/contact-us', id: 'ContactUs', path: 'contact-us' },
    { name: 'Achievements', redirectTo: '/achievements', id: 'Achievement', path: 'achievements' },
    { name: 'Gallery', redirectTo: '/gallery', id: 'Gallery', path: 'gallery' },
    { name: 'Ex-Circular', redirectTo: '/ex-circular', id: 'ExCircular', path: 'ex-circular' },
  ];
  const btnsScrollRef = useRef<any>(null);

  const handleToolBtns = (btnInfo: any) => {
    dispatch(setPreLoginPublicView(btnInfo.name));
    navigate(btnInfo.redirectTo);
  }

  const navigateBack = () => {
    navigate(isAuthenticated ? '/dashboard' : '/home')
  }

  useEffect(() => {
    setTimeout(() => {
      if (selectedView && btnsScrollRef.current) {
        const container = btnsScrollRef.current;
        const selectedButton = container.querySelector(`.${selectedView}`);

        if (selectedButton) {
          const containerRect = container.getBoundingClientRect();
          const buttonRect = selectedButton.getBoundingClientRect();
          const scrollLeft = buttonRect.left - containerRect.left + container.scrollLeft;
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }, 1);
  }, [selectedView])

  return (
    <div className="pre-login-head">
      <div className="back-btn-holder">
        <IonIcon onClick={navigateBack} size="large" icon={arrowBackOutline}></IonIcon>
        <div className="btn-scroll" ref={btnsScrollRef}>
          {
            preLoginBtns.filter((item) => isAuthenticated ? location.pathname.includes(item.path) : true).map((btn) => (<IonButton className={`${btn.name} ${selectedView === btn.name ? 'selected' : ''}`} onClick={() => handleToolBtns(btn)} key={btn.redirectTo}>{btn.name}</IonButton>))
          }
        </div>
        {
          isAuthenticated && role === 'SuperAdmin' && (<div className='g_flex'>
            <IonIcon className='pre_login_actions' icon={closeCircleOutline}></IonIcon>
            <IonIcon className='pre_login_actions' icon={saveOutline}></IonIcon>
          </div>)
        }
      </div>
    </div>
  );
};

export default PreLoginHead;
