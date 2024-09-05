import React, { useEffect, useRef, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonIcon,
    IonLabel,
    IonSearchbar,
} from '@ionic/react';
import {
    appsSharp,
    caretDownOutline,
    chevronBackOutline,
    chevronForwardOutline,
    listSharp,
    saveOutline,
    settingsOutline,
} from 'ionicons/icons';

import { searchStudentsData } from '../../common/utility';
import RenderSelectedTableUnit from '../../components/RenderSelectedTableUnit';
import RenderAllExams from '../../components/RenderAllExams';
import StudentInfoProCard from '../../components/StudentInfoProCard';

const ProgressCardSA: React.FC = () => {
    const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState('unit1');
    const [viewMode, setViewMode] = useState('list');
    const [searchResult, setSearchResult] = useState<any>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>({
        "id": 2,
        "studentName": "Narra Dev Qumar",
        "regNumber": "GHMS00020",
        "className": "8th Class",
        "sectionName": "B Section"
    });
    const [search, setSearch] = useState('');

    const unitsScrollRef = useRef<any>(null);
    const studentsDisplayRef = useRef<any>();
    const studentsDetailsRef = useRef<any>();

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Progress Card', path: '/progress-card' },];

    const studentInfo: any = {
        fullName: 'Siva S User',
        Rank: '01',
        classTeacher: 'Some Teacher ',
        year: '2024 - 2025',
        classOfStudy: '8 Class - A Section',
        signOn: false,
    };

    const handleInput = (ev: any) => {
        setSearch(ev.detail.value);
        setSearchResult(searchStudentsData.filter((item: any) => ((item.studentName).toLowerCase().includes((ev.detail.value).toLowerCase())) || ev.detail.value == ''))
        //  debounce function can be executed!!! here i.e api
    };

    useEffect(() => {
        setTimeout(() => {
            if (selectedTab && unitsScrollRef.current) {
                const container = unitsScrollRef.current;
                const selectedButton = container.querySelector(`.${selectedTab}`);

                if (selectedButton) {
                    const containerRect = container.getBoundingClientRect();
                    const buttonRect = selectedButton.getBoundingClientRect();
                    const scrollLeft = buttonRect.left - containerRect.left + container.scrollLeft;
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
            }
        }, 1);

    }, [selectedTab, viewMode]);

    useEffect(() => {
        setSearchResult(searchStudentsData);
        window.addEventListener('click', handleScreenClick);
        return () => {
            window.removeEventListener('click', handleScreenClick)
        };
    }, []);

    const handleScreenClick = (e: any) => {
        setIsOpenStudentCard((studentsDetailsRef && studentsDetailsRef.current?.contains(e.target)) || (studentsDisplayRef && studentsDisplayRef?.current?.contains(e.target)));
    }



    useEffect(() => {
        setSelectedTab('unit1')
    }, [viewMode]);

    const tabUnitsData = [
        { id: 'unit1', title: 'Unit 1' },
        { id: 'unit2', title: 'Unit 2' },
        { id: 'unit3', title: 'Unit 3' },
        { id: 'unit4', title: 'Unit 4' },
        { id: 'unit5', title: 'Unit 5' },
    ];

    const handleTabChange = (e: any) => {
        setSelectedTab(e.target.name);
    };

    const handleStudentChange = (student: any) => {
        setSelectedStudent(student)
    }

    const handlePopOverClose = (e: any) => {
        setIsOpenStudentCard(false);
    }
    return (
        <>
            <div className="breadcrumbs_progress">
                <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
            </div>
            <div className='p-h-10'>
                <IonCard className='custom-att-card'>
                    <IonCardContent className='padding-0'>
                        <div className='back-save-icons g_align_cntr'>
                            <IonIcon icon={chevronBackOutline}></IonIcon>
                            <div className='g_flex p-h-10 username-holder m-width-60' ref={studentsDisplayRef}>
                                <IonLabel class='g_text_ellipses'>
                                    {selectedStudent.studentName}
                                </IonLabel>
                                <IonLabel>
                                    ({selectedStudent.regNumber})
                                </IonLabel>
                                <IonIcon icon={caretDownOutline}></IonIcon>
                            </div>
                            <IonIcon icon={chevronForwardOutline}></IonIcon>
                        </div>
                    </IonCardContent>
                </IonCard>
                {
                    isOpenStudentCard && (
                        <IonCard ref={studentsDetailsRef} className='student-picker'>
                            <IonCardContent>
                                <div>
                                    <div className='m-bottom-10'>
                                        <IonSearchbar placeholder='Search A Student Name / Id' showClearButton="focus"
                                            value={search}
                                            debounce={500}
                                            onIonInput={handleInput}></IonSearchbar>
                                    </div>
                                    <div className='users-list-dis'>
                                        {searchResult.map((student: any) => (
                                            <div key={student.id} onClick={() => handleStudentChange(student)} className={`student-search-card${student.regNumber === selectedStudent.regNumber ? ' selected-card' : ''}`}>
                                                <div className='width-65 student-name'><p className='g_text_ellipses'>{student.studentName}</p></div>
                                                <div className='width-35 student-id-cls'>
                                                    <div><p className='g_text_ellipses font-500'>{student.regNumber}</p></div>
                                                    <div><p className='g_text_ellipses'>{student.className} - {student.sectionName}</p></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='m-top-10'>
                                        <IonButton id='student-list-select' fill="outline" expand="block" onClick={handlePopOverClose}>Close</IonButton>
                                    </div>
                                </div>
                            </IonCardContent>
                        </IonCard>)
                }
            </div>
            <div className="progress_card custom-progress-card">
                <StudentInfoProCard studentInfo={studentInfo} />
                <div className='g_flex g_align_cntr g_space_btwn p-h-16 custom-btn-progress'>
                    <div className='g_flex'>
                        <IonButton className='br-ion-12 g_txt_cap' fill="outline">Notify Parent</IonButton>
                        <IonButton className='br-ion-12 g_txt_cap' fill="outline">Edit Report</IonButton>
                    </div>
                    <div>
                        <IonIcon icon={settingsOutline} ></IonIcon>
                        <IonIcon className='m-left-20' icon={saveOutline} ></IonIcon>
                    </div>
                </div>
                <div className="g_flex tabs_container_custom">
                    <div className="tabs_progress_card" ref={unitsScrollRef}>
                        {viewMode === 'list' && (
                            <>
                                <div className="g_custom_tabs">
                                    {tabUnitsData.map((tabItem, index: number) => (
                                        <button
                                            key={index}
                                            className={`${tabItem.id} g_custom_tab ${selectedTab === tabItem.id ? 'selected_segment_btn' : ''
                                                }`}
                                            name={tabItem.id}
                                            onClick={handleTabChange}
                                        >
                                            <IonLabel>{tabItem.title}</IonLabel>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="g_flex g_align_cntr progress_icons_container">
                        <IonIcon
                            onClick={() => {
                                setViewMode('list');
                            }}
                            className={`list_viwe_icon ${viewMode === 'list' && 'selected'}`}
                            icon={listSharp}
                        ></IonIcon>
                        <IonIcon
                            onClick={() => {
                                setViewMode('grid');
                            }}
                            className={`grdi_view_icon ${viewMode === 'grid' && 'selected'}`}
                            icon={appsSharp}
                        ></IonIcon>
                    </div>
                </div>
                <IonCard>
                    <IonCardContent className="progress_marks_view">
                        {viewMode === 'list' ? (
                            <>
                                <RenderSelectedTableUnit
                                    selectedItem={tabUnitsData.find(
                                        (tItem) => tItem.id === selectedTab
                                    )}
                                    selectedTab={selectedTab}
                                />
                            </>
                        ) : (
                            <>
                                <RenderAllExams></RenderAllExams>
                            </>
                        )}
                    </IonCardContent>
                </IonCard>
            </div>
        </>
    );
};

export default ProgressCardSA;
