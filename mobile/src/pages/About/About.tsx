import React, { useEffect, useState } from 'react';
import { IonText } from '@ionic/react';
import { AboutModuleData } from '../../common/utility';

const About: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const data = AboutModuleData;

  return (
    // <PreLoginContent>
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
            {item.contentType === 'list' && (
              <>
                <ul>
                  {item.listContent.map((lItem: any, index: number) => (<li key={index}>
                    {lItem}
                  </li>))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    // </PreLoginContent>
  );
};

export default About;
