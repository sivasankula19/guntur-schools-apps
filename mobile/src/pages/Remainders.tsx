import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonModal,
  IonSearchbar,
  IonText,
  createAnimation,
} from '@ionic/react';
import { addCircleOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import GCustomisedModal from '../components/GCustomisedModal';

const Remainders: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [data, setData] = useState([
    {
      eventName: 'Quize English by S-UserName',
      desc: 'Online quize compitation by S-UserName for the Pronounce and verbs',
      date: '15/04/2024',
      time: '10:10 AM',
      status:'To Do',
      notifyBefore: '15min',
      isOpen:false,
      id: 1,
    },
    {
      eventName: 'Quize English by S-UserName',
      desc: 'Online quize compitation by S-UserName for the Pronounce and verbs',
      date: '15/04/2024',
      time: '10:10 AM',
      status:'To Do',
      notifyBefore: '15min',
      isOpen:false,
      id: 2,
    },
    {
      eventName: 'Quize English by S-UserName',
      desc: 'Online quize compitation by S-UserName for the Pronounce and verbs',
      date: '15/04/2024',
      time: '10:10 AM',
      status:'Delayed',
      notifyBefore: '15min',
      isOpen:false,
      id: 3,
    },
    {
      eventName: 'Quize English by S-UserName',
      desc: 'Online quize compitation by S-UserName for the Pronounce and verbs',
      date: '15/04/2024',
      status:'Done',
      time: '10:10 AM',
      notifyBefore: '15min',
      isOpen:false,
      id: 4,
    },
  ]);

  return (
    <div>
      <div className="g_flex g_space_btwn g_aligncntr bread_toggle_container">
        <IonBreadcrumbs>
          <IonBreadcrumb>
            <div>Home</div> <div slot="separator"></div>
          </IonBreadcrumb>
          <div className="separator_bread">/</div>
          <IonBreadcrumb>Remainders</IonBreadcrumb>
        </IonBreadcrumbs>
        <div>
          <IonButton className="add_remainder_btn">
            <IonIcon icon={addCircleOutline}></IonIcon> ADD
          </IonButton>
        </div>
      </div>
      <div>
        <IonCard className="card_remainder">
          <IonCardContent class="ion_card_content_remainders">
            <IonSearchbar placeholder="Remainders"></IonSearchbar>
            {data.length ? (
              <>
              <div className='remainders_container_scroll'>
                {data.map((item) => (
                  <IonCard key={item.id}>
                    <IonCardContent className='ion_remainder_content'>
                      <div className="g_flex item_title_time">
                        <div className="remainder_item_title_block">
                          <IonText className="remainder_item_title">
                            {item.eventName}
                          </IonText>
                        </div>
                        <div className="remainder_item_time_block">
                          <IonText className="remainder_item_time">
                            {item.date} - {item.time}
                          </IonText>
                        </div>
                      </div>
                      <div className="g_flex item_title_time">
                        <div className="remainder_item_title_block">
                          <IonText className={`remainder_item_desc ${!item.isOpen && 'two_lines_ellipsis'}`}>
                            {item.desc}
                          </IonText>
                        </div>
                        <div className="remainder_item_time_block g_flex">
                         <div className={`remainder_status g_flex g_aligncntr g_jstfy_content_cntr ${item.status == 'Delayed' ? 'danger' : item.status == 'Done' ? 'orange_cls' : 'present_recorded' }`}>{item.status}</div>
                         <IonIcon className='edit_remainder' size='large' icon={pencilOutline}></IonIcon>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
                </div>
              </>
            ) : (
              <>
                <IonItem className="no_records_remainder">
                  <div className="trash_icon_remainder">
                    <IonIcon size="large" icon={trashOutline}></IonIcon>
                  </div>
                </IonItem>
                <IonItem className="no_records_remainder">
                  <div className="g_flex g_flex_direction_clm no_records_remainder_text">
                    <IonText>No Records Found</IonText>
                    <IonText>Please Add Remaindes!</IonText>
                  </div>
                </IonItem>
                <div className="g_flex g_jstfy_content_cntr add_remainder_btn_container">
                  <IonButton className="btn_remainders">
                    Add Remainder
                  </IonButton>
                </div>
              </>
            )}
          </IonCardContent>
        </IonCard>
      </div>
      <GCustomisedModal  title="My Modal"
          onClose={()=>{}}
          onSave={()=>{}} >
        <div>
          <h1>hello</h1>
        </div>
      </GCustomisedModal>
    </div>
  );
};

export default Remainders;
