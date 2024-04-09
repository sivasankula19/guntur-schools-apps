import {
  IonContent,
  IonPage,
} from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
