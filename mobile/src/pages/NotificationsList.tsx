import React from 'react'
import GBreadCrumbs from '../components/GBreadCrumbs'
import { notificationSampleData } from '../common/utility';
import { bookOutline, calendarOutline, chatboxOutline, documentsOutline, documentTextOutline, newspaperOutline, notificationsCircleOutline, notificationsOutline, peopleOutline, searchOutline, timeOutline } from 'ionicons/icons';
import { IonCard, IonCardContent, IonIcon, IonText } from '@ionic/react';
import { useNavigate } from 'react-router';


function NotificationsList() {
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Notifications', path: '/my-notifications' }];
  const notificationsData = notificationSampleData;

  const navigate = useNavigate();

  const iconsListModule: any = {
    Attendance: timeOutline,
    StudentsList: peopleOutline,
    Staff: peopleOutline,
    Documents: documentsOutline,
    Messages: chatboxOutline,
    ProgressCard: documentTextOutline,
    ExamSchedule: calendarOutline,
    HomeWork: bookOutline,
    Vibe: newspaperOutline,
    Default: notificationsCircleOutline
  }

  const handleViewNotify = (notify: any) => {
    switch (notify.moduleName) {
      case 'Attendance':
        // add corresponding state for initial setup
        navigate('/attendance', { state: {} });
        break;
      case 'StudentsList':
        // add corresponding state for initial setup
        navigate('/students-list', { state: {} });
        break;
      case 'Staff':
        // add corresponding state for initial setup
        navigate('/staff-list', { state: {} });
        break;
      case 'Documents':
        // add corresponding state for initial setup
        navigate('/documents', { state: {} });
        break;
      case 'Messages':
        // add corresponding state for initial setup
        navigate(`/messages${notify.type === 'New Text Message' ? '/' + notify.data.userId : ''}`, { state: {} });
        break;
      case 'ProgressCard':
        // add corresponding state for initial setup
        navigate('/progress-card', { state: {} });
        break;
      case 'ExamSchedule':
        // add corresponding state for initial setup
        navigate('/exam-schedules', { state: {} });
        break;
      case 'HomeWork':
        // add corresponding state for initial setup
        navigate('/home-work', { state: {} });
        break;
      case 'Vibe':
        // add corresponding state for initial setup
        navigate('/vibe', { state: {} });
        break;
      default:
        return
    }
  }

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className='notifications-page p-h-16'>
        {notificationsData.map((item) => (
          <IonCard key={item.id} className={`student_card animation-none custom-class-card`}>
            <IonCardContent className="card_content">
              <div className="g_flex g-space-between g-align-center">
                <div className="g_flex notify-msgs-text g-align-center">
                  <div className="profile_item g_flex g-align-center g-justify-center font-600 font-24">
                    <IonIcon icon={iconsListModule[item.moduleName || 'Default']}></IonIcon>
                  </div>
                  <div className="title_designation">
                    <h2 className="title_name">{item.moduleName}</h2>
                    <p className='two_lines_ellipsis'>
                      {item.message}
                    </p>
                  </div>
                </div>
                <div className='g_flex g-align-center g-justify-center'>
                  <a onClick={() => handleViewNotify(item)}>View</a>
                </div>
              </div>
              {(item?.data?.message || item?.data?.comment) && (
                <div className='menu-notify-msg-text'>
                  <IonText>
                    <p>" {item?.data?.comment || item?.data?.message} "</p>
                  </IonText>
                </div>
              )}
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </div>
  )
}

export default NotificationsList