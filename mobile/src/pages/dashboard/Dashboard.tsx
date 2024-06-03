import React, { useEffect, useRef, useState } from 'react';
import NavChipCard from '../../components/NavChipsCard';
import './Dashboard.css';
import {
  calendarOutline,
  callOutline,
  chatboxOutline,
  documentOutline,
  documentTextOutline,
  documentsOutline,
  homeOutline,
  imageOutline,
  informationCircleOutline,
  newspaperOutline,
  peopleOutline,
  ribbonOutline,
  schoolOutline,
  timeOutline,
  trophyOutline,
  walletOutline,
} from 'ionicons/icons';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonText,
} from '@ionic/react';
import { formatDate, timeTableVal } from '../../common/utility';

const dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [timeDifference, setTimeDifference] = useState(0);
  const [timeDiffHrs, setTimeDiffHrs] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState('Today');
  const dsbrdRef = useRef<any>(null);

  const chipsData = [
    { id: 1, moduleName: 'Attendance', icon: calendarOutline },
    { id: 2, moduleName: 'Progress Card', icon: documentTextOutline },
    { id: 3, moduleName: 'Home Work', icon: documentsOutline },
    { id: 4, moduleName: 'My Subjects', icon: schoolOutline },
    { id: 5, moduleName: 'Messages', icon: chatboxOutline },
    { id: 6, moduleName: 'Documents', icon: documentOutline },
    { id: 7, moduleName: 'My Staff', icon: peopleOutline },
    { id: 8, moduleName: 'My Friends', icon: peopleOutline },
    { id: 9, moduleName: 'Time Table', icon: timeOutline },
    { id: 10, moduleName: 'Wibe', icon: newspaperOutline },
    { id: 11, moduleName: 'My Dues', icon: walletOutline },
    { id: 12, moduleName: 'Ex Circ.', icon: ribbonOutline },
    { id: 13, moduleName: 'Gallery', icon: imageOutline },
    { id: 14, moduleName: 'Achievements', icon: trophyOutline },
    { id: 15, moduleName: 'Contact Us', icon: callOutline },
    { id: 16, moduleName: 'About', icon: informationCircleOutline },
  ];

  const handleViewMode = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSegmentChange = (value: any) => {
    setSelectedSegment(value);
  };

  const timeDisplay = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    '11:00 PM',
  ];

  const fullAbs = [{
    shortName:'MAT',
    fullName:'Mathematics',
    id:'01'
  },{
    shortName:'ENG',
    fullName:'English',
    id:'02'
  },{
    shortName:'TEL',
    fullName:'Telugu',
    id:'03'
  },{
    shortName:'HIN',
    fullName:'Hindi',
    id:'04'
  },{
    shortName:'SOC',
    fullName:'Social',
    id:'05'
  },{
    shortName:'SCI-P',
    fullName:'Physical Science',
    id:'06'
  },{
    shortName:'SCI-C',
    fullName:'Chemical Science',
    id:'07'
  },{
    shortName:'PT',
    fullName:'Games',
    id:'08'
  },{
    shortName:'LIB',
    fullName:'Library',
    id:'09'
  },{
    shortName:'LIB-C',
    fullName:'Computer Library',
    id:'07'
  },]

  const timeArr = timeTableVal;

  useEffect(() => {
    calculateTimeDiffUpdateState();
    const interval = setInterval(() => {
      calculateTimeDiffUpdateState();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    scrollToTop()
  },[isOpen])

  const scrollToTop = () => {
    if (dsbrdRef.current) {
      dsbrdRef.current.scrollTop = 0; 
    }
  };

  const calculateTimeDiffUpdateState = () => {
    const now = new Date();
    setCurrentTime(formatDate(now, false, true));
    
    // now.setHours(8);
    // now.setMinutes(0);
    // now.setSeconds(0);

    const targetTime = new Date(now);
    targetTime.setHours(8);
    targetTime.setMinutes(0);
    targetTime.setSeconds(0);

    const differenceInMilliseconds = now.getTime() - targetTime.getTime();
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    const diffHrs = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    setTimeDiffHrs(diffHrs);
    setTimeDifference(differenceInMinutes);
  };

  return (
    <div ref={dsbrdRef}  className='dsbrd_container'>
      <div className="dsbrd">
        <NavChipCard
          isOpen={isOpen}
          handleView={handleViewMode}
          chips={chipsData.slice(0, isOpen ? undefined : 9)}
        ></NavChipCard>
      </div>
      <IonCard className="calendar_time_table">
        <IonCardContent>
          <div className="g_flex">
            <div className="custom-segment-container">
              <div className="custom-segment">
                <button
                  className={`segment-button ${
                    selectedSegment === 'Today' ? 'active' : ''
                  }`}
                  onClick={() => handleSegmentChange('Today')}
                >
                  Today
                </button>
                <button
                  className={`segment-button ${
                    selectedSegment === 'Week' ? 'active' : ''
                  }`}
                  onClick={() => handleSegmentChange('Week')}
                >
                  Week
                </button>
              </div>
            </div>
            <div className="custom-segment-container">
              <div className="day-time-display">
                <IonText>
                  <p>{currentTime}</p>
                </IonText>
              </div>
            </div>
          </div>
          {selectedSegment === 'Today' ? (
            <div className="time_today_view">
              <div className="time_day_view_con">
                <div
                  style={{ top: `${6 + timeDiffHrs * 6 + timeDifference}px` }}
                  className="current_time_indicator"
                ></div>
                <IonList>
                  {timeDisplay.map((time) => (
                    <IonItem key={time}>
                      <div>{time}</div>
                    </IonItem>
                  ))}
                </IonList>
              </div>
            </div>
          ) : (
            <>
              <div className="week_view_conatainer">
                <div className="g_flex">
                  <div
                    className="g_height45"
                    style={{
                      width: `${100 / 7}%`,
                    }}
                  ></div>
                  <div
                    className="g_flex g_height45 day_display_item"
                    style={{
                      width: `${(100 / 7) * 6}%`,
                    }}
                  >
                    {timeArr.map((day) => (
                      <div
                        className="g_flex g_align_cntr g_jstfy_content_cntr"
                        style={{
                          width: `${100 / timeArr.length}%`,
                        }}
                        key={day.day}
                      >
                        {day.dayShort}
                      </div>
                    ))}
                  </div>
                </div>
                {timeArr.length &&
                  timeArr[0]?.periods.map((time, indx) => (
                    <div className="g_flex" key={indx}>
                      <div
                        className="time_item_week"
                        style={{
                          width: `${100 / 7}%`,
                          borderTop: indx == 0 ? '1px solid #1D7AF5' : 'none',
                          borderBottom:
                            indx == timeArr[0].periods.length - 1
                              ? '1px solid #1D7AF5'
                              : 'none',
                          borderTopLeftRadius: indx == 0 ? '4px' : 'none',
                          borderTopRightRadius: indx == 0 ? '4px' : 'none',
                          borderBottomLeftRadius:
                            indx === timeArr[0].periods.length - 1
                              ? '4px'
                              : 'none',
                          borderBottomRightRadius:
                            indx === timeArr[0].periods.length - 1
                              ? '4px'
                              : 'none',
                        }}
                        key={time.timeStart}
                      >
                        {time.timeStart}
                      </div>
                      {timeArr.map((tItem, ind) => (
                        <div
                          key={tItem.day}
                          className="g_flex g_align_cntr g_jstfy_content_cntr"
                          style={{
                            width: `${100 / 7}%`,
                          }}
                        >
                          {tItem.periods[indx].subShort}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
              <div className='shorthand_names'>
                {fullAbs.map((item) => (
                  <div key={item.id} className='short_item'>
                    {item.shortName} - {item.fullName}
                  </div>
                ))}
              </div>
            </>
          )}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default dashboard;
