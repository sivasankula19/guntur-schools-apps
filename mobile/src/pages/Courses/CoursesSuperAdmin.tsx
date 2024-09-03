import { IonButton, IonIcon, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import { banSharp, removeCircleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'

export const CoursesSuperAdmin = () => {

    const [coursesModuleData, setCoursesModuleData] = useState<any>([]);

    useEffect(() => {
        setCoursesModuleData([
            {
                courseName: '6th Class',
                medium: '2',
                id: '6thCls',
            },
            {
                courseName: '7th Class',
                medium: '2',
                id: '7thCls',
            },
            {
                courseName: '8th Class',
                medium: '2',
                id: '8thCls',
            },
            {
                courseName: '9th Class',
                medium: '2',
                id: '9thCls',
            }, {
                courseName: '10th Class',
                medium: '2',
                id: '10thCls',
            },
            {
                courseName: 'Polytech Course',
                medium: '0',
                id: '10thCls',
            }
        ])
    }, [])

    return (
        <div className='g_full_height'>
            <div className='add_course_sa'>
                <IonText className='add_section'>
                    <p>Add Course</p>
                </IonText>
                <input placeholder='Please Enter Course Name' />
                <div className='g_flex'>
                    <div className='width-80'>
                        <IonSelect
                            className="custome_select"
                            multiple={true}
                            label="Select Medium"
                            labelPlacement="floating"
                            fill="outline"
                            interface="popover">
                            <IonSelectOption value="Telugu">Telugu Medium</IonSelectOption>
                            <IonSelectOption value="English">English Medium</IonSelectOption>
                        </IonSelect></div>
                    <div>
                        <IonButton fill="outline">+ Add</IonButton>
                    </div>
                </div>

            </div>
            <div className='view_course_sa'>
                <IonText className='view_section'>
                    <p>Courses Offered</p>
                </IonText>
                {coursesModuleData.length ? <>
                    {coursesModuleData.map((course: any) => (<div key={Math.random().toLocaleString()} className="g_flex g_space_btwn course_sa_item">
                        <div className="g_flex height-px-40 g_align_cntr course_title_txt ">
                            <IonText>
                                <p>{course.courseName}</p>
                            </IonText>
                        </div>
                        <div className='g_flex height-px-40 g_align_cntr course_medium_txt'><IonText>
                                <p>TM</p>
                            </IonText></div>
                        <div className='g_flex height-px-40 g_align_cntr course_medium_txt'><IonText>
                                <p>EM</p>
                            </IonText></div>
                        <div className="g_flex height-px-40 g_align_cntr remove_about">
                            <IonIcon icon={removeCircleOutline}></IonIcon>
                        </div>
                    </div>))}
                </> : <>
                    <div className='g_txt_center'>
                        <IonIcon className='no_courses_icon' icon={banSharp}></IonIcon>
                        <IonText>
                            <h1>No Courses Yet!</h1>
                        </IonText>
                    </div>
                </>}
            </div>
        </div>
    )
}
