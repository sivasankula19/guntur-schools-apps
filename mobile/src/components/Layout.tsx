import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import PreLoginContent from './PreLoginContent';

function Layout() {
  const location = useLocation();
  const preLoginModules = [
    '/about',
    '/courses',
    '/contact-us',
    '/achievements',
    '/gallery',
    '/ex-circular',
  ];

  return (
    <IonPage className="my_page">
      <Header />
      <IonContent class="custom_content_view" fullscreen>
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
      {!location.pathname.includes('/messages/') && <Footer></Footer>}
    </IonPage>
  );
}

export default Layout;
