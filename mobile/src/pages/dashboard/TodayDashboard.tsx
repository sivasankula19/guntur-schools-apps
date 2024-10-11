import { IonItem, IonList, IonText, isPlatform } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { timeTableVal } from '../../common/utility';

interface ITodayDashboardProps {
    currentDay: string
}

function TodayDashboard({ currentDay }: ITodayDashboardProps) {
    const [timeDiffHrs, setTimeDiffHrs] = useState(0);
    const [timeDifference, setTimeDifference] = useState(0);
    const [timeTable, setTimeTable] = useState(timeTableVal);
    const [currentDayObj, setCurrentDayObj] = useState<any>({});
    const timeDisplay = [
        { id: 1, startTime: '08:00 AM', endTime: '08:59 AM' },
        { id: 2, startTime: '09:00 AM', endTime: '09:59 AM' },
        { id: 3, startTime: '10:00 AM', endTime: '10:59 AM' },
        { id: 4, startTime: '11:00 AM', endTime: '11:59 AM' },
        { id: 5, startTime: '12:00 PM', endTime: '12:59 PM' },
        { id: 6, startTime: '01:00 PM', endTime: '01:59 PM' },
        { id: 7, startTime: '02:00 PM', endTime: '02:59 PM' },
        { id: 8, startTime: '03:00 PM', endTime: '03:59 PM' },
        { id: 9, startTime: '04:00 PM', endTime: '04:59 PM' },
        { id: 10, startTime: '05:00 PM', endTime: '05:59 PM' },
        { id: 11, startTime: '06:00 PM', endTime: '06:59 PM' },
        { id: 12, startTime: '07:00 PM', endTime: '07:59 PM' },
        { id: 13, startTime: '08:00 PM', endTime: '08:59 PM' },
        { id: 14, startTime: '09:00 PM', endTime: '09:59 PM' },
        { id: 15, startTime: '10:00 PM', endTime: '10:59 PM' },
        { id: 16, startTime: '11:00 PM', endTime: '11:59 PM' },
    ];
    useEffect(() => {
        calculateTimeDiffUpdateState();
        const interval = setInterval(() => {
            calculateTimeDiffUpdateState();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        calculateTimeDiffUpdateState();
        const interval = setInterval(() => {
            calculateTimeDiffUpdateState();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const calculateTimeDiffUpdateState = () => {
        const now = new Date();
        const targetTime = new Date(now);
        targetTime.setHours(8);
        targetTime.setMinutes(0);
        targetTime.setSeconds(0);

        // now.setHours(11);
        // now.setMinutes(59);
        // now.setSeconds(0);

        const differenceInMilliseconds = now.getTime() - targetTime.getTime();
        const differenceInMinutes = Math.floor(
            differenceInMilliseconds / (1000 * 60)
        );
        const diffHrs = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
        setTimeDiffHrs(diffHrs);
        setTimeDifference(differenceInMinutes);
    };

    useEffect(() => {
        if (timeTable)
            setCurrentDayObj(timeTable.find((tT) => tT.dayShort === currentDay));
    }, [currentDay])

    // Convert a time string like "10:30 AM" to total minutes from midnight
    const parseTimeStringToMinutes = (timeString: string) => {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
            hours = 0; // Midnight case
        }

        return hours * 60 + minutes;
    };


    return (
        <div className="time-table-view">
            <div className="time_day_view_con">
                <div
                    style={{ top: `${(isPlatform('tablet') ? 14 : 6) + timeDiffHrs * 6 + timeDifference + (isPlatform('android') ? 8 : 0)}px` }}
                    className="current-time-indicator"
                ></div>
                <IonList>
                    {timeDisplay.map((time) => {
                        const period = currentDayObj?.periods?.find((p: any) => {
                            const periodMinutes = parseTimeStringToMinutes(p.timeStart);
                            const startMinutes = parseTimeStringToMinutes(time.startTime);
                            const endMinutes = parseTimeStringToMinutes(time.endTime);

                            // Check if period start time is between the time slot's start and end times
                            return periodMinutes >= startMinutes && periodMinutes <= endMinutes;
                        });

                        let differenceInMinutes = 0;
                        let durationInMinutes = 0;
                        if (period) {
                            const periodMinutes = parseTimeStringToMinutes(period.timeStart);
                            const periodEndMinutes = parseTimeStringToMinutes(period.timeEnd);
                            const startMinutes = parseTimeStringToMinutes(time.startTime);

                            // Calculate the difference in minutes
                            differenceInMinutes = periodMinutes - startMinutes;
                            durationInMinutes =  periodEndMinutes - periodMinutes;
                        }

                        return (
                            <React.Fragment key={`time${time.id}`} >
                                {period && (<div style={{marginTop:`${Math.abs(differenceInMinutes)}px`, height:`${Math.abs(durationInMinutes)}px`}} className='period-indicator'>
                                    <div className='period-info-item'>
                                        <div className='g_flex g-space-between'>
                                            <IonText><p className='font-600 g-font-14 color-0'>{period.subject}</p></IonText>
                                            <IonText><p className='g-font-10'>{period.subjectId}</p></IonText>
                                        </div>
                                        <div className='g_flex g-space-between'>
                                            <IonText><p className='g-font-12'>{"Staff Name"}</p></IonText>
                                            <IonText><p className='g-font-10'>{"Staff Id"}</p></IonText>
                                        </div>
                                    </div>
                                </div>)}
                                <IonItem>
                                    <div>{time.startTime}</div>
                                </IonItem>
                            </React.Fragment>
                        );
                    })}
                </IonList>
            </div>
        </div>
    )
}

export default TodayDashboard