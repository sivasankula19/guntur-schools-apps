import React, { useEffect, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
  IonText,
} from '@ionic/react';
import { classSubjects } from '../../common/utility';
import ProgressBar from '../../components/ProgressBar';

function SubjectsSA() {
  const [data, setData] = useState(classSubjects);
  const breadCrumbsValue = [
    { bName: 'Home', path: '/dashboard' },
    { bName: 'Subjects', path: '/subjects' },
  ];

  useEffect(()=>{},[])

  return (
    <div className="subjects">
      <div className="g_flex g_space_btwn g_align_cntr bread_toggle_container">
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      </div>
      <IonItem className="custom_sub_item"></IonItem>
      <div className="subjects_cls_container">
        <IonList>
          {data.map((item) => (
            <IonCard key={item.subjectCode}>
              <IonCardContent className="subject_item_card_content">
                <IonItem>
                  <div className="g_flex g_space_btwn g_full_width">
                    <IonText className="subject_text_name">
                      <h3>{item.subjectName}</h3>
                    </IonText>
                    <div className="progress_container g_flex g_align_cntr">
                      <ProgressBar filled={item.percentCovered}></ProgressBar>
                    </div>
                    <IonText>Edit</IonText>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="g_flex g_space_btwn g_full_width">
                    <IonText>
                      <a>{item.subjectTeacher}</a>
                    </IonText>
                    <IonText>
                      <a>Time Table</a>
                    </IonText>
                    <IonText>
                      <a>Marks</a>
                    </IonText>
                    <IonText>
                      <p>
                        {item.class} - {item.section}
                      </p>
                    </IonText>
                  </div>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </div>
    </div>
  );
}

export default SubjectsSA;
