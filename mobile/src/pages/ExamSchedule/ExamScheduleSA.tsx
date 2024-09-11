import React, { useState } from 'react'
import { classListDummy, examSchedulesData, formatDate, sectionListDummy } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { calendarOutline, checkmarkCircleOutline, pencilOutline, starOutline } from 'ionicons/icons';
import CustomizedModal from '../../components/GCustomizedModal';

function ExamScheduleSA() {
  const [examsList, setExamsList] = useState<any[]>([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  const [formValue, setFormValue] = useState({
    examName:'',
    startData:'',
    subjectsList:[
      {subjectId:'', subjectName:'', dateOfExam:'', slot:''}
    ]
  })
  const [isAddExamModal, setIsAddExamModal] = useState(false);
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Exam Schedules', path: '/exam-schedules' }];
  const examScheduleJson = examSchedulesData;
  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleAdd = () => {
    setIsAddExamModal(true);
  }

  const handleViewMoreExam = (id:any) => {
    setCurrentSelected(currentSelected === id ? null : id)
  }

  const handleModelClose = () => {
    setIsAddExamModal(false);
  }

  const handleSubmit = () => {

  }
  
  const handleInput = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className="g_flex g-space-between select-container p-h-16">
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
      <div className='p-h-10'>
        <IonButton className='br-ion-12 m-top-12 g_txt_cap font-16 add-employee-student' onClick={handleAdd} fill="outline" expand="block">Add Exam </IonButton>
      </div>
      <div className='exams-schedule-sa p-h-16'>
        {examScheduleJson.map((item) => (
          <IonCard key={item.id}>
            <IonCardContent className="exam-card-sa">
              <div className="g_flex g-space-between g_full_width">
                <IonText className="heading-text-exam">
                  <h3 className='g_text_ellipses'>{item.examName}</h3>
                </IonText>
                <div className='g_flex g-align-center g-space-between status-edit-exam'>
                  <div className='g_flex g-align-center'>
                    <IonLabel>Status</IonLabel>
                    {/* add condition and add corresponding icon!. */}
                    <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                  </div>
                  <IonIcon icon={pencilOutline}></IonIcon>
                </div>
              </div>
              <div className="g_flex g-space-between g_full_width m-top-12">
                <div className='g_flex g-align-center'>
                  <IonLabel className='m-right-8'>Dates</IonLabel>
                  <div className='conducts-on-date'>
                   <IonText><p>11/09/2024</p></IonText>
                   <b> - </b>
                   <IonText><p>20/09/2024</p></IonText> 
                   <IonIcon icon={calendarOutline}></IonIcon>
                    </div>
                </div>
                <IonText className='view-more-exam'>
                  <a onClick={()=>handleViewMoreExam(item.id)}>{currentSelected === item.id ? 'View Less' : 'View More'}</a>
                </IonText>
              </div>
              {currentSelected === item.id && (<div className='m-top-20'>
                <div className='exm-title-view'>
                  <IonText>
                    <p>Subjects Exam Dates</p>
                  </IonText>
                </div>
                <div className='unit_test_table'>
                    <div className='row row_head g_flex'>
                      {["Subject", "Date", "Slot"].map((row_item, indx) => (<div className={`cell ${indx == 1 ? 'bordered_cell' : ''}`} style={{ width: `${100 / 3}%` }} key={`row ${indx}`}>
                        {row_item}
                      </div>))}
                    </div>
                    {
                      item.subjects.map((subjectItem:any, indexVal:number) => (
                        <div className='row row_body g_flex' key={`sub-row-${indexVal}`}>
                          {[{name:'subjectName', id:'Subject'},{name:'date', id:'Date'},{name:'slot', id:'Slot'},].map((row_item, indx) => (<div className={`cell ${indx == 1 ? 'bordered_cell' : ''}`} style={{ width: `${100 / 3}%` }} key={`row ${indx}-${indexVal}`}>
                            {row_item.id === "Date" ? <>
                            {formatDate(subjectItem[row_item.name])}
                            </> : <>{subjectItem[row_item.name]}</> }
                          </div>))}
                        </div>
                      ))
                    }
                  </div>
              </div>)}
            </IonCardContent>
          </IonCard>
        ))}
      </div>
      
      <CustomizedModal
        title={`Add Exam For ${'10th Class'} ${'B Sec'}`}
        isOpen={isAddExamModal}
        onClose={handleModelClose}
        onSave={handleSubmit}
      >
        <div>
          <div className='field m-bottom-10'>
            <IonInput value={formValue.examName} onIonChange={handleInput} name='className' label="Class Name" labelPlacement="floating" fill="outline" placeholder="Subject Name"></IonInput>
          </div>
          <div className='field m-bottom-10'>
            <IonInput value={formValue.startData} onIonChange={handleInput} name='classIconValue' label="Class Icon Value" labelPlacement="floating" fill="outline" placeholder="Ex. 10"></IonInput>
          </div>
          
        </div>
      </CustomizedModal>
    </div>
  )
}

export default ExamScheduleSA