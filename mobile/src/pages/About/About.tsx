import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PreLoginHead from '../../components/PreLoginHead';
import { IonText } from '@ionic/react';
import { AboutModuleData } from '../../common/utility';

const About: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const data = AboutModuleData;

  return (
    <div className="about_container">
      <IonText>
        <p>Government High school</p>
      </IonText>
      <div className="banner_img"></div>
      {data.map((item: any) => (
        <div key={item.id}>
          <IonText>
            <h5>{item.title}</h5>
          </IonText>
          {item.contentType === 'text' && (
            <IonText>
              <p>{item.content}</p>
            </IonText>
          )}
          {item.contentType === 'map' && (
            <>
              <a>{item.location}</a>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default About;
