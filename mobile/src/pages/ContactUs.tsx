import React from 'react';
import { useParams } from 'react-router';
import PreLoginHead from '../components/PreLoginHead';
import { IonText } from '@ionic/react';

const ContactUs: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>
      <IonText>
        <p>Government High school</p>
      </IonText>
    </div>
  );
};

export default ContactUs;
