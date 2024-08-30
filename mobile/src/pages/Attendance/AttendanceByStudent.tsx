import React, { useEffect, useRef, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'
import { IonButton, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonPicker, IonSearchbar, IonSelect, IonSelectOption, IonText, isPlatform, } from '@ionic/react';
import { analyticsOutline, appsSharp, arrowBackOutline, caretDownOutline, checkmarkCircleOutline, chevronBackOutline, chevronForwardOutline, closeCircleOutline, listSharp, printSharp, removeOutline, saveOutline, searchOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';
import { getDatesForMonth, searchStudentsData, transformListToGrid } from '../../common/utility';

function AttendanceByStudent() {
    const [viewMode, setViewMode] = useState('list');
    const [searchResult, setSearchResult] = useState<any>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>({
        "id": 2,
        "studentName": "Siva Sankula",
        "regNumber": "GHMS00020",
        "className": "8th Class",
        "sectionName": "B Section"
    });
    const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
    const [isOpenMonthYearCard, setIsOpenMonthYearCard] = useState<boolean>(false);
    const todayDate = new Date();
    const [currentMY, setCurrentMY] = useState<any>({ month: todayDate.getMonth() + 1, year: todayDate.getFullYear() });
    const [attendanceDate, setAttendanceDate] = useState<any>([]);
    const [gridAttendance, setGridAttendance] = useState<any>([]);
    const navigate = useNavigate();
    const studentsDetailsRef = useRef<any>();
    const studentsDisplayRef = useRef<any>();
    const monthYearDetailsRef = useRef<any>();
    const monthYearDisplayRef = useRef<any>();
    const containerRef = useRef<any>(null);

    const todayFormate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;

    useEffect(() => {
        setSearchResult(searchStudentsData);
        window.addEventListener('click', handleScreenClick);
        return () => {
            window.removeEventListener('click', handleScreenClick)
        };
    }, []);

    useEffect(() => {

        if (viewMode === 'list') {
            setAttendanceDate(getDatesForMonth(currentMY.month, currentMY.year));
        } else {
            setGridAttendance(transformListToGrid(getDatesForMonth(currentMY.month, currentMY.year)))
        }
        const scrollTimeOut = setTimeout(() => {
            if (containerRef.current) {
                const scrollPosition = (todayDate.getDate() - 1) * (isPlatform('ios') ? 52 : 56);
                containerRef.current.scrollTo({
                    top: currentMY.month === todayDate.getMonth() + 1 && currentMY.year === todayDate.getFullYear() ? scrollPosition : 0,
                    behavior: 'smooth',
                });
            }
        }, 500);

        return () => {
            clearTimeout(scrollTimeOut)
        }
    }, [currentMY, viewMode]);


    const breadCrumbsValue = [
        { bName: 'Home', path: '/dashboard' },
        { bName: 'Student Attendance', path: '/attendance' },
    ];

    const handleBack = () => {
        // navigate('/attendance-by-class', { state: { classId, sectionId, selectedDate } })
    }

    const handleSave = () => {
        // save api
    }

    const handlePopOverClose = (e: any) => {
        if (e.target.id === 'student-list-select') {
            setIsOpenStudentCard(false);
        } else {
            setIsOpenMonthYearCard(false);
        }
    }

    const handleScreenClick = (e: any) => {
        setIsOpenStudentCard((studentsDetailsRef && studentsDetailsRef.current?.contains(e.target)) || (studentsDisplayRef && studentsDisplayRef?.current?.contains(e.target)));
        setIsOpenMonthYearCard((monthYearDetailsRef && monthYearDetailsRef.current?.contains(e.target)) || (monthYearDisplayRef && monthYearDisplayRef.current?.contains(e.target)));
    }

    const handleStudentChange = (student: any) => {
        setSelectedStudent(student)
    }

    const handlePopOverSaveClose = (e:any) => {
        if(e.target?.id === 'save-student-picker') {
        } else {
            // to do -actions according to save
        }
    }

    const handleMonthYearSelect = (data:any, isMonth:boolean) => {
        setCurrentMY({month: isMonth ? data.monthId : currentMY.month, year: isMonth ? currentMY.year : data})
    }

    const calendarMonths = [
        { month: 'Jan', monthId: '1', monthFull: 'JANUARY' },
        { month: 'Feb', monthId: '2', monthFull: 'FEBRUARY' },
        { month: 'Mar', monthId: '3', monthFull: 'MARCH' },
        { month: 'Apr', monthId: '4', monthFull: 'APRIL' },
        { month: 'May', monthId: '5', monthFull: 'MAY' },
        { month: 'Jun', monthId: '6', monthFull: 'JUNE' },
        { month: 'Jul', monthId: '7', monthFull: 'JULY' },
        { month: 'Aug', monthId: '8', monthFull: 'AUGUST' },
        { month: 'Sep', monthId: '9', monthFull: 'SEPTEMBER' },
        { month: 'Oct', monthId: '10', monthFull: 'OCTOBER' },
        { month: 'Nov', monthId: '11', monthFull: 'NOVEMBER' },
        { month: 'Dec', monthId: '12', monthFull: 'DECEMBER' }
      ];
      

    return (
        <div className='attendance_sa'>
            <div className='g_flex g_space_btwn g_align_cntr bread_toggle_container'>
                <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
                <div>
                    <IonIcon
                        onClick={() => {
                            setViewMode('list');
                        }}
                        className={`list_viwe_icon ${viewMode === 'list' ? 'selected' : ''}`}
                        icon={listSharp}
                    ></IonIcon>
                    <IonIcon
                        onClick={() => {
                            setViewMode('grid');
                        }}
                        className={`grdi_view_icon ${viewMode === 'grid' ? 'selected' : ''}`}
                        icon={appsSharp}
                    ></IonIcon>
                </div>
            </div>
            <div className='p-h-10 position-relative'>
                <div className='back-save-icons g_align_cntr m-top-10'>
                    <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                    <div className='g_flex width-80 g_space_btwn'>
                        <div style={{ width: '47%' }}>
                            <IonSelect
                                className="custome_select"
                                label="Select Class"
                                labelPlacement="floating"
                                fill="outline"
                                interface="popover"
                            >
                                <IonSelectOption value="class-8">Class 8</IonSelectOption>
                                <IonSelectOption value="class-9">Class 9</IonSelectOption>
                                <IonSelectOption value="class-10">Class 10</IonSelectOption>
                                <IonSelectOption value="class-0">Class 0</IonSelectOption>
                            </IonSelect>
                        </div>
                        <div style={{ width: '47%' }}>
                            <IonSelect
                                className="custome_select"
                                label="Select Section"
                                labelPlacement="floating"
                                fill="outline"
                                interface="popover"
                            >
                                <IonSelectOption value="A-Section">
                                    A Section
                                </IonSelectOption>
                                <IonSelectOption value="B-Section">
                                    B Section
                                </IonSelectOption>
                                <IonSelectOption value="C-Section">
                                    C section
                                </IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <IonIcon onClick={handleSave} icon={saveOutline}></IonIcon>
                </div>
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
                                        <IonSearchbar placeholder='Search A Student Name / Id' />
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
                <IonCard className='custom-att-card'>
                    <IonCardContent className='padding-0'>
                        <div className='back-save-icons g_align_cntr'>
                            <IonIcon icon={chevronBackOutline}></IonIcon>
                            <div className='g_flex p-h-10 username-holder' ref={monthYearDetailsRef}>
                                <IonLabel>
                                    {calendarMonths[currentMY.month-1].monthFull} {currentMY.year}
                                </IonLabel>
                            </div>
                            <IonIcon icon={chevronForwardOutline}></IonIcon>
                        </div>
                    </IonCardContent>
                </IonCard>
                {
                    isOpenMonthYearCard && (
                        <IonCard ref={monthYearDisplayRef} className='student-picker'>
                            <IonCardContent>
                                <div className='g_flex' >
                                    <div className='g_half_width g_txt_center g_full_height'>
                                        <div className='g_full_height month-date-dis  o-flow-y'>
                                            {calendarMonths.map((m, mIndex) => (<div onClick={()=>handleMonthYearSelect(m, true)} className={`height-px-40 month-year-item ${currentMY.month-1 === mIndex ? 'selected-month-year' : ''}`} key={mIndex}>{m.monthFull}</div>))}
                                        </div>
                                    </div>
                                    <div className='g_half_width g_txt_center'>
                                        <div className='g_full_height month-date-dis  o-flow-y'>
                                            {[2024, 2023, 2022, 2021, 2020, 2019].map((y, yIndex) => (<div onClick={()=>handleMonthYearSelect(y,false)} className={`height-px-40 month-year-item ${currentMY.year === y ? 'selected-month-year' : ''}`} key={yIndex}>{y}</div>))}
                                        </div>
                                    </div>
                                </div>
                                <div className='m-top-10'>
                                    <IonButton id='save-student-picker' fill="outline" expand="block" onClick={handlePopOverClose}>Close</IonButton>
                                </div>
                            </IonCardContent>
                        </IonCard>)
                }
            </div>
            <div className='p-h-10 attendance-edit-controller'>
                {viewMode === 'list' ? (
                    <>
                        <IonCard className="custome_attendance_card">
                            <IonCardContent className="g_flex g_space_around g_align_cntr custome__card_attendance_container">
                                {['Date', 'Day', 'AM', 'PM'].map((iView) => (
                                    <IonText key={iView} className="calendar_label_view row_item_quater">
                                        {iView}
                                    </IonText>
                                ))}
                            </IonCardContent>
                        </IonCard>
                        <div className="attendance_container_items-edit" ref={containerRef}>
                            {attendanceDate && attendanceDate.map((item: any, index: number) => (
                                <IonItem className={`attendance_ion_item ${item.isSchoolHoliday ? 'danger' : ''} ${item.date === todayFormate ? 'special_today_item' : ''}`} key={index}>
                                    <IonText className="row_item_quater large_text">{item.currentDay}</IonText>
                                    <IonText className="row_item_quater">{item.dayShort}</IonText>
                                    <div className='row_item_quater p-h-10 g_flex g_jstfy_content_cntr g_align_cntr'>
                                        <IonSelect
                                            style={{ border: '1px solid', borderRadius: '8px', borderColor: '#1D7AF5' }}
                                            className="custome_select"
                                            id='class_select'
                                            interface="popover"
                                            value={"--"}
                                            onIonChange={() => { }}
                                        >

                                            <IonSelectOption value={"--"}>--</IonSelectOption>
                                            <IonSelectOption value={"present"}>Present</IonSelectOption>
                                            <IonSelectOption value={"absent"}>Absent</IonSelectOption>
                                        </IonSelect>
                                    </div>
                                    <div className='row_item_quater p-h-10'>
                                        <IonSelect
                                            style={{ border: '1px solid', borderRadius: '8px', borderColor: '#1D7AF5' }}
                                            className="custome_select"
                                            id='class_select'
                                            interface="popover"
                                            value={"--"}
                                            onIonChange={() => { }}
                                        >

                                            <IonSelectOption value={"--"}>--</IonSelectOption>
                                            <IonSelectOption value={"present"}>Present</IonSelectOption>
                                            <IonSelectOption value={"absent"}>Absent</IonSelectOption>
                                        </IonSelect>
                                    </div>
                                </IonItem>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <IonCard className="custome_attendance_card">
                            <IonCardContent className="g_flex g_align_cntr custome_card_content_day_view">
                                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                                    (dayName) => (
                                        <IonItem
                                            key={`grids-${dayName}`}
                                            className="day_list_map ion-text-center"
                                        >
                                            <IonText className="ion_text_day_view">{dayName}</IonText>
                                        </IonItem>
                                    )
                                )}
                            </IonCardContent>
                        </IonCard>
                        <div className="attendance_container_items-edit">
                            {gridAttendance.map((gridItem: any, index: number) => (
                                <IonCard
                                    key={`grid-${index}`}
                                    className="custome_attendance_card2"
                                >
                                    <IonCardContent className="g_flex g_align_cntr custome_card_content_day_view2">
                                        {gridItem.map((dayItem: any, subIndex: number) => (
                                            <IonItem
                                                key={`dayItem--${Math.random()}`}
                                                className={`day_list_map update_ion_item ion-text-center ${dayItem == null
                                                    ? 'empty_item_day'
                                                    : dayItem?.isSchoolHoliday
                                                        ? 'holiday_day_calendar'
                                                        : dayItem?.attendanceMarked == 0
                                                            ? 'non_taked_atendance'
                                                            : 'defaut_attendance_taken'
                                                    }`}
                                            >
                                                <div className="chip_item_grid">
                                                    <IonText className="ion_text_day_view">
                                                        {dayItem?.currentDay}
                                                    </IonText>
                                                    {dayItem !== null && !dayItem?.isSchoolHoliday ? (
                                                        <>
                                                            <IonIcon
                                                                className={`${dayItem?.attendanceMarked >= 1
                                                                    ? dayItem?.am
                                                                        ? 'success'
                                                                        : 'absent_recorded'
                                                                    : 'attendance_not_recorded'
                                                                    }`}
                                                                icon={
                                                                    dayItem?.attendanceMarked >= 1
                                                                        ? dayItem?.am
                                                                            ? checkmarkCircleOutline
                                                                            : closeCircleOutline
                                                                        : removeOutline
                                                                }
                                                            ></IonIcon>
                                                            <IonIcon
                                                                className={`${dayItem?.attendanceMarked == 2
                                                                    ? dayItem?.pm
                                                                        ? 'success'
                                                                        : 'absent_recorded'
                                                                    : 'attendance_not_recorded'
                                                                    }`}
                                                                icon={
                                                                    dayItem?.attendanceMarked == 2
                                                                        ? dayItem?.pm
                                                                            ? checkmarkCircleOutline
                                                                            : closeCircleOutline
                                                                        : removeOutline
                                                                }
                                                            ></IonIcon>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div></div>
                                                        </>
                                                    )}
                                                    {dayItem?.isSchoolHoliday && (
                                                        <>
                                                            <IonText className="g_small_text">Holiday</IonText>
                                                        </>
                                                    )}
                                                </div>
                                            </IonItem>
                                        ))}
                                    </IonCardContent>
                                </IonCard>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <IonCard className="summery_attendance_show">
                <IonCardContent className="custome__card_attendance_container g_flex">
                    <IonItem className="summery_text_show">
                        <IonText className="summery_ion_text">WD = 9</IonText>
                    </IonItem>
                    <IonItem className="summery_text_show">
                        <IonText className="summery_ion_text">P = 8</IonText>
                    </IonItem>
                    <IonItem className="summery_text_show">
                        <IonText className="summery_ion_text">A = 1</IonText>
                    </IonItem>
                    <div className="g_flex g_space_around g_align_cntr summery_icons_container">
                        <IonIcon icon={printSharp}></IonIcon>
                        <IonIcon icon={analyticsOutline}></IonIcon>
                    </div>
                </IonCardContent>
            </IonCard>
        </div>
    )
}

export default AttendanceByStudent