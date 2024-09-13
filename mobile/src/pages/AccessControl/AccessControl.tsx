import React, { useEffect, useRef, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonIcon, IonLabel, IonText } from '@ionic/react';
import { caretDownOutline, caretUpOutline, saveOutline } from 'ionicons/icons';
import GCustomItemSelect from '../../components/GCustomItemSelect';
import { searchStaffData } from '../../common/utility';

function AccessControl() {
    const [currentSelected, setCurrentSelected] = useState<string>('');
    const accessScrollRef = useRef(null);
    const [searchResult, setSearchResult] = useState<any>([]);
    const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
    const studentsDisplayRef = useRef<any>();
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Access Control', path: '/access-control' }];
    const [accessTableData, setAccessTableData] = useState<any>([])

    const accessModules = [
        { id: 'acc-1', moduleName: 'Attendance', moduleId: 'access-attendance' },
        { id: 'acc-2', moduleName: 'Progress Card', moduleId: 'access-progress-card' },
        { id: 'acc-3', moduleName: 'Documents', moduleId: 'access-documents' },
        { id: 'acc-4', moduleName: 'Students CRUD', moduleId: 'access-students' },
        { id: 'acc-5', moduleName: 'Staff CRUD', moduleId: 'access-staff' },
        { id: 'acc-6', moduleName: 'School Info Public', moduleId: 'access-school' },
        { id: 'acc-7', moduleName: 'Class - Subjects', moduleId: 'access-cls-sub' },
    ]


    useEffect(() => {
        // select it from location state 
        setSearchResult(searchStaffData);
        setAccessTableData([
            { id: Math.random().toString(), isOpen: false, staffDetails: { staffId: 'GHMSTAFF10', staffName: 'Siva Sankula' }, accessClasses: [{ classId: 'mdgl-scl-cls-10', className: '10th Class', sectionId: 'mdgl-sec-a', sectionName: 'A Section' }] },
            { id: Math.random().toString(), isOpen: false, staffDetails: { staffId: 'GHMSTAFF09', staffName: 'Krishna S' }, accessClasses: [] }
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
                        <div className='head-col col width-40'>
                            <IonLabel >Staff Name</IonLabel>
                        </div>
                        <div className='head-col col width-60'>
                            <IonLabel>Access Classes</IonLabel>
                        </div>
                    </div>
                    <div className='access-table-fixed'>
                        <div className='row'>
                            <div className='col width-40'>
                                <IonLabel >Staff Name</IonLabel>
                            </div>
                            <div className='col width-60'>
                                <div className='drop-down-access g_full_width disabled-drop-access'>
                                    <IonLabel>*</IonLabel>
                                    <IonIcon icon={isOpenStudentCard ? caretUpOutline : caretDownOutline}></IonIcon>
                                </div>
                            </div>
                        </div>
                        {accessTableData.map((staff: any) => (<div key={staff.id} className='row'>
                            <div className='col width-40'>
                                <IonLabel >{staff.staffDetails.staffName}</IonLabel>
                            </div>
                            <div className='col width-60'>
                                <div className='drop-down-access g_full_width enabled-drop-access'>
                                    <IonLabel>{"<Select Classes>"}</IonLabel>
                                    <IonIcon icon={isOpenStudentCard ? caretUpOutline : caretDownOutline}></IonIcon>
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccessControl