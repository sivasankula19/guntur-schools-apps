import { IonItem, IonList, isPlatform } from '@ionic/react'
import React, { useEffect, useState } from 'react'

function TodayDashboard() {
    const [timeDiffHrs, setTimeDiffHrs] = useState(0);
    const [timeDifference, setTimeDifference] = useState(0);

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

        const differenceInMilliseconds = now.getTime() - targetTime.getTime();
        const differenceInMinutes = Math.floor(
            differenceInMilliseconds / (1000 * 60)
        );
        const diffHrs = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
        setTimeDiffHrs(diffHrs);
        setTimeDifference(differenceInMinutes);
    };

    return (
        <div className="time-table-view">
            <div className="time_day_view_con">
                <div
                    style={{ top: `${6 + timeDiffHrs * 6 + timeDifference + (isPlatform('android') ? 8 : 0)}px` }}
                    className="current-time-indicator"
                ></div>
                <IonList>
                    {timeDisplay.map((time) => (
                        <IonItem key={`time${time}`}>
                            <div>{time}</div>
                        </IonItem>
                    ))}
                </IonList>
            </div>
        </div>
    )
}

export default TodayDashboard