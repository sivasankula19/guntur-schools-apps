import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PreLoginHead from '../components/PreLoginHead';

const Page: React.FC = () => {
  const { name = '' } = useParams<{ name: string }>();
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
      <IonContent fullscreen>
        {preLoginModules.includes(name) ? (
          <div className="prelogin_container">
            <PreLoginHead></PreLoginHead>
            <div className="actual_content">
              <ExploreContainer name={name || ''} />
            </div>
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
