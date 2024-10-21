import React, { useRef, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonIcon,
  IonText,
  IonButton,
  IonPopover,
  IonContent,
  IonLabel,
} from '@ionic/react';
import { useSelector } from 'react-redux';
import { bookOutline, calendarOutline, chatboxOutline, documentsOutline, documentTextOutline, newspaperOutline, notificationsCircleOutline, notificationsOutline, peopleOutline, searchOutline, timeOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';
import { isPlatform } from '@ionic/react';
import { notificationSampleData } from '../common/utility';

const Header: React.FC = React.memo(() => {
  const selectedSchool = useSelector((state: any) => state.school.selectedSchool);
  const isMobile = isPlatform('desktop');
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const authInfo = useSelector((state: any) => state.auth);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [newNotifications, setNewNotifications] = useState(notificationSampleData);

  const handleSearchBack = () => {
    navigate('/select-school');
  };

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  const iconsListModule: any = {
    Attendance: timeOutline,
    StudentsList: peopleOutline,
    staff: peopleOutline,
    Documents: documentsOutline,
    Messages: chatboxOutline,
    ProgressCard: documentTextOutline,
    ExamSchedule: calendarOutline,
    HomeWork: bookOutline,
    Vibe: newspaperOutline,
    Default: notificationsCircleOutline
  }

  const handleNavigate = () => {
    setPopoverOpen(false);
    navigate('/my-notifications');
  }

  return (
    <IonHeader className={`${isAuthenticated ? 'customized-head-auth' : ''}`}>
      <IonToolbar className={`${isAuthenticated ? 'customized-toolbar-auth' : ''}`}>
        {isAuthenticated ? (
          <>
            <IonButtons slot="start">
              <IonMenuButton className="customized-menu-btns-top" />
            </IonButtons>
            <div className="menu-profile-container">
              <img
                src="https://avatars.githubusercontent.com/u/93701195?s=60&v=4"
                alt="Profile"
              />
            </div>
            {/* <IonTitle className={`${isPlatform('desktop') ? 'web_scl' : ''} header-school-name`}>
              {authInfo?.user?.fullName || 'Name'}
            </IonTitle> */}
            <div className='g_flex header_caret'>
              <IonTitle className={`${isPlatform('desktop') ? 'web_scl' : ''} header-school-name`}>
                {authInfo?.user?.fullName || 'Name'}
              </IonTitle>

              <IonButton onClick={openPopover} fill="clear" id="click-trigger"><IonIcon slot="icon-only" icon={notificationsOutline}></IonIcon></IonButton>
              <IonLabel onClick={openPopover}>{newNotifications.length ? `+${newNotifications.length}` : null}</IonLabel>
              <IonPopover ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)} className='notification-popover' trigger="click-trigger" triggerAction="click">
                <IonContent class="ion-padding">
                  <div className='popover_actions'>
                    {newNotifications.length ? <>
                      {newNotifications.map((notify: any, indexN: number) => (<IonItem key={notify.id} className='first_action_item'>
                        <IonIcon icon={iconsListModule[notify.moduleName || 'Default']}></IonIcon>
                        <IonLabel>
                          <div className='menu-notify-text'>
                            <IonText>
                              <p>
                                {notify.message}
                              </p>
                            </IonText>
                          </div>
                          {(notify?.data?.message || notify?.data?.comment) && (
                            <div className='menu-notify-msg-text'>
                              <IonText>
                                <p>" {notify?.data?.comment || notify?.data?.message} "</p>
                              </IonText>
                            </div>
                          )}
                        </IonLabel>
                      </IonItem>))}</> : <>
                      <IonText>
                        <p className='g_txt_center'>No Notifications yet!</p>
                      </IonText>
                    </>}
                  </div>
                  <div className='g_full_width p-t-10'>
                    <IonButton onClick={handleNavigate} expand="block">View All</IonButton>
                  </div>
                </IonContent>
              </IonPopover>

            </div>
          </>
        ) : (
          <>
            <IonItem onClick={handleSearchBack} className="custom_header_item">
              <div className="g_flex g-align-center">
                <IonIcon icon={searchOutline} />
                <IonText>
                  <p>{selectedSchool?.schoolName}</p>
                </IonText>
              </div>
            </IonItem>
          </>
        )}
      </IonToolbar>
    </IonHeader>
  );
});

export default Header;
