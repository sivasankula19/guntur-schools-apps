import React, { useEffect, useRef, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonDatetime, IonDatetimeButton, IonFooter, IonHeader, IonIcon, IonModal, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
import { saveOutline } from 'ionicons/icons';
import { periodsListData } from '../../common/utility';

interface IClassItem {
    className: string,
    classId: string,
}

interface ISectionItem {
    sectionName: string,
    sectionId: string,
}

const TimeTableSA: React.FC = () => {
    const [classList, setClassList] = useState<IClassItem[]>([]);
    const [sectionList, setSectionList] = useState<ISectionItem[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedSection, setSelectedSection] = useState<string>('');
    const [fromTime, setFromTime] = useState<string>('08:00:00');
    const [toTime, setToTime] = useState<string>('09:00:00');
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Time Table', path: '/time-table' }];

    const fromModal = useRef<HTMLIonModalElement>(null);
    const toModal = useRef<HTMLIonModalElement>(null);

    useEffect(() => {
        const classListData: IClassItem[] = [
            {
                className: '10th Class',
                classId: 'mdgl_scl_10th',
            },
            {
                className: '9th Class',
                classId: 'mdgl_scl_9th',
            },
            {
                className: '8th Class',
                classId: 'mdgl_scl_8th',
            },
            {
                className: '7th Class',
                classId: 'mdgl_scl_7th',
            },
            {
                className: '6th Class',
                classId: 'mdgl_scl_6th',
            },
            {
                className: '5th Class',
                classId: 'mdgl_scl_5th',
            },
            {
                className: '4th Class',
                classId: 'mdgl_scl_4th',
            },
        ];
        const sectionListData: ISectionItem[] = [
            {
                sectionName: 'A Section',
                sectionId: 'mdgl_scl_sec_a',
            },
            {
                sectionName: 'B Section',
                sectionId: 'mdgl_scl_sec_b',
            },
            {
                sectionName: 'C Section',
                sectionId: 'mdgl_scl_sec_c',
            },
        ];
        setClassList(classListData);
        setSectionList(sectionListData);
    }, []);

    useEffect(() => {
        setSelectedClass(classList.length ? classList[0].classId || '' : '');
    }, [classList]);

    useEffect(() => {
        setSelectedSection(sectionList.length ? sectionList[0].sectionId || '' : '');
    }, [sectionList]);

    const periodsData = periodsListData;

    const handleUpdateCls = (cls: string) => {
        setSelectedClass(cls);
    };

    const handleUpdateSec = (sec: string) => {
        setSelectedSection(sec);
    };

    const handleAddClick = () => {
        console.log('From Time:', fromTime);
        console.log('To Time:', toTime);
    };

    return (
        <div className='time_table_sa'>
            <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
            <div className='table_scrollable'>
                <div className='m-h-12'>
                    <div className='scroll_container'>
                        {classList.map((cls: IClassItem) => (
                            <div
                                id={cls.classId}
                                onClick={() => handleUpdateCls(cls.classId)}
                                key={cls.classId}
                                className={`scroll_item ${cls.classId === selectedClass && 'selected'}`}
                            >
                                <IonText>
                                    <p>{cls.className}</p>
                                </IonText>
                            </div>
                        ))}
                    </div>
                    <div className='scroll_container'>
                        {sectionList.map((sec: ISectionItem) => (
                            <div
                                id={sec.sectionId}
                                onClick={() => handleUpdateSec(sec.sectionId)}
                                key={sec.sectionId}
                                className={`scroll_item ${sec.sectionId === selectedSection && 'selected'}`}
                            >
                                <IonText>
                                    <p>{sec.sectionName}</p>
                                </IonText>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='m-h-12'>
                    {selectedClass && selectedSection ? (
                        <>
                            <div className='g_flex g-align-center g-space-between'>
                                <IonText>
                                    <p className='font-16 color-app font-600'>
                                        Time Table For {selectedClass ? classList.find((i) => i.classId === selectedClass)?.className : ''}{' '}
                                        {selectedSection ? sectionList.find((i) => i.sectionId === selectedSection)?.sectionName : ''}
                                    </p>
                                </IonText>
                                <IonIcon className='save_icon' icon={saveOutline}></IonIcon>
                            </div>
                            <div className='table_view'>
                                <div className='g_flex'>
                                    <div className='time_container'>
                                        <div className='items_hold'>
                                            <div className='time_item'>Time / Day</div>
                                        </div>
                                        {periodsData.map((period: any) => (
                                            <div key={period.id} className='items_hold'>
                                                <div className='time_item'>
                                                    <IonText>
                                                        <p>{period.fromTime}</p>
                                                        <p>{period.toTime}</p>
                                                    </IonText>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='periods_container'>
                                        <div className='elements_holder'>
                                            <div className='scroll_view'>
                                                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day: string, index: number) => (
                                                    <div key={index + day} className='items_hold'>
                                                        <div className='scroll_item head_scroll_item'>{day}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            {periodsData.map((period: any, index: number) => (
                                                <div key={period.id + index} className='scroll_view'>
                                                    {period.periods.map((cur: any) => (
                                                        <div key={cur.id} className='items_hold'>
                                                            <div className='scroll_item'>
                                                                <IonSelect
                                                                    className='custom-select'
                                                                    label='Subject'
                                                                    labelPlacement='floating'
                                                                    fill='outline'
                                                                    interface='action-sheet'
                                                                >
                                                                    <IonSelectOption value='class-8'>Maths</IonSelectOption>
                                                                    <IonSelectOption value='class-9'>Science</IonSelectOption>
                                                                </IonSelect>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>Select Class & Section</>
                    )}
                </div>
            </div>
            <div className='add-time-block'>
                <div className='g_flex'>
                    <div className='g_flex'>
                        <IonDatetimeButton datetime='fromDatetime'></IonDatetimeButton>
                        <IonModal className='custom-date-time-modal period_time_modal' ref={fromModal} keepContentsMounted={true}>
                            <IonHeader>
                                <IonToolbar className='g_txt_center'>
                                    <IonText>
                                        <p>Period From Time</p>
                                    </IonText>
                                </IonToolbar>
                            </IonHeader>
                            <IonDatetime
                                id='fromDatetime'
                                presentation='time'
                                value={fromTime}
                                formatOptions={{
                                    time: {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    },
                                }}
                                onIonChange={(e) => setFromTime(e.detail.value as string)}
                            ></IonDatetime>
                            <IonFooter>
                                <IonToolbar>
                                    <IonButton
                                        expand='block'
                                        onClick={() => {
                                            fromModal.current?.dismiss();
                                        }}
                                    >
                                        OK
                                    </IonButton>
                                </IonToolbar>
                            </IonFooter>
                        </IonModal>
                    </div>
                    <div className='g_flex'>
                        <IonDatetimeButton datetime='toDatetime'></IonDatetimeButton>
                        <IonModal className='custom-date-time-modal period_time_modal' ref={toModal} keepContentsMounted={true}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonText>
                                        <p>Period To Time</p>
                                    </IonText>
                                </IonToolbar>
                            </IonHeader>
                            <IonDatetime
                                id='toDatetime'
                                presentation='time'
                                value={toTime}
                                formatOptions={{
                                    time: {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    },
                                }}
                                onIonChange={(e) => setToTime(e.detail.value as string)}
                            ></IonDatetime>
                            <IonFooter>
                                <IonToolbar>
                                    <IonButton
                                        expand='block'
                                        onClick={() => {
                                            toModal.current?.dismiss();
                                        }}
                                    >
                                        OK
                                    </IonButton>
                                </IonToolbar>
                            </IonFooter>
                        </IonModal>
                    </div>
                </div>
                <div>
                    <IonButton onClick={handleAddClick}>+ ADD</IonButton>
                </div>
            </div>
        </div>
    );
};

export default TimeTableSA;
