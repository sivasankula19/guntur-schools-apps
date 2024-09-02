import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import React, { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import PreLoginContent from './PreLoginContent';

function Layout() {
  const location = useLocation();
  const ionRouter = useIonRouter();

  const preLoginModules = [
    '/about',
    '/courses',
    '/contact-us',
    '/achievements',
    '/gallery',
    '/ex-circular',
  ];

  console.log('Callled layout', location)

  // useEffect(() => {
  //   console.log('handled Called by router')
  //   const handleBackButton = (ev: any) => {
  //     ev.detail.register(10, (processNextHandler: any) => {
  //       console.log('Handler was called!');
  //       processNextHandler();
  //     });
  //     ev.detail.register(-1, () => {
  //       if(location?.pathname?.includes('dashboard')){
  //         confirm('Do you want to exit from the app?');
  //         CapacitorApp.exitApp();
  //       }
  //       else{
  //         if (!ionRouter.canGoBack()) {
  //           CapacitorApp.exitApp();
  //         } else {
  //           ionRouter.goBack();
  //         }
  //       }
  //     });
  //   };

  //   document.addEventListener('ionBackButton', handleBackButton);

  //   return () => {
  //     document.removeEventListener('ionBackButton', handleBackButton);
  //   };
  // }, [ionRouter]);

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
