import React, { useEffect, useRef, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonIcon,
    IonLabel,
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
import GCustomItemSelect from '../../components/GCustomItemSelect';

const ProgressCardSA: React.FC = () => {
    const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState('unit1');
    const [viewMode, setViewMode] = useState('list');
    const [searchResult, setSearchResult] = useState<any>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>({
        "itemName": "Narra Dev Qumar",
        "itemId": "GHMS00020",
        "itemDescription": ''
    });
    const unitsScrollRef = useRef<any>(null);
    const studentsDisplayRef = useRef<any>();
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Progress Card', path: '/progress-card' },];

    const studentInfo: any = {
        fullName: 'Siva S User',
        Rank: '01',
        classTeacher: 'Some Teacher ',
        year: '2024 - 2025',
        classOfStudy: '8 Class - A Section',
        signOn: false,
    };

    useEffect(() => {
        setSearchResult(searchStudentsData)
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

    return (
        <>
            <div className="breadcrumbs_progress">
                <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
            </div>
            <div className='p-h-10'>
                <IonCard className='custom-att-card'>
                    <IonCardContent className='padding-0'>
                        <div className='back-save-icons g-align-center'>
                            <IonIcon icon={chevronBackOutline}></IonIcon>
                            <div className='g_flex p-h-10 username-holder m-width-60' ref={studentsDisplayRef}>
                                <IonLabel class='g_text_ellipses'>
                                    {selectedStudent.itemName}
                                </IonLabel>
                                <IonLabel>
                                    ({selectedStudent.itemId})
                                </IonLabel>
                                <IonIcon icon={caretDownOutline}></IonIcon>
                            </div>
                            <IonIcon icon={chevronForwardOutline}></IonIcon>
                        </div>
                    </IonCardContent>
                </IonCard>
                <GCustomItemSelect itemData={searchResult.map((i: any) => ({ itemName: i.studentName, itemId: i.regNumber, itemDescription: i.className + i.sectionName }))}
                    isOpen={isOpenStudentCard}
                    setIsOpen={setIsOpenStudentCard}
                    selectedItem={selectedStudent}
                    setSelectedItem={setSelectedStudent}
                    parentItemDetailsRef={studentsDisplayRef}
                />
            </div>
            <div className="progress_card custom-progress-card">
                <StudentInfoProCard studentInfo={studentInfo} />
                <div className='g_flex g-align-center g-space-between p-h-16 custom-btn-progress'>
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
                    <div className="g_flex g-align-center progress_icons_container">
                        <IonIcon
                            onClick={() => {
                                setViewMode('list');
                            }}
                            className={`list-view-icon ${viewMode === 'list' && 'selected'}`}
                            icon={listSharp}
                        ></IonIcon>
                        <IonIcon
                            onClick={() => {
                                setViewMode('grid');
                            }}
                            className={`grid-view-icon ${viewMode === 'grid' && 'selected'}`}
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
