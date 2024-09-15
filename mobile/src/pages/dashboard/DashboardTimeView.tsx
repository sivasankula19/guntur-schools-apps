import React, { useEffect, useRef, useState } from 'react'
import TodayDashboard from './TodayDashboard'
import WeekDashboard from './WeekDashboard'
import { IonCard, IonCardContent, IonText } from '@ionic/react'
import { formatDate } from '../../common/utility';

function DashboardTimeView({ dashboardRef }: any) {
    const [selectedSegment, setSelectedSegment] = useState('Today');
    const [currentTime, setCurrentTime] = useState<any>(null);

    const handleSegmentChange = (value: any) => {
        setSelectedSegment(value);
    };

    useEffect(() => {
        calculateTimeDiffUpdateState();
        const interval = setInterval(() => {
            calculateTimeDiffUpdateState();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [])

    const scrollToTop = () => {
        if (dashboardRef?.current) {
            dashboardRef.current.scrollTop = 0;
        }
    };

    const calculateTimeDiffUpdateState = () => {
        const now = new Date();
        setCurrentTime(formatDate(now, false, true));
    };

    return (
        <IonCard className="calendar-time-table">
            <IonCardContent>
                <div className="g_flex">
                    <div className="custom-segment-container">
                        <div className="custom-segment">
                            <button
                                className={`segment-button left ${selectedSegment === 'Today' ? 'active' : ''
                                    }`}
                                onClick={() => handleSegmentChange('Today')}
                            >
                                Today
                            </button>
                            <button
                                className={`segment-button right ${selectedSegment === 'Week' ? 'active' : ''
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
                    <TodayDashboard currentDay='TUE' />
                ) : (
                    <WeekDashboard />
                )}
            </IonCardContent>
        </IonCard>
    )
}

export default DashboardTimeView