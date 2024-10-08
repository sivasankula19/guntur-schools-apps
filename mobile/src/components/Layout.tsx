import { IonContent, IonPage, IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import PreLoginContent from './PreLoginContent';
import { closeCircleOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setFailureToast, setInfoToast, setSuccessToast, setWarnToast } from '../redux/reducers/toastMessageSlice';

function Layout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const successToastMsgTex = useSelector((state: any) => state.toastMessage?.successToastMsg || '');
  const warnToastMsgText = useSelector((state: any) => state.toastMessage?.warnToastMsg || '');
  const failureToastMsgText = useSelector((state: any) => state.toastMessage?.failedToastMsg || '');
  const infoToastMsgText = useSelector((state: any) => state.toastMessage?.infoToastMsg);
  const currentRole = useSelector((state:any)=> state.auth.role);
  const dispatch = useDispatch();
  const preLoginModules = [
    '/about',
    '/courses',
    '/contact-us',
    '/achievements',
    '/gallery',
    '/ex-circular',
  ];

  useEffect(() => {
    setIsOpen(successToastMsgTex.length >= 1);
    if (successToastMsgTex.length) {
      setTimeout(() => {
        dispatch(setSuccessToast(''));
      }, 3000);
    }
  }, [successToastMsgTex]);

  useEffect(() => {
    setIsOpen(warnToastMsgText.length >= 1);
    if (warnToastMsgText.length) {
      setTimeout(() => {
        dispatch(setWarnToast(''));
      }, 6000);
    }
  }, [warnToastMsgText]);

  useEffect(() => {
    setIsOpen(failureToastMsgText.length >= 1);
    if (failureToastMsgText.length) {
      setTimeout(() => {
        dispatch(setFailureToast(''));
      }, 3000);
    }
  }, [failureToastMsgText]);

  useEffect(() => {
    setIsOpen(infoToastMsgText.length >= 1);
    if (infoToastMsgText.length) {
      setTimeout(() => {
        dispatch(setInfoToast(''));
      }, 3000);
    }
  }, [infoToastMsgText]);

  const footersListModules = ['/dashboard', '/home', '/select-school', '/settings']

  return (
    <IonPage className="my_page">
      <Header />
      <IonContent class={`custom_content_view ${currentRole === 'Student' ? 'student' : ''}`} fullscreen>
        {preLoginModules.includes(location.pathname) ? (
          <>
            <PreLoginContent>
              <Outlet />
            </PreLoginContent>
          </>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </IonContent>
      {footersListModules.includes(location.pathname) && <Footer></Footer>}
      {isOpen && ( <IonToast
        isOpen={isOpen}
        message={successToastMsgTex || warnToastMsgText || infoToastMsgText || failureToastMsgText}
        duration={warnToastMsgText ? 6000 : 3000}
        onDidDismiss={() => setIsOpen(false)}
        className={`${warnToastMsgText ? 'warn-toast' : infoToastMsgText ? 'info-toast' : failureToastMsgText ? 'failure-toast' : 'custom-toast'}`}
        buttons={[{
          icon: closeCircleOutline,
          role: 'info',
          handler: () => {
            setIsOpen(false);
          }
        }]}
      ></IonToast>)}
     
    </IonPage>
  );
}

export default Layout;
