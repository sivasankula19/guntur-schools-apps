import { IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { setPreLoginPublicView } from '../redux/reducers/schoolSlice';

const PreLoginHead: React.FC = () => {
  const isAuthenticated = useSelector((state:any)=>state.auth.isAuthenticated)
  const { name } = useParams<{ name: string }>();
  console.log('name', name)
  const selectedView = useSelector((state: any) => state.school.preLoginModule)
  console.log(selectedView)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const preLoginBtns = [
    { name: 'About', redirectTo: '/about', id: 'About', path:'about' },
    { name: 'Courses', redirectTo: '/courses', id: 'Courses', path:'courses' },
    { name: 'Contact-Us', redirectTo: '/contact-us', id: 'ContactUs', path:'contact-us' },
    { name: 'Achievement', redirectTo: '/achievements', id: 'Achievement', path:'achievements' },
    { name: 'Gallery', redirectTo: '/gallery', id: 'Gallery',path:'gallery'  },
    { name: 'Ex-Circular', redirectTo: '/ex-circular', id: 'ExCircular', path:'ex-circular' },
  ];


  const btnsScrollRef = useRef<any>(null)

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
    <div className="prelogin_head">
      <div className="back_btns_holder">
        <IonIcon onClick={navigateBack} size="large" icon={arrowBackOutline}></IonIcon>
        <div className="btns_scroll" ref={btnsScrollRef}>
          {
            preLoginBtns.filter((item)=> isAuthenticated ? item.path === name : true).map((btn) => (<IonButton className={`${btn.name} ${selectedView === btn.name ? 'selected' : ''}`} onClick={() => handleToolBtns(btn)} key={btn.redirectTo}>{btn.name}</IonButton>))
          }
        </div>
      </div>
    </div>
  );
};

export default PreLoginHead;
