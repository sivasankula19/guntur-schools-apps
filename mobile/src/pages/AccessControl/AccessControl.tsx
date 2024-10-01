import React, { useEffect, useRef, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonContent, IonIcon, IonLabel, IonPopover, IonSearchbar, IonText } from '@ionic/react';
import { caretDownOutline, caretUpOutline, checkmarkCircleOutline, saveOutline } from 'ionicons/icons';
import GCustomItemSelect from '../../components/GCustomItemSelect';
import { searchStaffData } from '../../common/utility';
import { useNavigate } from 'react-router';

function AccessControl() {
    const [currentSelected, setCurrentSelected] = useState<string>('');
    const accessScrollRef = useRef(null);
    const [searchResult, setSearchResult] = useState<any>([]);
    const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
    const studentsDisplayRef = useRef<any>();
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Access Control', path: '/access-control' }];
    const [accessTableData, setAccessTableData] = useState<any>([]);
    const navigate = useNavigate();
    const [popoverOpen, setPopoverOpen] = useState('');
    const [search, setSearch] = useState('');
    const [selectedClsSec, setSelectedClsSec] = useState<any[]>([])

    const accessModules = [
        { id: 'acc-1', moduleName: 'Attendance', moduleId: 'access-attendance' },
        { id: 'acc-2', moduleName: 'Progress Card', moduleId: 'access-progress-card' },
        { id: 'acc-4', moduleName: 'Class Time Table', moduleId: 'class-time-table' },
        { id: 'acc-5', moduleName: 'Documents', moduleId: 'access-documents' },
        { id: 'acc-6', moduleName: 'Exam Schedule', moduleId: 'access-exam-schedule' },
        { id: 'acc-7', moduleName: 'Home Work', moduleId: 'access-homework' },
        { id: 'acc-8', moduleName: 'Class Subjects', moduleId: 'access-subjects' },
        // { id: 'acc-7', moduleName: 'Staff CRUD', moduleId: 'access-staff' },
        // { id: 'acc-8', moduleName: 'School Info Public', moduleId: 'access-school' },
        // { id: 'acc-9', moduleName: 'Class - Subjects', moduleId: 'access-cls-sub' },
    ]

    useEffect(() => {
        // select it from location state 
        setSearchResult(searchStaffData);
        setAccessTableData([
            { id: Math.random().toString(), isOpen: false, staffDetails: { staffId: 'GHMSTAFF10', staffName: 'Siva Sankula' }, accessClasses: [] },
            { id: Math.random().toString(), isOpen: false, staffDetails: { staffId: 'GHMSTAFF09', staffName: 'Krishna S' }, accessClasses: [{ id: 2, shortName: '10-B', classSecName: '10th B Sec', classId: 'ghmd-10th', sectionId: 'ghmd-sec-b' },] }
        ])
        setCurrentSelected(accessModules[0].moduleId);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (currentSelected && accessScrollRef.current) {
                const container: any = accessScrollRef.current;
                const selectedButton = container.querySelector(`.${currentSelected}`);

                if (selectedButton) {
                    const containerRect = container.getBoundingClientRect();
                    const buttonRect = selectedButton.getBoundingClientRect();
                    const scrollLeft = buttonRect.left - containerRect.left + container.scrollLeft;
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
            }
        }, 1);
    }, [currentSelected]);

    const handleAccessItemClick = (id: string) => {
        setCurrentSelected(id);
    }

    const handleNavigate = (e: any) => {
        if (e.target.id === 'other-modules-btn') {
            navigate('/module-access');
        } else {
            navigate('/access-public-modules');
        }
    }

    const handleInput = (ev: any) => {
        setSearch(ev.detail.value);
    };

    const classListWithSections = [
        { id: "ghmd-10-a", shortName: '10-A', classSecName: '10th A Sec', classId: 'ghmd-10th', sectionId: 'ghmd-sec-a' },
        { id: "ghmd-10-b", shortName: '10-B', classSecName: '10th B Sec', classId: 'ghmd-10th', sectionId: 'ghmd-sec-b' },
        { id: "ghmd-9-a", shortName: '9-A', classSecName: '9th A Sec', classId: 'ghmd-9th', sectionId: 'ghmd-sec-a' },
        { id: "ghmd-9-b", shortName: '9-B', classSecName: '9th B Sec', classId: 'ghmd-9th', sectionId: 'ghmd-sec-b' },
        { id: "ghmd-8-a", shortName: '8-A', classSecName: '8th A Sec', classId: 'ghmd-8th', sectionId: 'ghmd-sec-a' },
        { id: "ghmd-8-b", shortName: '8-B', classSecName: '8th B Sec', classId: 'ghmd-8th', sectionId: 'ghmd-sec-b' },
        { id: "ghmd-8-c", shortName: '8-C', classSecName: '8th C Sec', classId: 'ghmd-8th', sectionId: 'ghmd-sec-c' },
    ]

    const handleStudentChange = (classInfo: any) => {
        if (classInfo.isSelect) {
            setSelectedClsSec(classInfo.selectAll ? [...classListWithSections] : []);
        } else {
            const updatedSelectedClsSec = [...selectedClsSec];
            if (updatedSelectedClsSec.find((clsSec: any) => clsSec.id === classInfo.id)) {
                setSelectedClsSec(prev => ([...prev.filter(prvCls => prvCls.id !== classInfo.id)]));
            } else {
                setSelectedClsSec(prev => ([...prev, classInfo]));
            }
        }
    }

    const handlePopoverClose = (currentItem: any, clsSecInfo: any) => {
        setAccessTableData((prevData: any) =>
            prevData.map((item: any) =>
                item.id === currentItem.id
                    ? { ...item, accessClasses: clsSecInfo }
                    : item
            )
        );
        setSelectedClsSec([]);
    }

    const openPopover = (e: any, clsSecInfo: any) => {
        setSelectedClsSec(clsSecInfo.accessClasses)
        setPopoverOpen(e.target.id);
    };

    return (
        <div className='access-control-sa'>
            <GBreadCrumbs data={breadCrumbsValue} />
            <div className='m-h-10 access-data'>
                <div className='width-100 nav-ele-show-con' ref={accessScrollRef}>
                    {accessModules.map((accessM) => (<div className={`${accessM.moduleId} access-item ${currentSelected === accessM.moduleId ? 'selected-access-item' : ''}`} key={accessM.id} onClick={() => handleAccessItemClick(accessM.moduleId)}>
                        <IonText>
                            <p>{accessM.moduleName}</p>
                        </IonText>
                    </div>))}
                </div>
                <div className='g_flex g-space-between g-align-center p-t-10 text-save-label'>
                    <IonLabel>Select respective classes for each Staff associates </IonLabel>
                    <IonIcon icon={saveOutline}></IonIcon>
                </div>
                <div className='add_assets_cnt p-t-10'>
                    <div className='input_btn_assets g_flex g-space-between'>
                        <div className='drop-down-access' ref={studentsDisplayRef}>
                            <IonLabel className='g_text_ellipses'>{selectedStudent?.itemName || 'Select Staff'} </IonLabel>
                            <IonIcon icon={isOpenStudentCard ? caretUpOutline : caretDownOutline}></IonIcon>
                        </div>
                        <button>Add</button>
                    </div>
                </div>
                <GCustomItemSelect itemData={searchResult.map((i: any) => ({ itemName: i.staffName, itemId: i.staffId, itemDescription: i.designation }))}
                    isOpen={isOpenStudentCard}
                    setIsOpen={setIsOpenStudentCard}
                    selectedItem={selectedStudent}
                    setSelectedItem={setSelectedStudent}
                    parentItemDetailsRef={studentsDisplayRef}
                    classNames='m-top-0'
                />
                <div className='access-table'>
                    <div className='row'>
                        <div className='head-col col width-40 first-col'>
                            <IonLabel >Staff Name</IonLabel>
                        </div>
                        <div className='head-col col width-60'>
                            <IonLabel>Access Classes</IonLabel>
                        </div>
                    </div>

                    <div className='access-table-fixed'>
                        <div className='row'>
                            <div className='col width-40 first-col'>
                                <IonLabel >Staff Name</IonLabel>
                            </div>
                            <div className='col width-60'>
                                <div className='drop-down-access g_full_width disabled-drop-access'>
                                    <IonLabel>*</IonLabel>
                                    <IonIcon icon={caretDownOutline}></IonIcon>
                                </div>
                            </div>
                        </div>
                        {accessTableData.map((staff: any, staffIndex: number) => (<div key={staff.id} className='row'>
                            <div className='col width-40 first-col'>
                                <IonLabel >{staff.staffDetails.staffName}</IonLabel>
                            </div>
                            <div className='col width-60' onClick={(e: any) => openPopover(e, staff)} id={`click-trigger-${staffIndex}`}>
                                <div className='drop-down-access g_full_width enabled-drop-access'>
                                    <IonLabel className='g_text_ellipses'>{"<Select Classes>"}</IonLabel>
                                    <IonIcon icon={caretDownOutline}></IonIcon>
                                </div>
                            </div>
                            <IonPopover side="top" alignment="center" isOpen={popoverOpen == `click-trigger-${staffIndex}`} onDidDismiss={() => handlePopoverClose(staff, selectedClsSec)} className='notification-popover' trigger={`click-trigger-${staffIndex}`} triggerAction="click">
                                <IonContent class="ion-padding">
                                    <div className='popover-cls-sec'>
                                        <div className='m-bottom-10'>
                                            <IonSearchbar placeholder='Search Class - Section / Id' showClearButton="focus"
                                                value={search}
                                                debounce={500}
                                                onIonInput={handleInput}></IonSearchbar>
                                        </div>
                                        <div className='cls-sec-list'>
                                            {classListWithSections.length ? <>
                                                <div onClick={() => handleStudentChange({ selectAll: selectedClsSec.length !== classListWithSections.length, isSelect: true })} className={`class-section-item ${selectedClsSec.length === classListWithSections.length ? ' selected-card' : ''}`}>
                                                    <div className='width-95 student-name'><p className='g_text_ellipses'>{"All Classes Sections"}</p></div>
                                                    <div className='width-5'>
                                                        {selectedClsSec.length === classListWithSections.length && (
                                                            <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                                                        )}
                                                    </div>
                                                </div>
                                                {classListWithSections.map((itemInfo: any) => (
                                                    <div key={itemInfo.id} onClick={() => handleStudentChange(itemInfo)} className={`class-section-item ${selectedClsSec.find(clsItem => clsItem.id === itemInfo.id) ? ' selected-card' : ''}`}>
                                                        <div className='width-70 student-name'><p className='g_text_ellipses'>{itemInfo.classSecName}</p></div>
                                                        <div className='width-25 student-id-cls'>
                                                            <div><p className='g_text_ellipses font-500'>{itemInfo.classId}</p></div>
                                                            <div><p className='g_text_ellipses'>{itemInfo.sectionId}</p></div>
                                                        </div>
                                                        <div className='width-5'>
                                                            {selectedClsSec.find(clsItem => clsItem.id === itemInfo.id) && (
                                                                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </> : <>
                                                <div>No Results Found!</div>
                                            </>}
                                        </div>
                                    </div>
                                </IonContent>
                            </IonPopover>
                        </div>))}
                    </div>
                </div>
                <div className='access-private'>
                    <IonButton id='other-modules-btn' className='br-ion-12 m-top-12 g_txt_cap add-employee-student' onClick={handleNavigate} fill="outline" expand="block">Other Modules</IonButton>
                    <IonButton id='private-modules-btn' className='br-ion-12 m-top-12 g_txt_cap add-employee-student' onClick={handleNavigate} fill="outline" expand="block">Public Modules</IonButton>
                </div>
            </div>
        </div>
    )
}

export default AccessControl