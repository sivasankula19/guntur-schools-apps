import React from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { caretDownOutline, readerOutline, warning } from 'ionicons/icons';
import { examSchedulesData, formatDate } from '../../common/utility';

const ExamSchedule: React.FC = () => {
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Exam Schedules', path: '/exam-schedules' }];
  const examScheduleJson = examSchedulesData

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className='exam_schedule'>
        <IonAccordionGroup>
          {examScheduleJson.map((item: any) => (
            <IonAccordion
              key={item.id}
              value={item.id}
              toggleIcon={caretDownOutline}
              toggleIconSlot="end"
            >
              <IonItem slot="header" color="light">
                <IonIcon icon={readerOutline}></IonIcon>{' '}
                <IonLabel>{item.examName}</IonLabel>
              </IonItem>
              <div className="exam-time-table" slot="content">
                <div>
                  <IonLabel>{item.isDateConfirmed ? 'Confirmed Date' : 'Tentative Date'} </IonLabel>
                  <div className='g_flex g-justify-center'>
                    <IonItem className='date_item'>
                      <IonText className='g_full_width'>
                        <p>19/06/2024</p>  
                      </IonText>
                    </IonItem>
                  </div>
                  <div className='unit_test_table'>
                    <div className='row row_head g_flex'>
                      {["Subject", "Date", "Slot"].map((row_item, indx) => (<div className={`cell ${indx == 1 ? 'bordered_cell' : ''}`} style={{ width: `${100 / 3}%` }} key={`row ${indx}`}>
                        {row_item}
                      </div>))}
                    </div>
                    {
                      item.subjects.map((subjectItem:any, indexVal:number) => (
                        <div className='row row_body g_flex' key={`sub-row-${indexVal}`}>
                          {[{name:'subjectName', id:'Subject'},{name:'date', id:'Date'},{name:'slot', id:'Slot'},].map((row_item, indx) => (<div className={`cell ${indx == 1 ? 'bordered_cell' : ''}`} style={{ width: `${100 / 3}%` }} key={`row ${indx}-${indexVal}`}>
                            {row_item.id === "Date" ? <>
                            {formatDate(subjectItem[row_item.name])}
                            </> : <>{subjectItem[row_item.name]}</> }
                          </div>))}
                        </div>
                      ))
                    }
                  </div>
                  <div className='g_flex g-space-between user_ack_text'>
                    <div>
                    <IonIcon icon={warning}></IonIcon>
                    </div>
                  <div className='ack_desc'>
                  <IonText>
                      <p>
                        {item.tentativeMsg}
                      </p>
                    </IonText>
                  </div>
                   
                  </div>
                </div>
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </div>
    </div>
  );
};

export default ExamSchedule;
