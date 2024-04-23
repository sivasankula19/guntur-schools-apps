import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonContent, IonItem, IonText } from '@ionic/react';
import { convertToMultipleWords } from '../common/utility';

const ExCircularActivities: React.FC = () => {
  const breadCrumbsValue = [{bName:'Home', path:'/'},{bName:'ExCircularActivities', path:'/ExCircularActivities'}]
  const activityJson:any={"Edu. Competitions":[
    {
      Event_Name:"Event Name",
      level:"School Level",
      description:"Event Description",
      isParticipate:false,
      dates:[]},{
        Event_Name:"Event Name",
        level:"School Level",
        description:"Event Description",
        isParticipate:false,
        dates:[]}
  ],
  "Game Competitions":[{
                    Event_Name:"Event Name",
                    level:"district Level",
                    description:"Event Description",
                    isParticipate:false,
                    dates:[]},{
                      Event_Name:"Event Name",
                      level:"district Level",
                      description:"Event Description",
                      isParticipate:false,
                      dates:[]}]
                  }

  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <IonCardContent className="progress_marks_view">
            {
              Object.keys(activityJson).map((key: string) =>(
                <IonCard>
                <IonCard key={key}>
                  <label>{convertToMultipleWords(key)}</label>
                  </IonCard>
                  {
                    activityJson[key].map((item:any,index:any)=>(
                      <IonCard key={index}>
                         <div className="g_flex g_space_btwn g_align_cntr">
                            <div className="g_flex first_container g_align_cntr"><h2 className="title_name">{item.Event_Name}</h2></div>
                            <div ><p>{item.level}</p></div>
                         </div>
                         <div className="g_flex g_space_btwn g_align_cntr">
                         <div className="g_flex first_container g_align_cntr"><p>{item.description}</p></div>
                            <div><IonButton >{!item.isParticipate?"participate":""}</IonButton></div>
                         </div>
                      </IonCard>
                    ))
                  }
                </IonCard>
              ))
            }
          
        </IonCardContent>

    </div>
  );
};

export default ExCircularActivities;
