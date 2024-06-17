import React, { useEffect, useRef, useState } from 'react';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonIcon, IonSearchbar, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { formatDate, homeWorkDataBe } from '../common/utility';
import { attachOutline, banOutline } from 'ionicons/icons';
const HomeWork: React.FC = () => {

  const [homeWorkData, setHomeWorkData] = useState<any>([])

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Home Work', path: '/home-work' }]

  useEffect(() => {
    setHomeWorkData(homeWorkDataBe.map((i) => ({ ...i, isFullView: false })))
  }, [])


  const handleFullView = (id:string) => {
    setHomeWorkData((prev:any)=>(prev.map((prvItem:any)=>{
      if(prvItem.id === id)
        return {...prvItem, isFullView: !prvItem.isFullView}
      return ({...prvItem, isFullView: false})
    })))
  }

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue} />
      <div className='home_work'>
        <IonSearchbar placeholder='Search subject or Task name'></IonSearchbar>
        <div className="g_flex g_space_btwn select_conatainer">
          <div style={{ width: '47%' }}>
            <IonSelect
              className="custome_select"
              multiple={true}
              label="Select Class"
              labelPlacement="floating"
              fill="outline"
              interface="popover"
              onIonChange={(e) =>
                console.log(
                  `ionChange fired with value: ${e.detail.value}`
                )
              }
              onIonCancel={() => console.log('ionCancel fired')}
              onIonDismiss={() => console.log('ionDismiss fired')}
            >
              <IonSelectOption value="class-8">Class 8</IonSelectOption>
              <IonSelectOption value="class-9">Class 9</IonSelectOption>
              <IonSelectOption value="class-10">Class 10</IonSelectOption>
              <IonSelectOption value="class-0">Class 0</IonSelectOption>
            </IonSelect>
          </div>
          <div style={{ width: '47%' }}>
            <IonSelect
              multiple={true}
              className="custome_select"
              label="Select Section"
              labelPlacement="floating"
              fill="outline"
              interface="popover"
            >
              <IonSelectOption value="A-Section">
                A Section
              </IonSelectOption>
              <IonSelectOption value="B-Section">
                B Section
              </IonSelectOption>
              <IonSelectOption value="C-Section">
                C section
              </IonSelectOption>
            </IonSelect>
          </div>
        </div>
        <div className='home_work_container'>
          {homeWorkData.map((item: any) => (<IonCard key={item.id}>
            <IonCardContent>
              <div className='g_flex time_title'>
                <div className='home_task_title'>
                  <IonText>
                    <h2 className={`${!item.isFullView && 'two_lines_ellipsis'}`}>{item.taskName}</h2>
                  </IonText>
                </div>
                <div className='home_task_time'>
                  <IonText>
                    <span>{formatDate(new Date(item.taskTime), true)}</span>
                  </IonText>
                </div>
              </div>
              <div className='home_task_desc'>
                <IonText>
                  <p className={`${!item.isFullView && 'three_line_ellipse'}`}>{item.taskDesc}</p>
                </IonText>
              </div>
              {item.isFullView && (
                <div className='home_attachments'>
                  <div className='g_flex g_align_cntr attach_icon_home'>
                    <IonIcon icon={attachOutline}></IonIcon>
                    <IonText>
                      <h4>Attachments</h4>
                    </IonText>
                  </div>
                  {
                    item?.attachments?.length ? <>
                      <div>
                          hello swipe here!
                      </div>
                    </> : <>
                      <div className='no_attachments'>
                        <IonIcon icon={banOutline}></IonIcon>
                        <IonText>
                          <p> No Attachments !</p>
                        </IonText>
                      </div>
                    </>
                  }
                </div>
              )}
              <div className='g_flex g_space_btwn text_show_more'>
                <div>
                  <IonText>
                    <p>Subject Name</p>
                  </IonText>
                </div>
                <div>
                  <IonText>
                    <a onClick={()=>handleFullView(item.id)}>{item.isFullView ? 'View Less' : 'View More'}</a>
                  </IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>))}
        </div>
      </div>
    </div>
  );
};

export default HomeWork;
