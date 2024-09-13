import { IonCard, IonCardContent, IonText } from '@ionic/react';
import React, { useRef, useState } from 'react'
import NavChipCard from '../../components/NavChipsCard';
import './Dashboard.css';
import {
    bookOutline,
    businessOutline,
    calendarOutline,
    callOutline,
    chatboxOutline,
    cubeOutline,
    documentOutline,
    documentTextOutline,
    gridOutline,
    imageOutline,
    informationCircleOutline,
    keyOutline,
    newspaperOutline,
    peopleOutline,
    ribbonOutline,
    schoolOutline,
    trophyOutline,
    walletOutline,
} from 'ionicons/icons';
import DashboardTimeView from './DashboardTimeView';

export const DashboardSA = () => {
    const [moduleSelected, setModuleSelected] = useState('');
    const dashboardRef = useRef<any>(null);

    const handleModule = (e: any) => {
        let value = e?.target?.name || ''
        if (value !== moduleSelected) {
            setTimeout(() => {
                setModuleSelected(value)
            }, 100);
            setModuleSelected('')
        }
    }

    const chipsDataPrivate = [
        { id: 14, moduleName: 'Ex-Circular', icon: ribbonOutline, redirectTo: '/ex-circular' },
        { id: 888, moduleName: 'Assets', icon: businessOutline, redirectTo: '/assets' },
        { id: 15, moduleName: 'Gallery', icon: imageOutline, redirectTo: '/gallery' },
        { id: 16, moduleName: 'Achievements', icon: trophyOutline, redirectTo: '/achievements' },
        { id: 17, moduleName: 'Contact-Us', icon: callOutline, redirectTo: '/contact-us' },
        { id: 18, moduleName: 'About', icon: informationCircleOutline, redirectTo: '/about' },
        { id: 19, moduleName: 'Courses', icon: bookOutline, redirectTo: '/courses' }
    ];
    const chipsDataPublic = [
        { id: 999, moduleName: 'Access Control', icon: keyOutline, redirectTo: '/access-control' },
        { id: 1, moduleName: 'Staff', icon: peopleOutline, redirectTo: '/staff-list' },
        { id: 2, moduleName: 'Students', icon: peopleOutline, redirectTo: '/students-list' },
        { id: 3, moduleName: 'Sections', icon: cubeOutline, redirectTo: '/school-sections' },
        { id: 4, moduleName: 'Classes', icon: gridOutline, redirectTo: '/school-classes' },
        { id: 5, moduleName: 'Class Attendance', icon: calendarOutline, redirectTo: '/attendance-by-class' },
        { id: 6, moduleName: 'Student Attendance', icon: calendarOutline, redirectTo: '/attendance-by-student' },
        { id: 7, moduleName: 'Progress Cards', icon: documentTextOutline, redirectTo: '/progress-card' },
        { id: 99, moduleName: 'Subject Progress Card', icon: documentTextOutline, redirectTo: '/progress-card-class-subject' },
        { id: 8, moduleName: 'Home Works', icon: bookOutline, redirectTo: '/home-work' },
        { id: 9, moduleName: 'Class Subjects', icon: schoolOutline, redirectTo: '/subjects' },
        { id: 10, moduleName: 'Messages', icon: chatboxOutline, redirectTo: '/messages' },
        { id: 11, moduleName: 'Documents', icon: documentOutline, redirectTo: '/documents' },
        { id: 12, moduleName: 'Calendar', icon: calendarOutline, redirectTo: '/calendar' },
        { id: 13, moduleName: 'Vibe', icon: newspaperOutline, redirectTo: '/school-vibe' },
        { id: 14, moduleName: 'Exam Schedules', icon: calendarOutline, redirectTo: '/exam-schedules' },
        { id: 15, moduleName: 'My Dues', icon: walletOutline, redirectTo: '/fee-structure' },
    ];

    return (
        <div className='dashboard_sa'>
            <IonCard>
                <IonCardContent className='resource_content'>
                    <div className='resources_text g_flex g-space-between'>
                        <div className='g_flex g-align-center width-30'>
                            <IonText>
                                <h1>Resources</h1>
                            </IonText>
                        </div>
                        <div className='g_flex width-70 btn-resources'>
                            <button className={`${moduleSelected === 'privateModule' ? 'selected-module-btn' : ''}`} name='privateModule' id='privateModule' onClick={handleModule}>Private Modules</button>
                            <button className={`${moduleSelected === 'publicModule' ? 'selected-module-btn' : ''}`} name='publicModule' id='publicModule' onClick={handleModule}>Public Modules</button>
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>
            {moduleSelected !== '' &&
                (<div className='dashboard dashboard-sa'>
                    <NavChipCard
                        isOpen={true}
                        handleView={() => handleModule(null)}
                        chips={moduleSelected === 'publicModule' ? chipsDataPrivate : chipsDataPublic}
                    ></NavChipCard>
                </div>)
            }
            <div onClick={handleModule} className='analytics-container p-h-10'>
                <div className='g_full_height g_txt_center analytics-holder-ds'>
                    Analytics Here!
                </div>
                <DashboardTimeView dashboardRef={dashboardRef} />
            </div>
        </div>
    )
}

