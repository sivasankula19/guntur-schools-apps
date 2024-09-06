import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonIcon, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { checkmarkCircleOutline, saveOutline } from 'ionicons/icons';
import { classListDummy, classSubjects, examinationListDummy, sectionListDummy, studentDummyData } from '../../common/utility';
import CustomSelectDrop from '../../components/CustomSelectDrop';

function ProgressCardSubjectAdd() {
    const [filterValues, setFilterValue] = useState({
        classId: '',
        sectionId: '',
        subjectId: '',
        examinationId: ''
    });
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Subject Progress Card', path: '/progress-card' },];

    const studentsListForClass = studentDummyData;
    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));
    const subjectsDummyData = classSubjects.map(i => ({ id: i.subjectCode, label: i.subjectName }));
    const examinationDummyData = examinationListDummy.map(i => ({ id: i.examid, label: i.examName }));

    const handleChange = (e: any) => {
        setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className='g_full_height'>
            <GBreadCrumbs data={breadCrumbsValue} />
            <div className='p-h-10 progress-hold'>
                <div className='g_flex g_space_btwn m-top-12 '>
                    <div className='m-right-6 width-50'>
                        <CustomSelectDrop options={classDummyData} name='classId'
                            value={filterValues.classId} label="Select Class"
                            handleOnChange={handleChange} classNames='custom-select' />
                    </div>
                    <div className='m-left-6 width-50'>
                        <CustomSelectDrop options={sectionDummyData} name='sectionId'
                            value={filterValues.sectionId} label="Select Section"
                            handleOnChange={handleChange} classNames='custom-select' />
                    </div>
                </div>
                <div className='g_flex g_space_btwn m-top-10 '>
                    <div className='m-right-6 width-50'>
                        <CustomSelectDrop options={examinationDummyData} name='examinationId'
                            value={filterValues.examinationId} label="Examination"
                            handleOnChange={handleChange} classNames='custom-select' />
                    </div>
                    <div className='m-left-6 width-50'>
                        <CustomSelectDrop options={subjectsDummyData} name='subjectId'
                            value={filterValues.subjectId} label="Subject"
                            handleOnChange={handleChange} classNames='custom-select' />
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
                                        <input placeholder='Accrued Marks' />
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