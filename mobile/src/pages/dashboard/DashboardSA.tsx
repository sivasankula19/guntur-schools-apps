import { IonButton, IonCard, IonCardContent, IonFooter, IonItem, IonText } from '@ionic/react';
import React, { useState } from 'react'
import NavChipCard from '../../components/NavChipsCard';
import './Dashboard.css';
import {
    bookOutline,
    businessOutline,
    calendarOutline,
    callOutline,
    chatboxOutline,
    documentOutline,
    documentTextOutline,
    gridOutline,
    imageOutline,
    informationCircleOutline,
    newspaperOutline,
    peopleOutline,
    ribbonOutline,
    schoolOutline,
    trophyOutline,
    walletOutline,
} from 'ionicons/icons';

export const DashboardSA = () => {
    const [moduleSelected, setModuleSelected] = useState('publicModule');

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
        { id: 15, moduleName: 'Gallery', icon: imageOutline, redirectTo: '/gallery' },
        { id: 16, moduleName: 'Achievements', icon: trophyOutline, redirectTo: '/achievements' },
        { id: 17, moduleName: 'Contact-Us', icon: callOutline, redirectTo: '/contact-us' },
        { id: 18, moduleName: 'About', icon: informationCircleOutline, redirectTo: '/about' },
        {id:19, moduleName:'Courses', icon:bookOutline, redirectTo:'/courses'}
    ];
    const chipsDataPublic = [
        { id: 1, moduleName: 'Class Attendance', icon: calendarOutline, redirectTo: '/attendance-by-class' },
        { id: 2, moduleName: 'Student Attendance', icon: calendarOutline, redirectTo: '/attendance-by-student' },
        { id: 3, moduleName: 'Progress Card', icon: documentTextOutline, redirectTo: '/progress-card' },
        { id: 4, moduleName: 'Classes', icon: gridOutline, redirectTo: '/school-classes' },
        { id: 5, moduleName: 'Home Work', icon: bookOutline, redirectTo: '/home-work' },
        { id: 6, moduleName: 'My Subjects', icon: schoolOutline, redirectTo: '/subjects' },
        { id: 7, moduleName: 'Messages', icon: chatboxOutline, redirectTo: '/messages' },
        { id: 8, moduleName: 'Documents', icon: documentOutline, redirectTo: '/documents' },
        { id: 9, moduleName: 'My Staff', icon: peopleOutline, redirectTo: '/staff-list' },
        { id: 10, moduleName: 'My Friends', icon: peopleOutline, redirectTo: '/students-list' },
        { id: 11, moduleName: 'Calendar', icon: calendarOutline, redirectTo: '/calendar' },
        { id: 12, moduleName: 'Wibe', icon: newspaperOutline, redirectTo: '/school-wibe' },
        { id: 13, moduleName: 'Exam Schedules', icon: calendarOutline, redirectTo: '/exam-schedules' },
        { id: 14, moduleName: 'My Dues', icon: walletOutline, redirectTo: '/fee-structure' },
        { id: 15, moduleName: 'Assets', icon: businessOutline, redirectTo: '/assets' },
    ];

    return (
        <div className='dashboard_sa'>
            <IonCard>
                <IonCardContent className='resource_content'>
                    <div className='resources_text g_flex g_space_btwn'>
                        <div className='g_flex g_align_cntr width-30'>
                            <IonText>
                                <h1>Resources</h1>
                            </IonText>
                        </div>
                        <div className='g_flex width-70 btns_resources'>
                            <button className={`${moduleSelected === 'privateModule' ? 'selected_module_btn' : ''}`} name='privateModule' id='privateModule' onClick={handleModule}>Public Modules</button>
                            <button className={`${moduleSelected === 'publicModule' ? 'selected_module_btn' : ''}`} name='publicModule' id='publicModule' onClick={handleModule}>Private Modules</button>
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>
            {moduleSelected !== '' &&
                (<div className='dsbrd dasbrd_sa'>
                    <NavChipCard
                        isOpen={true}
                        handleView={() => handleModule(null)}
                        chips={moduleSelected === 'privateModule' ? chipsDataPrivate : chipsDataPublic}
                    ></NavChipCard>
                </div>)
            }
            <div onClick={handleModule} className='analytics_container'>
                <div className='g_full_height g_txt_center analytics_holder_ds'>
                    Analytics Here!
                </div>
            </div>
        </div>
    )
}
