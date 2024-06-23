import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { caretDownOutline, folderOutline, readerOutline } from 'ionicons/icons';

const ExamSchedule: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Exam Schedules', path: '/exam-schedules' }];
  const examScheduleJson = [
    {
      id: 1,
      examName: 'Unit 1',
      date: '2024-06-19T19:03:51.500Z',
      isDateConfirmed: false,
      tentativeMsg: 'Those dates are tentative only may be subjected to be changed in further changes by principal/admin in advanced notified by corresponding to students on what user specifies as the post data and it can be edited to that user>',
      isError: false,
      isWar: true,
      subjects: [
        {
          subjectId: 'GH-Sub-10/1',
          subjectName: 'Telugu',
          date: '2024-06-19T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/2',
          subjectName: 'English',
          date: '2024-06-20T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/3',
          subjectName: 'Hind',
          date: '2024-06-21T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/4',
          subjectName: 'Mathematics',
          date: '2024-06-22T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/5',
          subjectName: 'Science',
          date: '2024-06-23T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/6',
          subjectName: 'Social',
          date: '2024-06-24T19:03:51.500Z',
          slot: true,
        },
      ]
    },
    {
      id: 2,
      examName: 'Unit 2',
      date: '2024-09-19T19:03:51.500Z',
      isDateConfirmed: false,
      tentativeMsg: 'Those dates are tentative only may be subjected to be changed in further changes by principal/admin in advanced notified by corresponding to students on what user specifies as the post data and it can be edited to that user>',
      isError: false,
      isWar: true,
      subjects: [
        {
          subjectId: 'GH-Sub-10/1',
          subjectName: 'Telugu',
          date: '2024-06-19T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/2',
          subjectName: 'English',
          date: '2024-06-20T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/3',
          subjectName: 'Hind',
          date: '2024-06-21T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/4',
          subjectName: 'Mathematics',
          date: '2024-06-22T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/5',
          subjectName: 'Science',
          date: '2024-06-23T19:03:51.500Z',
          slot: true,
        },
        {
          subjectId: 'GH-Sub-10/6',
          subjectName: 'Social',
          date: '2024-06-24T19:03:51.500Z',
          slot: true,
        },
      ]
    }
  ]

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
                  <div className='g_flex g_jstfy_content_cntr'>
                    <IonItem className='date_item'>
                      <IonText className='g_full_width'>
                        <p>19/06/2024</p>  
                      </IonText>
                    </IonItem>
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
