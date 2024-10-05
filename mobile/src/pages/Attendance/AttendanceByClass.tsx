import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'
import { IonButton, IonCard, IonCardContent, IonIcon, IonText } from '@ionic/react';
import { caretBackOutline, caretForwardOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { classListDummy, getDatesForMonth, sectionListDummy, transformListToGrid, fiterDropdownValues } from '../../common/utility';
import { useLocation, useNavigate } from 'react-router';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { useDispatch, useSelector } from 'react-redux';
import { setWarnToast } from '../../redux/reducers/toastMessageSlice';

function AttendanceByClass() {
    const todayDate = new Date();
    const todayFormate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
    const [currentMY, setCurrentMY] = useState<any>({ month: todayDate.getMonth() + 1, year: todayDate.getFullYear() });
    const [gridAttendance, setGridAttendance] = useState<any>([]);
    const currentRole = useSelector((state: any) => state.auth.role);
    const [selectedDate, setSelectedDate] = useState<string>(todayFormate);
    const accessModules = useSelector((state: any) => state.accessControl.accessModules) || [];
    const rootAccess = useSelector((state: any) => state.accessControl.rootAccess);
    const [unableProceed, setUnableProceed] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const [filterValues, setFilterValue] = useState({
        classId: '',
        sectionId: '',
    });
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Class Attendance', path: '/attendance-by-class' },];

    const navigate = useNavigate();

    useEffect(() => {
        setGridAttendance(transformListToGrid(getDatesForMonth(currentMY.month, currentMY.year)))
        return () => { }
    }, [currentMY]);

    useEffect(() => {
        if (location.state) {
            setFilterValue(({ classId: location.state.classId || '', sectionId: location.state.sectionId || '' }))
            setSelectedDate(location.state.selectedDate);
        } else {
            const filterDropdownSet = fiterDropdownValues.find(item => item.moduleName == "Attendance");
            if (filterDropdownSet) {
                setFilterValue(filterDropdownSet)
            }
        }
    }, [location.state]);

    const handleDateSelected = (day: string) => {
        if (day && compareDates(day, todayFormate)) {
            setSelectedDate(day);
        }
    }

    const handleTodaySelected = () => {
        setCurrentMY({ month: todayDate.getMonth() + 1, year: todayDate.getFullYear() })
        setSelectedDate(todayFormate)
    }

    const compareDates = (day1: string, day2: string): boolean => {
        if (day1 && day2) {
            const date1 = new Date(day1);
            const date2 = new Date(day2);
            return date1 <= date2
        }
        return false
    }

    const handleDateChange = (action: string) => {
        setCurrentMY((prevState: any) => {
            let newMonth = prevState.month;
            let newYear = prevState.year;
            switch (action) {
                case 'previousMonth':
                    newMonth = newMonth === 1 ? 12 : newMonth - 1;
                    newYear = newMonth === 12 ? newYear - 1 : newYear;
                    break;
                case 'nextMonth':
                    newMonth = newMonth === 12 ? 1 : newMonth + 1;
                    newYear = newMonth === 1 ? newYear + 1 : newYear;
                    break;
                case 'previousYear':
                    newYear -= 1;
                    break;
                case 'nextYear':
                    newYear += 1;
                    break;
                default:
                    break;
            }
            return { month: newMonth, year: newYear };
        });
    };

    const handleContinue = () => {
        const urlEncoded = encodeURIComponent(`${filterValues.classId}&&${filterValues.sectionId}&&${selectedDate}`)
        navigate('/attendance-by-class/' + urlEncoded)
    }

    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

    const handleChangeSelect = (e: any) => {
        setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (currentRole === 'Teacher') {
            if (!rootAccess) {
                if (filterValues.classId && filterValues.sectionId) {
                    const attendanceModuleItem = accessModules.find((att: any) => att?.moduleId === 'attendance');
                    if ((attendanceModuleItem.accessibleClasses.find((accItem: any) => accItem.classId === filterValues.classId && accItem.sectionId === filterValues.sectionId)) || attendanceModuleItem?.accessibleClasses[0] === '*') {
                        setUnableProceed(false);
                    } else {
                        setUnableProceed(true);
                        dispatch(setWarnToast('Unable to proceed!, Please get permission from Admin'));
                    }
                }
            }
        }
    }, [filterValues]);

    // flag is to get the date, month and year from the selected date.
    const getSelectedDateParse = (flag: number): number => {
        const [month, date, year] = selectedDate.split('/');
        return flag === 1 ? Number(date) : flag === 2 ? Number(month) : flag === 3 ? Number(year) : 0
    }

    const handleRaiseRequest = () => {
        // pass the exact state here!...
        navigate('/raise-request',{state:{}})
    }

    return (
        <div className='attendance_sa'>
            <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
            <div className='p-h-10 scroll-class-att'>
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
                        <IonIcon onClick={() => handleDateChange('previousYear')} icon={caretBackOutline}></IonIcon>
                        <IonIcon onClick={() => handleDateChange('previousMonth')} icon={chevronBackOutline}></IonIcon>
                        <div className="month_year_view g_flex g-space-evenly g-align-center ">
                            <IonText className="month_year">{months[currentMY.month - 1]}</IonText>
                            <IonText className="month_year">{currentMY.year}</IonText>
                        </div>
                        <IonIcon onClick={() => handleDateChange('nextMonth')} icon={chevronForwardOutline}></IonIcon>
                        <IonIcon onClick={() => handleDateChange('nextYear')} icon={caretForwardOutline}></IonIcon>
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
                                        <div id={dayItem?.date} onClick={() => handleDateSelected(dayItem?.date)}
                                            className={`day-item-display ${compareDates(dayItem?.date, todayFormate) ? ' enabled-date-field' : ' disabled-date-field'} ${dayItem?.date === selectedDate ? ' today-selected' : ''}${dayItem?.attendanceMarked >= 1 ? ' att-marked' : ''}${dayItem?.isSchoolHoliday ? ' scl-holiday' : ''}`}>
                                            <IonText className="ion_text_day_view">{dayItem?.currentDay}</IonText>
                                        </div>
                                    </div>))}
                                </div>))}
                            </div>
                            <div className='m-v-10 p-h-16'>
                                <div className='g_flex g-space-between'>
                                    <div>
                                        <IonText><p>Selected Date</p></IonText>
                                    </div>
                                    <div className="width-50 g_flex g-space-evenly g-align-center ">
                                        <IonText className="month_year">{getSelectedDateParse(1)}</IonText>
                                        <IonText className="month_year">{months[getSelectedDateParse(2) - 1]}</IonText>
                                        <IonText className="month_year">{getSelectedDateParse(3)}</IonText>
                                    </div>
                                </div>
                            </div>
                            <div className='m-v-10 p-h-16 g_txt_center'>
                                <IonText><a onClick={handleTodaySelected}>Today</a></IonText>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </div>
                <div className='continue-btn'>
                    <IonButton onClick={handleContinue} fill="outline" expand="block" disabled={(filterValues.classId === '' || filterValues.sectionId === '')}>
                        Continue With {`${classDummyData.find(i => i.id === filterValues.classId)?.label || ''} - ${sectionDummyData.find(i => i.id === filterValues.sectionId)?.label || ''}`}
                    </IonButton>
                </div>
                {unableProceed && (<div className='g_txt_center add-request-btn'>
                    <IonButton className='br-ion-8' onClick={handleRaiseRequest} fill="outline" > Raise Request! </IonButton>
                </div>)}
            </div>
        </div>
    )
}

export default AttendanceByClass