import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonText,
  isPlatform,
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
  removeOutline,
  printSharp,
  analyticsOutline,
} from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  getDatesForMonth,
  studentAttendanceCalendar,
  transformListToGrid,
} from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';

const Attendance = ({editable = false}:any) => {
  const [viewMode, setViewMode] = useState('list');
  const todayDate = new Date();
  const [currentMY, setCurrentMY] = useState<any>({ month: todayDate.getMonth() + 1, year: todayDate.getFullYear() });
  const [attendanceDate, setAttendanceDate] = useState<any>([]);
  const [gridAttendance, setGridAttendance] = useState<any>([]);
  const containerRef = useRef<any>(null);
  let isInitialLoad = true;

  const todayFormate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
  // const gridAttendance = transformListToGrid(studentAttendanceCalendar);
  const breadCrumbsValue = [
    { bName: 'Home', path: '/dashboard' },
    { bName: 'Attendance', path: '/attendance' },
  ];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  useEffect(() => {

    if(viewMode === 'list'){
    setAttendanceDate(getDatesForMonth(currentMY.month, currentMY.year));
    } else {
      setGridAttendance(transformListToGrid(getDatesForMonth(currentMY.month, currentMY.year)))
    }

    const scrollTimeOut = setTimeout(() => {
      if (containerRef.current) {
        const scrollPosition = (todayDate.getDate() - 1) * (isPlatform('ios') ? 44 : 48);
        containerRef.current.scrollTo({
          top:currentMY.month === todayDate.getMonth() + 1 && currentMY.year === todayDate.getFullYear() ? scrollPosition : 0,
          behavior: 'smooth',
        });
      }
    }, 500);

    return () => {
      clearTimeout(scrollTimeOut)
    }
  }, [currentMY]);

  const handleDateChange = (action: string) => {
    setCurrentMY((prevState: any) => {
      let newMonth = prevState.month;
      let newYear = prevState.year;
      switch (action) {
        case 'previousMonth':
          newMonth = newMonth === 1 ? 12 : newMonth - 1;
          newYear = newMonth === 12 ? newYear - 1 : newYear;
          break;
        case 'nextMonth':
          newMonth = newMonth === 12 ? 1 : newMonth + 1;
          newYear = newMonth === 1 ? newYear + 1 : newYear;
          break;
        case 'previousYear':
          newYear -= 1;
          break;
        case 'nextYear':
          newYear += 1;
          break;
        default:
          break;
      }
      return { month: newMonth, year: newYear };
    });
  };

  return (
    <div className='attendance'>
      <div className="g_flex g_space_btwn g_align_cntr bread_toggle_container">
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div>
          <IonIcon
            onClick={() => {
              setViewMode('list');
            }}
            className={`list_viwe_icon ${viewMode === 'list' ? 'selected' : ''}`}
            icon={listSharp}
          ></IonIcon>
          <IonIcon
            onClick={() => {
              setGridAttendance(transformListToGrid(getDatesForMonth(currentMY.month, currentMY.year)))
              setViewMode('grid');
            }}
            className={`grdi_view_icon ${viewMode === 'grid' ? 'selected' : ''}`}
            icon={appsSharp}
          ></IonIcon>
        </div>
      </div>
      <IonCard className="custome_attendance_card">
        <IonCardContent className="custome__card_attendance_container">
          <div className="g_flex g_space_around icons_holder_attendance">
            <IonIcon onClick={() => handleDateChange('previousYear')} icon={caretBackOutline}></IonIcon>
            <IonIcon onClick={() => handleDateChange('previousMonth')} icon={chevronBackOutline}></IonIcon>
            <div className="month_year_view g_flex g_space_evnly g_align_cntr">
              <IonText className="month_year">{months[currentMY.month - 1]}</IonText>
              <IonText className="month_year">{currentMY.year}</IonText>
            </div>
            <IonIcon onClick={() => handleDateChange('nextMonth')} icon={chevronForwardOutline}></IonIcon>
            <IonIcon onClick={() => handleDateChange('nextYear')} icon={caretForwardOutline}></IonIcon>
          </div>
        </IonCardContent>
      </IonCard>
      {viewMode === 'list' ? (
        <>
          <IonCard className="custome_attendance_card">
            <IonCardContent className="g_flex g_space_around g_align_cntr custome__card_attendance_container">
              {['Date', 'Day', 'AM', 'PM'].map((iView) => (
                <IonText key={iView} className="calendar_label_view row_item_quater">
                  {iView}
                </IonText>
              ))}
            </IonCardContent>
          </IonCard>
          <div className="attendance_container_items" ref={containerRef}>
            {attendanceDate && attendanceDate.map((item: any, index: number) => (
              <IonItem className={`attendance_ion_item ${item.isSchoolHoliday ? 'danger' : ''} ${item.date === todayFormate ? 'special_today_item' : ''}`} key={index}>
                <IonText className="row_item_quater large_text">{item.currentDay}</IonText>
                <IonText className="row_item_quater">{item.dayShort}</IonText>
                <div className="row_item_quater">
                  {item.isSchoolHoliday ? (
                    <>
                      <IonText>NA</IonText>
                    </>
                  ) : (
                    <IonIcon
                      className={`${item.attendanceMarked >= 1
                        ? item.am
                          ? 'success'
                          : 'absent_recorded'
                        : 'attendance_not_recorded'
                        }`}
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
                      className={`${item.attendanceMarked == 2
                        ? item.pm
                          ? 'success'
                          : 'absent_recorded'
                        : 'attendance_not_recorded'
                        }`}
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
            <IonCardContent className="g_flex g_align_cntr custome_card_content_day_view">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                (dayName) => (
                  <IonItem
                  key={`grids-${dayName}`}
                    className="day_list_map ion-text-center"
                  >
                    <IonText className="ion_text_day_view">{dayName}</IonText>
                  </IonItem>
                )
              )}
            </IonCardContent>
          </IonCard>
          <div className="attendance_container_items">
            {gridAttendance.map((gridItem: any, index: number) => (
              <IonCard
                key={`grid-${index}`}
                className="custome_attendance_card2"
              >
                <IonCardContent className="g_flex g_align_cntr custome_card_content_day_view2">
                  {gridItem.map((dayItem: any, subIndex: number) => (
                    <IonItem
                    key={`dayItem--${Math.random()}`}
                      className={`day_list_map update_ion_item ion-text-center ${dayItem == null
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
                              className={`${dayItem?.attendanceMarked >= 1
                                ? dayItem?.am
                                  ? 'success'
                                  : 'absent_recorded'
                                : 'attendance_not_recorded'
                                }`}
                              icon={
                                dayItem?.attendanceMarked >= 1
                                  ? dayItem?.am
                                    ? checkmarkCircleOutline
                                    : closeCircleOutline
                                  : removeOutline
                              }
                            ></IonIcon>
                            <IonIcon
                              className={`${dayItem?.attendanceMarked == 2
                                ? dayItem?.pm
                                  ? 'success'
                                  : 'absent_recorded'
                                : 'attendance_not_recorded'
                                }`}
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
          <div className="g_flex g_space_around g_align_cntr summery_icons_container">
            <IonIcon icon={printSharp}></IonIcon>
            <IonIcon icon={analyticsOutline}></IonIcon>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Attendance;
