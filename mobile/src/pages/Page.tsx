import {
  IonContent,
  IonPage,
} from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage className='my_page'>
      <Header />
      <IonContent fullscreen>
        <ExploreContainer name={name} />
      </IonContent>
      <Footer></Footer>
      {/* <div className='footer_content'>footer</div> */}
    </IonPage>
  );
};

export default Page;
