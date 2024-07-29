import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PreLoginHead from '../components/PreLoginHead';
import PreLoginFoot from '../components/PreLoginFoot';
import { useSelector } from 'react-redux';

const Page: React.FC = () => {
  const { name = '' } = useParams<{ name: string }>();
  const role = useSelector((state:any)=> state.auth.role) || 'Student';
  const preLoginModules = [
    'about',
    'courses',
    'contact-us',
    'achievements',
    'gallery',
    'ex-circular',
  ];

  return (
    <IonPage className="my_page">
      <Header />
      <IonContent class='custom_content_view' fullscreen>
        {preLoginModules.includes(name) ? (
          <div className="prelogin_container">
            <PreLoginHead></PreLoginHead>
            <div className="actual_content">
              <ExploreContainer name={name || ''} />
            </div>
            {
              role === 'Student' && (<PreLoginFoot></PreLoginFoot>)
            }
          </div>
        ) : (
          <ExploreContainer name={name || ''} />
        )}
      </IonContent>
      <Footer></Footer>
      {/* <div className='footer_content'>footer</div> */}
    </IonPage>
  );
};

export default Page;
