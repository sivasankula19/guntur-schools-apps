import { IonCard, IonCardContent, IonText } from '@ionic/react';
import React from 'react';

const ExCircularActivities: React.FC = () => {

  const exCircularData = [
    {
      category: 'Education Competitions',
      id: '1',
      data: [
        {
          id: 'eve1',
          eveName: 'EventName',
          eveLevel: 'School Level',
          fromDate: '10/06/2024',
          toDate: '12/06/2024',
          desc:'event s = goingt gto be a goood and eadvanced trends adn any oen can paryicipae yjrnc presents to be an good',
          isAvailable: true,
        },
        {
          id: 'eve2',
          eveName: 'EventName',
          eveLevel: 'School Level',
          fromDate: '01/04/2024',
          toDate: '01/04/2024',
          desc:'event s = goingt gto be a goood and eadvanced trends adn any oen can paryicipae yjrnc presents to be an good',
          isAvailable: false,
        }
      ]
    }, {
      category: 'Sports Competitions',
      id: '2',
      data: [
        {
          id: 'eveA1',
          eveName: 'EventName',
          eveLevel: 'School Level',
          fromDate: '10/06/2024',
          toDate: '12/06/2024',
          desc:'event s = goingt gto be a goood and eadvanced trends adn any oen can paryicipae yjrnc presents to be an good',
          isAvailable: true,
        },
        {
          id: 'eveA2',
          eveName: 'EventName',
          eveLevel: 'School Level',
          fromDate: '01/04/2024',
          toDate: '01/04/2024',
          desc:'event s = goingt gto be a goood and eadvanced trends adn any oen can paryicipae yjrnc presents to be an good',
          isAvailable: false,
        }
      ]
    }
  ]

  return (
    <div>
      {
        exCircularData.map(categoryItem => (
          <div key={categoryItem.id} className='ex_circular'>
            <IonCard>
              <IonCardContent>
                <IonText className='g_txt_center'>
                  <h1>{categoryItem.category}</h1>
                </IonText>
              </IonCardContent>
            </IonCard>
            <div className='eve_list'>
              {categoryItem.data.map((eveItem) => (<IonCard key={eveItem.id}>
                <IonCardContent>
                  <div className='g_flex g-space-between'>
                    <div>
                      <IonText><h1>{eveItem.eveName}</h1></IonText>
                    </div>
                    <div>
                      <IonText><p>{eveItem.eveLevel}</p></IonText>
                    </div>
                  </div>
                  <div className='g_flex g-space-between'>
                    <div>
                      <IonText>
                        <p className='event_desc'>{eveItem.desc}</p>
                      </IonText>
                    </div>
                    <div>
                      {/* <IonButton>Participate</IonButton> */}
                    </div>
                  </div>
                  <div className='g_flex g-space-between dates_eves'>
                    <div>{eveItem.fromDate}</div>
                    <div>{eveItem.toDate}</div>
                    <div><IonText><a>View More</a></IonText></div>
                  </div>
                </IonCardContent>
              </IonCard>))}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ExCircularActivities;
