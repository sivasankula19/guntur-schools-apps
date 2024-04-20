import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import { classSubjects } from '../common/utility';
import { starOutline } from 'ionicons/icons';
import ProgressBar from '../components/ProgressBar';

const Subjects: React.FC = () => {
  const [data, setData] = useState(classSubjects);

  return (
    <div>
      <IonBreadcrumbs>
        <IonBreadcrumb>
          <div>Home</div> <div slot="separator"></div>
        </IonBreadcrumb>
        <div className="separator_bread">/</div>
        <IonBreadcrumb>Subjects</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonItem className="custome_subject_item">
        <IonSelect
          className="custome_select subjects_cls_select"
          multiple={true}
          label="Select Class"
          labelPlacement="floating"
          fill="outline"
          interface="popover"
          onIonChange={(e) =>
            console.log(`ionChange fired with value: ${e.detail.value}`)
          }
          onIonCancel={() => console.log('ionCancel fired')}
          onIonDismiss={() => console.log('ionDismiss fired')}
        >
          <IonSelectOption value="class-8">Class 8</IonSelectOption>
          <IonSelectOption value="class-9">Class 9</IonSelectOption>
          <IonSelectOption value="class-10">Class 10</IonSelectOption>
          <IonSelectOption value="class-0">Class 0</IonSelectOption>
        </IonSelect>
        <IonSelect
          className="custome_select"
          multiple={true}
          label="Select Class"
          labelPlacement="floating"
          fill="outline"
          interface="popover"
          onIonChange={(e) =>
            console.log(`ionChange fired with value: ${e.detail.value}`)
          }
          onIonCancel={() => console.log('ionCancel fired')}
          onIonDismiss={() => console.log('ionDismiss fired')}
        >
          <IonSelectOption value="class-8">Class 8</IonSelectOption>
          <IonSelectOption value="class-9">Class 9</IonSelectOption>
          <IonSelectOption value="class-10">Class 10</IonSelectOption>
          <IonSelectOption value="class-0">Class 0</IonSelectOption>
        </IonSelect>
      </IonItem>
      <div className="subjects_cls_container">
        <IonList>
          {data.map((item) => (
            <IonCard key={item.subjectCode}>
              <IonCardContent className='subject_item_card_content'>
                <IonItem>
                  <IonText>
                    <h3>{item.subjectName}</h3>
                  </IonText>
                  <ProgressBar filled={40}></ProgressBar>
                  <IonIcon icon={starOutline}></IonIcon>
                </IonItem>
                <IonItem>
                  <div className='g_flex g_space_btwn g_full_width'>
                  <IonText>
                    <h3>{item.subjectName}</h3>
                  </IonText>
                  <IonText>
                  <a>Time Table</a>
                  </IonText>
                 
                  <a>Marks</a>
                  </div>
                  
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </div>
    </div>
  );
};

export default Subjects;
