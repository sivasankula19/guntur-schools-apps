import React, { useEffect, useRef, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'
import { IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption, IonText, isPlatform, } from '@ionic/react';
import { analyticsOutline, appsSharp, arrowBackOutline, caretDownOutline, caretUpOutline, checkmarkCircleOutline, chevronBackOutline, chevronForwardOutline, closeCircleOutline, listSharp, printSharp, removeOutline, saveOutline } from 'ionicons/icons';
import { useLocation, useNavigate } from 'react-router';
import { classListDummy, getDatesForMonth, searchStudentsData, sectionListDummy, transformListToGrid } from '../../common/utility';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import GCustomItemSelect from '../../components/GCustomItemSelect';

function AttendanceByStudent() {
    const [viewMode, setViewMode] = useState('list');
    const [searchResult, setSearchResult] = useState<any>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>({
        "itemName": "Narra Dev Qumar",
        "itemId": "GHMS00020",
        "itemDescription": ''
    });
    const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
    const [isOpenMonthYearCard, setIsOpenMonthYearCard] = useState<boolean>(false);
    const todayDate = new Date();
    const [currentMY, setCurrentMY] = useState<any>({ month: todayDate.getMonth() + 1, year: todayDate.getFullYear() });
    const [attendanceDate, setAttendanceDate] = useState<any>([]);
    const [breadCrumbState, setBreadCrumbState] = useState<any>([]);
    const [gridAttendance, setGridAttendance] = useState<any>([]);
    const navigate = useNavigate();
    const studentsDisplayRef = useRef<any>();
    const monthYearDetailsRef = useRef<any>();
    const containerRef = useRef<any>(null);
    const [yearCalculatedData, setYearCalculatedData] = useState<number[]>([]);
    const [filterValues, setFilterValue] = useState({
        classId: '',
        sectionId: '',
    });
    const location = useLocation();

    useEffect(() => {
        if (location.state.classId && location.state.sectionId) {
            setFilterValue({ classId: location.state.classId, sectionId: location.state.sectionId });
        }
        if (location.state.redirectFromName) {
            const breadCrumbDummy = [{ bName: 'Home', path: '/dashboard' },
            { bName: location.state.redirectFromName, path: location.state.redirectFrom, state: {} },
            { bName: 'Student Attendance', path: '/' }];
            setBreadCrumbState(breadCrumbDummy);
        }
    }, [location.state])

    const todayFormate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;

    useEffect(() => {
        const currentYear = todayDate.getFullYear();
        const currentMonth = todayDate.getMonth();
        let calculatedYears: number[] = [currentYear]
        if (currentMonth >= 5) {
            calculatedYears.push(currentYear + 1);
        }
        if (currentMonth <= 5) {
            calculatedYears.unshift(currentYear - 1);
        }
        setYearCalculatedData(calculatedYears)
        setSearchResult(searchStudentsData);
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

    const handleBack = () => {
        if (location.state.redirectFrom) {
            navigate(location.state.redirectFrom, { state: {} });
        }
    }

    const handleSave = () => {
        // save api
    }

    const handleMonthYearSelect = (data: any, isMonth: boolean) => {
        setCurrentMY({ month: isMonth ? data.monthId : currentMY.month, year: isMonth ? currentMY.year : data })
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

    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

    const handleChange = (e: any) => {
        setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className='attendance_sa'>
            <div className='g_flex g-space-between g-align-center bread_toggle_container'>
                <GBreadCrumbs data={breadCrumbState}></GBreadCrumbs>
                <div className='g_flex g-align-center'>
                    <IonIcon
                        onClick={() => {
                            setViewMode('list');
                        }}
                        className={`list-view-icon ${viewMode === 'list' ? 'selected' : ''}`}
                        icon={listSharp}
                    ></IonIcon>
                    <IonIcon
                        onClick={() => {
                            setViewMode('grid');
                        }}
                        className={`grid-view-icon ${viewMode === 'grid' ? 'selected' : ''} m-bottom-0`}
                        icon={appsSharp}
                    ></IonIcon>
                </div>
            </div>
            <div className='p-h-10 position-relative'>
                <div className='back-save-icons g-align-center m-top-10'>
                    <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                    <div className='g_flex width-80 g-space-between'>
                        <div style={{ width: '47%' }}>
                            <GCustomSelectDrop options={classDummyData} name='classId'
                                value={filterValues.classId} label="Select Class"
                                handleOnChange={handleChange} classNames='custom-select' />
                        </div>
                        <div style={{ width: '47%' }}>
                            <GCustomSelectDrop options={sectionDummyData} name='sectionId'
                                value={filterValues.sectionId} label="Select Section"
                                handleOnChange={handleChange} classNames='custom-select' />
                        </div>
                    </div>
                    <IonIcon onClick={handleSave} icon={saveOutline}></IonIcon>
                </div>
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
                                <IonIcon icon={isOpenStudentCard ? caretUpOutline : caretDownOutline}></IonIcon>
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
                <IonCard className='custom-att-card'>
                    <IonCardContent className='padding-0'>
                        <div className='back-save-icons g-align-center'>
                            <IonIcon icon={chevronBackOutline}></IonIcon>
                            <div className='g_flex p-h-10 username-holder' ref={monthYearDetailsRef}>
                                <IonLabel>
                                    {calendarMonths[currentMY.month - 1].monthFull} {currentMY.year}
                                </IonLabel>
                            </div>
                            <IonIcon icon={chevronForwardOutline}></IonIcon>
                        </div>
                    </IonCardContent>
                </IonCard>
                <GCustomItemSelect itemData={searchResult.map((i: any) => ({ itemName: i.studentName, itemId: i.regNumber, itemDescription: i.className + i.sectionName }))}
                    isOpen={isOpenMonthYearCard}
                    setIsOpen={setIsOpenMonthYearCard}
                    isPlain={true}
                    parentItemDetailsRef={monthYearDetailsRef}
                ><div className='g_flex' >
                        <div className='g_half_width g_txt_center g_full_height'>
                            <div className='g_full_height month-date-dis  o-flow-y'>
                                {calendarMonths.map((m, mIndex) => (<div onClick={() => handleMonthYearSelect(m, true)} className={`height-px-40 month-year-item ${currentMY.month - 1 === mIndex ? 'selected-month-year' : ''}`} key={mIndex}>{m.monthFull}</div>))}
                            </div>
                        </div>
                        <div className='g_half_width g_txt_center'>
                            <div className='g_full_height month-date-dis  o-flow-y'>
                                {yearCalculatedData.map((y, yIndex) => (<div onClick={() => handleMonthYearSelect(y, false)} className={`height-px-40 month-year-item ${currentMY.year === y ? 'selected-month-year' : ''}`} key={yIndex}>{y}</div>))}
                            </div>
                        </div>
                    </div></GCustomItemSelect>
            </div>
            <div className='p-h-10 attendance-edit-controller'>
                {viewMode === 'list' ? (
                    <>
                        <IonCard className="custom-attendance-card">
                            <IonCardContent className="g_flex g-space-around g-align-center custom-card-attendance-container">
                                {['Date', 'Day', 'AM', 'PM'].map((iView) => (
                                    <IonText key={iView} className="calendar_label_view row-item-quarter">
                                        {iView}
                                    </IonText>
                                ))}
                            </IonCardContent>
                        </IonCard>
                        <div className="attendance_container_items-edit" ref={containerRef}>
                            {attendanceDate && attendanceDate.map((item: any, index: number) => (
                                <IonItem className={`attendance_ion_item ${item.isSchoolHoliday ? 'danger' : ''} ${item.date === todayFormate ? 'special_today_item' : ''}`} key={index}>
                                    <IonText className="row-item-quarter large_text">{item.currentDay}</IonText>
                                    <IonText className="row-item-quarter">{item.dayShort}</IonText>
                                    <div className='row-item-quarter p-h-10 g_flex g-justify-center g-align-center'>
                                        <IonSelect
                                            style={{ border: '1px solid', borderRadius: '8px', borderColor: '#1D7AF5' }}
                                            className="custom-select"
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
                                    <div className='row-item-quarter p-h-10'>
                                        <IonSelect
                                            style={{ border: '1px solid', borderRadius: '8px', borderColor: '#1D7AF5' }}
                                            className="custom-select"
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
                        <IonCard className="custom-attendance-card">
                            <IonCardContent className="g_flex g-align-center custom-card-content-day-view">
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
                                    className="custom-attendance-card2"
                                >
                                    <IonCardContent className="g_flex g-align-center custom-card-content-day-view2">
                                        {gridItem.map((dayItem: any, subIndex: number) => (
                                            <IonItem
                                                key={`dayItem--${Math.random()}`}
                                                className={`day_list_map update_ion_item ion-text-center ${dayItem == null
                                                    ? 'empty_item_day'
                                                    : dayItem?.isSchoolHoliday
                                                        ? 'holiday_day_calendar'
                                                        : dayItem?.attendanceMarked == 0
                                                            ? 'non-taken-attendance'
                                                            : 'default-attendance-taken'
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
                <IonCardContent className="custom-card-attendance-container g_flex">
                    <IonItem className="summery_text_show">
                        <IonText className="summery_ion_text">WD = 9</IonText>
                    </IonItem>
                    <IonItem className="summery_text_show">
                        <IonText className="summery_ion_text">P = 8</IonText>
                    </IonItem>
                    <IonItem className="summery_text_show">
                        <IonText className="summery_ion_text">A = 1</IonText>
                    </IonItem>
                    <div className="g_flex g-space-around g-align-center summery_icons_container">
                        <IonIcon icon={printSharp}></IonIcon>
                        <IonIcon icon={analyticsOutline}></IonIcon>
                    </div>
                </IonCardContent>
            </IonCard>
        </div>
    )
}

export default AttendanceByStudent