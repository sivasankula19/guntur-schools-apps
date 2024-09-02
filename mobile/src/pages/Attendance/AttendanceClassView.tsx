import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'
import { useNavigate, useParams } from 'react-router';
import { IonButton, IonCard, IonCardContent, IonIcon, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { arrowBackOutline, saveOutline } from 'ionicons/icons';
import { classStudentsDateAttendance } from '../../common/utility';

function AttendanceClassView() {

    const { routeInfo = '' } = useParams<{ routeInfo: string }>();
    const [classId, sectionId, selectedDate] = routeInfo.split('&&');
    const [breadCrumbState, setBreadCrumbState] = useState<any>([]);
    const [selectedSegment, setSelectedSegment] = useState('am');
    const [defaultState, setDefaultState] = useState('Y');
    const [isDisabled, setIsDisabled] = useState(false)
    const [classStudentAttendanceDate, setClassStudentAttendanceDate] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (classId && sectionId && selectedDate) {
            const breadCrumbDummy = [{ bName: 'Home', path: '/dashboard' },
            { bName: 'Class Attendance', path: '/attendance-by-class', state: { classId, sectionId, selectedDate } },
            { bName: `${classId} : ${sectionId}`, path: '/' }];
            setBreadCrumbState(breadCrumbDummy)
            // make api
            setClassStudentAttendanceDate(classStudentsDateAttendance)
        }
    }, [classId, sectionId]);

    const handleSegmentChange = (value: any) => {
        if (selectedSegment !== value) {
            setSelectedSegment(value);
        }
    };


    const handleChange = (e: any) => {
        setDefaultState(e.detail.value);
        setIsDisabled(false)
    }

    const handleApply = () => {
        // apply to all fields
        setIsDisabled(true)
    }

    const navigateToUser = (id: string) => {
        navigate(`/user/${id}`)
    }

    const handleSave = () => {
        // save api
    }

    const handleBack = () => {
        navigate('/attendance-by-class', { state: { classId, sectionId, selectedDate } })
    }

    const handleStatusStudent = (e: any) => {

    }

    return (
        <div className='attendance_sa'>
            <GBreadCrumbs data={breadCrumbState}></GBreadCrumbs>
            <div className='p-h-10 scroll-class-att'>
                <div className='back-save-icons m-top-10'>
                    <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                    <div className='custom-day-slot'>
                        <div className="custom-segment">
                            <button
                                className={`segment-button left ${selectedSegment === 'am' ? 'active' : ''
                                    }`}
                                onClick={() => handleSegmentChange('am')}
                            >
                                AM
                            </button>
                            <button
                                className={`segment-button right ${selectedSegment === 'pm' ? 'active' : ''
                                    }`}
                                onClick={() => handleSegmentChange('pm')}
                            >
                                PM
                            </button>
                        </div>
                    </div>
                    <IonIcon onClick={handleSave} icon={saveOutline}></IonIcon>
                </div>
                <div className='g_txt_center'>
                    <IonText>
                        <p className='font-12'>Attendance for {classId} / {sectionId} / {selectedDate}</p>
                    </IonText>
                </div>
                <div className='g_flex g_align_cntr'>
                    <div className='width-40'>
                        <IonLabel>
                            Default Apply
                        </IonLabel>
                    </div>
                    <div className='g_flex width-60 g_align_cntr g_space_btwn'>
                        <div style={{ width: '60%' }}>
                            <IonSelect
                                className="custome_select"
                                label="Default Status"
                                labelPlacement="floating"
                                fill="outline"
                                id='class_select'
                                interface="popover"
                                value={defaultState}
                                onIonChange={handleChange}
                            >
                                <IonSelectOption value={'Y'}>Present</IonSelectOption>
                                <IonSelectOption value={'N'}>Absent</IonSelectOption>
                            </IonSelect>
                        </div>
                        <div>
                            <IonButton className='br-ion-8' onClick={handleApply} fill="outline" expand="block" disabled={isDisabled}>Apply</IonButton>
                        </div>
                    </div>
                </div>
                <div className='cl-students-list'>
                    {
                        classStudentAttendanceDate.map((student: any) => (
                            <IonCard key={student.id} className="student_card">
                                <IonCardContent className="card_content">
                                    <div className="g_flex g_space_btwn g_align_cntr">
                                        <div className="g_flex first_container g_align_cntr">
                                            <div className="profile_item">
                                                <img
                                                    onClick={() => navigateToUser(student.id)}
                                                    className="prifile_image"
                                                    src={student.profileImage}
                                                    alt="profile"
                                                />
                                            </div>
                                            <div className="title_designation">
                                                <h2 onClick={() => navigateToUser(student.id)} className="title_name g_text_ellipses">{student.studentName}</h2>
                                                <div className="g_txt_start user_id ">
                                                    Id : <span className="user_id_data">{student.regNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='g_flex g_half_width'>
                                            <div style={{ width: '50%', paddingRight: '4px' }}>
                                                <IonSelect
                                                    className="custome_select"
                                                    label="Status"
                                                    labelPlacement="floating"
                                                    fill="outline"
                                                    id={`present${student.id}`}
                                                    interface="action-sheet"
                                                    value={student.am}
                                                    onIonChange={handleStatusStudent}
                                                >
                                                    <IonSelectOption value={''}>--</IonSelectOption>
                                                    <IonSelectOption value={'Y'}>Present</IonSelectOption>
                                                    <IonSelectOption value={'N'}>Absent</IonSelectOption>
                                                </IonSelect>
                                            </div>
                                            <div style={{ width: '50%', paddingLeft: '4px' }}>
                                                <IonSelect
                                                    className="custome_select"
                                                    label="Status"
                                                    labelPlacement="floating"
                                                    fill="outline"
                                                    id={`absent${student.id}`}
                                                    interface="action-sheet"
                                                    value={student.pm}
                                                    onIonChange={handleStatusStudent}
                                                >
                                                    <IonSelectOption value={''}>--</IonSelectOption>
                                                    <IonSelectOption value={'Y'}>Present</IonSelectOption>
                                                    <IonSelectOption value={'N'}>Absent</IonSelectOption>
                                                </IonSelect>
                                            </div>
                                        </div>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AttendanceClassView