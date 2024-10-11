import React, { useEffect, useRef, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'
import { IonButton, IonCard, IonCardContent, IonLabel, IonText } from '@ionic/react';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { classListDummy, sectionListDummy } from '../../common/utility';
import GCustomToggle from '../../components/GCustomToggle';

function AppConfigurations() {
    const [filterValues, setFilterValue] = useState({
        classId: '',
        sectionId: '',
    });
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Configurations', path: '/app-configurations' }];
    const [defaultApply, setDefaultApply] = useState(false);
    const [moduleAccessList, setModuleAccessList] = useState<any>([])
    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));
    const parentContainerRef = useRef<any>();

    const handleChangeSelect = (e: any) => {
        setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleItemChange = (moduleItem: any, e: any, key: string) => {
        setModuleAccessList((prev: any) => prev.map((prevItem: any) => {
            if (prevItem.moduleId === moduleItem.moduleId) {
                return ({ ...prevItem, [key]: e.target.value })
            } else{
                return prevItem
            }
        }));
    }

    const handleToggleChange = (event: any) => {
        setDefaultApply(event.detail.checked);
    };

    const modulesList = [
        { moduleName: 'Attendance', moduleId: 'attendance', classId: '', sectionId: '' },
        { moduleName: 'Home Work', moduleId: 'homeWork', classId: '', sectionId: '' },
        { moduleName: 'Time Table', moduleId: 'timeTable', classId: '', sectionId: '' },
        { moduleName: 'Exam Schedule', moduleId: 'examSchedule', classId: '', sectionId: '' },
        { moduleName: 'Subjects', moduleId: 'subjects', classId: '', sectionId: '' },
        { moduleName: 'Progress Card', moduleId: 'progressCard', classId: '', sectionId: '' },
    ]

    useEffect(() => {
        setModuleAccessList(modulesList);
    }, [])

    const handleAddDefault = () => {}

    return (
        <div className='g_full_height'>
            <GBreadCrumbs data={breadCrumbsValue} />
            <div className='p-h-16 config-page-con'>
                <IonText><p>Would you like default <b>Class Section</b> for Below Modules?</p></IonText>
                    <IonLabel>Default Apply</IonLabel>
                <div className="g_flex g-space-between select-container">
                    <div className='width-50 m-r8-t12'>
                        <GCustomSelectDrop options={classDummyData} name='classId'
                            value={filterValues.classId} label="Select Class"
                            handleOnChange={handleChangeSelect} classNames='custom-select' />
                    </div>
                    <div className='width-50 m-l8-t12'>
                        <GCustomSelectDrop options={sectionDummyData} name='sectionId'
                            value={filterValues.sectionId} label="Select Section"
                            handleOnChange={handleChangeSelect} classNames='custom-select' />
                    </div>
                </div>
                <div className='m-top-10'>
                <IonButton className='font-16 br-ion-12 g_txt_cap' fill="outline" expand="block" onClick={handleAddDefault}>Apply For All</IonButton>
                </div>
                <IonCard className='m-v-10'>
                    <IonCardContent>
                    <div className='list-modules-scroll'>
                    <div className="g_flex">
                        <div
                            ref={parentContainerRef}
                            style={{
                                width: `30%`,
                                borderRight: '1px solid',
                            }}
                        >
                            <div
                                style={{ minHeight: '60px', borderBottom: '1px solid', }}
                                className="g_txt_center g_flex g-align-center g-justify-center marks_column_header"
                            >
                                {'Module Name'}
                            </div>
                            {moduleAccessList.map((moduleItem: any) => (
                                <div
                                    key={moduleItem.moduleId}
                                    style={{ minHeight: '60px', lineHeight: '2rem', borderBottom: '1px solid', }}
                                    className="g_txt_center g_flex g-align-center g-justify-center p-h-4"
                                >
                                    <div className='g_text_ellipses g_full_width' style={{ lineHeight: '2rem' }}>
                                        {moduleItem.moduleName}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="horizontal_marks_container g_flex g-flex-direction-clm">
                            <div className="g_flex">
                                {["Classes", "Sections"].map((listAcc: any, index: number) => (
                                    <div
                                        key={listAcc}
                                        style={{
                                            minWidth: `140px`,
                                            width: `${(parentContainerRef?.current?.offsetWidth) * 1.3}px`,
                                            borderRight:
                                                index !== 2 - 1 ? '1px solid' : 'none',
                                            height: '60px',
                                            borderBottom: '1px solid',
                                        }}
                                        className="g_txt_center g_flex g-align-center g-justify-center marks_column_header p-h-4"
                                    >
                                        <div style={{ lineHeight: '2rem' }} className='g_text_ellipses g_full_width'>{listAcc}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="g_flex">
                                {["Classes", "Sections"].map((listAccM: any, index: number) => (
                                    <div
                                        key={listAccM}
                                        style={{
                                            minWidth: `140px`,
                                            width: `${(parentContainerRef?.current?.offsetWidth) * 1.3}px`,
                                            borderRight:
                                                index !== 2 - 1 ? '1px solid' : 'none',
                                        }}
                                    >
                                        {moduleAccessList.map((moduleItem: any) => (
                                            <div
                                                key={`${Math.random().toString() + moduleItem.moduleId}`}
                                                style={{
                                                    minHeight: '60px', padding: '8px', maxHeight: '60px',
                                                    borderBottom: '1px solid',
                                                }}
                                                className="g_txt_center g_flex g-align-center g-justify-center"
                                            >
                                                {listAccM === 'Classes' ? <><GCustomSelectDrop options={classDummyData} name='classId'
                                                    value={moduleItem.classId} label="Select Class"
                                                    handleOnChange={(e: any) => handleItemChange(moduleItem, e, 'classId')} classNames='custom-select' /></> : <>
                                                    <GCustomSelectDrop options={sectionDummyData} name='classId'
                                                        value={moduleItem.sectionId} label="Select Class"
                                                        handleOnChange={(e: any) => handleItemChange(moduleItem, e, 'sectionId')} classNames='custom-select' /></>}

                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                    </IonCardContent>
                </IonCard>
                
            </div>
        </div>
    )
}

export default AppConfigurations