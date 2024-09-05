import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonIcon, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { checkmarkCircleOutline, saveOutline } from 'ionicons/icons';
import { studentDummyData } from '../../common/utility';

function ProgressCardSubjectAdd() {
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Subject Progress Card', path: '/progress-card' },];

    const studentsListForClass = studentDummyData

    return (
        <div className='g_full_height'>
            <GBreadCrumbs data={breadCrumbsValue} />
            <div className='p-h-10 progress-hold'>
                <div className='g_flex g_space_btwn m-top-12 '>
                    <div className='m-right-6 width-50'>
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
                    <div className='m-left-6 width-50'>
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
                <div className='g_flex g_space_btwn m-top-10 '>
                    <div className='m-right-6 width-50'>
                        <IonSelect
                            className="custome_select"
                            label="Examination"
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
                    <div className='m-left-6 width-50'>
                        <IonSelect
                            className="custome_select"
                            label="Subject"
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
                <div>
                    <div className='progress-default-marks'>
                        <div className='g_flex g_align_cntr'>
                            <IonLabel>{"Default Pass Marks : "}</IonLabel>
                            <input placeholder='Marks' />
                        </div>
                        <IonIcon icon={saveOutline}></IonIcon>
                    </div>
                </div>
                <div className='progress-add-con'>
                    {studentsListForClass.map((item) => (
                        <IonCard key={item.id} className={`student_card animation-none custom-class-card`}>
                            <IonCardContent className="card_content">
                                <div className="g_flex g_space_btwn g_align_cntr">
                                    <div className="g_flex width-50 g_align_cntr">
                                        <div className="profile_item">
                                            <img
                                                className="prifile_image"
                                                src={item.profileImage}
                                                alt="profile"
                                            />
                                        </div>
                                        <div className="title_designation">
                                            <h2 className="title_name g_text_ellipses">{item.firstName} {item.lastName}</h2>
                                            <p>
                                                <span>{`${item.class} ${item.section}`}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='marks-progress-icon'>
                                       <input placeholder='Accrued Marks'/>
                                       <IonLabel>Status</IonLabel>
                                       <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                                    </div>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProgressCardSubjectAdd