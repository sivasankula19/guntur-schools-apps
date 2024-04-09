import {
    IonContent,
    IonPage,
  } from '@ionic/react';
  import { useParams } from 'react-router';
  import ExploreContainer from '../components/ExploreContainer';
  import Header from '../components/Header';
  
  const UserByID: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  
    return (
      <IonPage>
        <Header />
        <IonContent fullscreen>
            <div>user page --{id} </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default UserByID;
  