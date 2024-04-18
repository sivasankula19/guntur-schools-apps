import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonText,
} from '@ionic/react';
import {
  appsSharp,
  listSharp,
  caretBackOutline,
  chevronBackOutline,
  caretForwardOutline,
  chevronForwardOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  removeCircleOutline,
  removeOutline,
  printSharp,
  analyticsOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import {
  studentAttendanceCalendar,
  transformListToGrid,
} from '../common/utility';

const Attendance: React.FC = () => {
  const [viewMode, setViewMode] = useState('list');

  const todayDate = new Date(2024, 2, 15);
  const todayFormate = `${
    todayDate.getMonth() + 1
  }/${todayDate.getDate()}/${todayDate.getFullYear()}`;

  const attendanceDate = studentAttendanceCalendar;
  const gridAttendace = transformListToGrid(studentAttendanceCalendar);

  return (
    <div>
      <div className="g_flex g_space_btwn g_aligncntr bread_toggle_container">
        <IonBreadcrumbs>
          <IonBreadcrumb>
            <div>Home</div> <div slot="separator"></div>
          </IonBreadcrumb>
          <div className="separator_bread">/</div>
          <IonBreadcrumb>My Attendance</IonBreadcrumb>
        </IonBreadcrumbs>
        <div>
          <IonIcon
            onClick={() => {
              setViewMode('list');
            }}
            className={`list_viwe_icon ${viewMode === 'list' && 'selected'}`}
            size="large"
            icon={listSharp}
          ></IonIcon>
          <IonIcon
            onClick={() => {
              setViewMode('grid');
            }}
            className={`grdi_view_icon ${viewMode === 'grid' && 'selected'}`}
            size="large"
            icon={appsSharp}
          ></IonIcon>
        </div>
      </div>
      <IonCard className="custome_attendance_card">
        <IonCardContent className="custome__card_attendance_container">
          <div className="g_flex g_space_around">
            <IonIcon size="large" icon={caretBackOutline}></IonIcon>
            <IonIcon size="large" icon={chevronBackOutline}></IonIcon>
            <div className="month_year_view g_flex g_space_evnly g_aligncntr">
              <IonText className="month_year">{'MAR'}</IonText>
              <IonText className="month_year">{'2024'}</IonText>
            </div>
            <IonIcon size="large" icon={chevronForwardOutline}></IonIcon>
            <IonIcon size="large" icon={caretForwardOutline}></IonIcon>
          </div>
        </IonCardContent>
      </IonCard>
      {viewMode === 'list' ? (
        <>
          <IonCard className="custome_attendance_card">
            <IonCardContent className="g_flex g_space_around g_aligncntr custome__card_attendance_container">
              {['Date', 'Day', 'AM', 'PM'].map((iView) => (
                <IonText key={iView} className="calendar_label_view row_item_quater">
                  {iView}
                </IonText>
              ))}
            </IonCardContent>
          </IonCard>
          <div className="attendance_container_items">
            {attendanceDate.map((item) => (
              <IonItem className={`attendance_ion_item ${item.isSchoolHoliday && 'danger'} ${item.date === todayFormate && 'special_today_item'}`} key={item.id}>
                <IonText className="row_item_quater">{item.currentDay}</IonText>
                <IonText className="row_item_quater">{item.dayShort}</IonText>
                <div className="row_item_quater">
                  {item.isSchoolHoliday ? (
                    <>
                      <IonText>NA</IonText>
                    </>
                  ) : (
                    <IonIcon
                      className={`${
                        item.attendanceMarked >= 1
                          ? item.am
                            ? 'present_recorded'
                            : 'absent_recorded'
                          : 'attendance_not_recorded'
                      }`}
                      size="large"
                      icon={
                        item.attendanceMarked >= 1
                          ? item.am
                            ? checkmarkCircleOutline
                            : closeCircleOutline
                          : removeOutline
                      }
                    ></IonIcon>
                  )}
                </div>
                <div className="row_item_quater">
                  {item.isSchoolHoliday ? (
                    <>
                      <IonText>NA</IonText>
                    </>
                  ) : (
                    <IonIcon
                      className={`${
                        item.attendanceMarked == 2
                          ? item.pm
                            ? 'present_recorded'
                            : 'absent_recorded'
                          : 'attendance_not_recorded'
                      }`}
                      size="large"
                      icon={
                        item.attendanceMarked == 2
                          ? item.pm
                            ? checkmarkCircleOutline
                            : closeCircleOutline
                          : removeOutline
                      }
                    ></IonIcon>
                  )}
                </div>
              </IonItem>
            ))}
          </div>
        </>
      ) : (
        <>
          <IonCard className="custome_attendance_card">
            <IonCardContent className="g_flex g_aligncntr custome_card_content_day_view">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                (dayName) => (
                  <IonItem
                    key={dayName}
                    className="day_list_map ion-text-center"
                  >
                    <IonText className="ion_text_day_view">{dayName}</IonText>
                  </IonItem>
                )
              )}
            </IonCardContent>
          </IonCard>
          <div className="attendance_container_items">
            {gridAttendace.map((gridItem) => (
              <IonCard
                key={Math.random().toString()}
                className="custome_attendance_card2"
              >
                <IonCardContent className="g_flex g_aligncntr custome_card_content_day_view2">
                  {gridItem.map((dayItem) => (
                    <IonItem
                      key={dayItem?.id || Math.random().toString()}
                      className={`day_list_map update_ion_item ion-text-center ${
                        dayItem == null
                          ? 'empty_item_day'
                          : dayItem?.isSchoolHoliday
                          ? 'holiday_day_calendar'
                          : dayItem?.attendanceMarked == 0
                          ? 'non_taked_atendance'
                          : 'defaut_attendance_taken'
                      }`}
                    >
                      <div className="chip_item_grid">
                        <IonText className="ion_text_day_view">
                          {dayItem?.currentDay}
                        </IonText>
                        {dayItem !== null && !dayItem?.isSchoolHoliday ? (
                          <>
                            <IonIcon
                              className={`${
                                dayItem?.attendanceMarked >= 1
                                  ? dayItem?.am
                                    ? 'present_recorded'
                                    : 'absent_recorded'
                                  : 'attendance_not_recorded'
                              }`}
                              size="large"
                              icon={
                                dayItem?.attendanceMarked >= 1
                                  ? dayItem?.am
                                    ? checkmarkCircleOutline
                                    : closeCircleOutline
                                  : removeOutline
                              }
                            ></IonIcon>
                            <IonIcon
                              className={`${
                                dayItem?.attendanceMarked == 2
                                  ? dayItem?.pm
                                    ? 'present_recorded'
                                    : 'absent_recorded'
                                  : 'attendance_not_recorded'
                              }`}
                              size="large"
                              icon={
                                dayItem?.attendanceMarked == 2
                                  ? dayItem?.pm
                                    ? checkmarkCircleOutline
                                    : closeCircleOutline
                                  : removeOutline
                              }
                            ></IonIcon>
                          </>
                        ) : (
                          <>
                            <div></div>
                          </>
                        )}
                        {dayItem?.isSchoolHoliday && (
                          <>
                            <IonText className="g_small_text">Holiday</IonText>
                          </>
                        )}
                      </div>
                    </IonItem>
                  ))}
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </>
      )}
      <IonCard className="summery_attendance_show">
        <IonCardContent className="custome__card_attendance_container g_flex">
          <IonItem className="summery_text_show">
            <IonText className="summery_ion_text">WD = 9</IonText>
          </IonItem>
          <IonItem className="summery_text_show">
            <IonText className="summery_ion_text">P = 8</IonText>
          </IonItem>
          <IonItem className="summery_text_show">
            <IonText className="summery_ion_text">A = 1</IonText>
          </IonItem>
          <div className="g_flex g_space_around g_aligncntr summery_icons_container">
            <IonIcon size="large" icon={printSharp}></IonIcon>
            <IonIcon size="large" icon={analyticsOutline}></IonIcon>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Attendance;
