import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import PreLoginContent from './PreLoginContent'

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
  useEffect(() => {
    console.log('entered layout', location)
  }, [location])
  return (
    <IonPage className="my_page">
      <Header />
      <IonContent class='custom_content_view' fullscreen>
        {
          preLoginModules.includes(location.pathname) ? <>
            <PreLoginContent>
              <Outlet />
            </PreLoginContent>
          </> : <>
            <Outlet />
          </>
        }
      </IonContent>
      <Footer></Footer>
    </IonPage>
  )
}

export default Layout