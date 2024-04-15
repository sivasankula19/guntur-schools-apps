import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  IonCard,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import './Dashboard.css';
import { chevronDownCircle, chevronUpCircle } from 'ionicons/icons';


const subjects=[['Tel','Hin','Tel','Eng','Soc','Sci'],['Tel','Hin','Tel','Eng','Soc','Sci'],['Tel','Hin','Tel','Eng','Soc','Sci'],['Br','Br','Br','Br','Br','Br'],['Tel','Hin','Tel','Eng','Soc','Sci'],['Tel','Hin','Tel','Eng','Soc','Sci'],['Tel','Hin','Tel','Eng','Soc','Sci']]

const Dashboard: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [chevron, setChevron] = useState(true);
  const [segment, setSegment] = useState('today');

  const dataInRow = (c1: any, c2: any, c3: any) => {
    return (
      <IonRow>
        {c1 && (
          <IonCol className="card" size="3.6">
            {c1}
          </IonCol>
        )}
        {c2 && (
          <IonCol className="card" size="3.6">
            {c2}
          </IonCol>
        )}
        {c3 && (
          <IonCol className="card" size="3.6">
            {c3}
          </IonCol>
        )}
      </IonRow>
    );
  };

  useEffect(() => {}, []);

  const handleChevron = () => {
    setChevron((prev) => !prev);
  };

  return (
    <div>
      <div
        style={{
          boxShadow: '0px 4px 3px rgb(4 4 4 / 39%)',
          borderRadius: '0px 0px 10px 10px',
        }}
      >
        <IonGrid fixed={true}>
          {chevron && (
            <>
              {dataInRow(1, 2, 3)}
              {dataInRow(4, 5, 6)}
              {dataInRow(7, 8, 9)}
              {dataInRow(10, 11, 12)}
              {dataInRow(13, 14, 15)}
              {dataInRow(16, '', '')}
            </>
          )}
        </IonGrid>
        <div
          style={{ display: 'flex', justifyContent: 'center', fontSize: 30 }}
        >
          <IonIcon
            aria-hidden="true"
            slot="start"
            ios={chevron ? chevronUpCircle : chevronDownCircle}
            md={chevron ? chevronUpCircle : chevronDownCircle}
            onClick={handleChevron}
          ></IonIcon>
        </div>
      </div>
      {!chevron && (
        <div className="timetable_body">
          <div>
            <IonSegment value={segment} style={{ border: '1px solid blue' }}>
              <IonSegmentButton
                value="today"
                onClick={() => setSegment('today')}
              >
                <IonLabel>Today</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="week" onClick={() => setSegment('week')}>
                <IonLabel>Week</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {segment === 'today' && (
            <div style={{ marginTop: 10 }}>
              {new Date().getHours() > 8 && new Date().getHours() < 21 && (
                <div
                  className="redline"
                  style={{
                    top:
                      (new Date().getHours() - 7 ) * ( 60 + 8 ) +
                      new Date().getMinutes()  ,
                  }}
                ></div>
              )}
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                (timeTable: any, index: any) => {
                  return (
                    <IonGrid key={index} className="timetable">
                      <IonRow>
                        <IonCol>{timeTable}</IonCol>
                      </IonRow>
                    </IonGrid>
                  );
                }
              )}
            </div>
          )}

          {segment === 'week' && 
          (
            <div>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:'17%',border:'1px solid blue',padding:5,marginTop:5,borderRadius:5}}>
                {['MON','TUE','WED','THU','FRI','SAT'].map((weekday:any,index:number)=>{
                  return (
                    <div key={index} style={{fontWeight:'bold'}}>{weekday}</div>
                  )
                })}
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
              <div style={{width:'16%',border:'1px solid blue',borderRadius:5,padding:1,marginRight:5}}>
                {['10:00','11:00','12:00','01:00','02:00','03:00','04:00'].map((time:any,index:number)=>{
                  return (
                    <div key={index} style={{fontWeight:'bold',paddingTop:'2%',paddingBottom:'2%'}}>{time}</div>
                  )
                })}
              </div>
              <div style={{width:'80%'}}>
                {subjects.map((subject:any,index:number)=>{
                  return (
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingTop:'2%',paddingBottom:'2%'}}>
                    { subject.map((subSub:any,subIndex:number)=>{
                        return(
                          <div key={index+subIndex}>{subSub}</div>
                        )
                    })}
                    </div>
                  )
                })}
              </div>
              </div>
            </div>
          )
          }
        </div>
      )}
    </div>
  );
};

export default Dashboard;
