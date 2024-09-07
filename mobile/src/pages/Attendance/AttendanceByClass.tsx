import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'
import { IonButton, IonCard, IonCardContent, IonIcon, IonItem, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { caretBackOutline, caretForwardOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { classListDummy, getDatesForMonth, sectionListDummy, transformListToGrid } from '../../common/utility';
import { useLocation, useNavigate } from 'react-router';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';

function AttendanceByClass() {
    const todayDate = new Date();
    const todayFormate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
    const [currentMY, setCurrentMY] = useState<any>({ month: todayDate.getMonth() + 1, year: todayDate.getFullYear() });
    const [gridAttendance, setGridAttendance] = useState<any>([]);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedSection, setSelectedSection] = useState<string>('');
    const [classList, setClassList] = useState<any>([]);
    const [sectionList, setSectionList] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState<string>(todayFormate);
    const location = useLocation();
    const [filterValues, setFilterValue] = useState({
        classId: '',
        sectionId: '',
    });

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Class Attendance', path: '/attendance-by-class' },];

    const navigate = useNavigate();

    useEffect(() => {
        setClassList(classListDummy);
        setSectionList(sectionListDummy);
    }, [])

    useEffect(() => {
        setGridAttendance(transformListToGrid(getDatesForMonth(currentMY.month, currentMY.year)))
        return () => { }
    }, [currentMY]);

    useEffect(() => {

    }, [selectedClass, selectedSection]);

    useEffect(() => {
        if (location.state) {
            setSelectedClass(location.state.classId);
            setSelectedSection(location.state.sectionId);
            setSelectedDate(location.state.selectedDate);
        }
    }, [location.state])

    const handleDateSelected = (day: string) => {
        setSelectedDate(day)
    }

    const handleChange = (e: any) => {
        if (e.target.id === 'class_select') {
            setSelectedClass(e.detail.value);
        } else if (e.target.id === 'section_select') {
            setSelectedSection(e.detail.value);
        }
    }

    const handleContinue = () => {
        const urlEncoded = encodeURIComponent(`${selectedClass}&&${selectedSection}&&${selectedDate}`)
        navigate('/attendance-by-class/' + urlEncoded)
    }


    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

    const handleChangeSelect = (e: any) => {
        setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }


    return (
        <div className='attendance_sa'>
            <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
            <div className='p-h-10 scroll-class-att'>
                <IonCard className="custom-month-select">
                    <IonCardContent className="custom-card-attendance-container">
                        <div className="g_flex g-space-between icons_holder_attendance p-h-10">
                            <IonIcon icon={chevronBackOutline}></IonIcon>
                            <div className="month_year_view g_flex g-space-evenly g-align-center">
                                <IonText className="month_year">{todayDate.getDate()}</IonText>
                                <IonText className="month_year">{todayDate.getMonth()}</IonText>
                                <IonText className="month_year">{todayDate.getFullYear()}</IonText>
                            </div>
                            <IonIcon icon={chevronForwardOutline}></IonIcon>
                        </div>
                    </IonCardContent>
                </IonCard>
                <IonText>
                    <p className='g-font-18'>Add / Edit Attendance For</p>
                </IonText>
                <div className="g_flex g-space-between select-container">
                    <div style={{ width: '47%' }}>
                        <GCustomSelectDrop options={classDummyData} name='classId'
                            value={filterValues.classId} label="Select Class"
                            handleOnChange={handleChangeSelect} classNames='custom-select' />
                    </div>
                    <div style={{ width: '47%' }}>
                        <GCustomSelectDrop options={sectionDummyData} name='sectionId'
                            value={filterValues.sectionId} label="Select Section"
                            handleOnChange={handleChangeSelect} classNames='custom-select' />
                    </div>
                </div>
                <div className='calendar-view-cls'>
                    <div className='g_flex g-space-around g-align-center'>
                        <IonIcon icon={caretBackOutline}></IonIcon>
                        <div className="month_year_view g_flex g-space-evenly g-align-center ">
                            <IonText className="month_year">6th</IonText>
                            <IonText className="month_year">March</IonText>
                            <IonText className="month_year">2024</IonText>
                        </div>
                        <IonIcon icon={caretForwardOutline}></IonIcon>
                    </div>
                    <IonCard>
                        <IonCardContent>
                            <div className='g_flex day-list'>
                                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                                    (dayName) => (
                                        <div
                                            key={`grids-${dayName}`}
                                            className="day-list-map ion-text-center"
                                        >
                                            <IonText className="ion_text_day_view">{dayName}</IonText>
                                        </div>
                                    )
                                )}
                            </div>
                            <div>
                                {gridAttendance.map((gridItem: any, index: number) => (<div
                                    key={`grids-data-${index}`} className="g_flex row-item">
                                    {gridItem.map((dayItem: any, subIndex: number) => (<div
                                        key={`days-${subIndex}`} className="day-list-map g_flex g-align-center g-justify-center">
                                        <div id={dayItem?.date} onClick={() => handleDateSelected(dayItem.date)} className={`day-item-display${dayItem?.date === selectedDate ? ' today-selected' : ''}${dayItem?.attendanceMarked >= 1 ? ' att-marked' : ''}${dayItem?.isSchoolHoliday ? ' scl-holiday' : ''}`}>
                                            <IonText className="ion_text_day_view">{dayItem?.currentDay}</IonText>
                                        </div>
                                    </div>))}
                                </div>))}
                            </div>
                        </IonCardContent>
                    </IonCard>
                </div>
                <div className='continue-btn'>
                    <IonButton onClick={handleContinue} fill="outline" expand="block" disabled={(selectedClass === '' || selectedSection === '')}>Continue With {`${selectedClass} - ${selectedSection}`} </IonButton>
                </div>
            </div>
        </div>
    )
}

export default AttendanceByClass