import React, { useState ,useEffect} from 'react'
import { classListDummy, examSchedulesData, formatDate, sectionListDummy ,fiterDropdownValues} from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonLabel, IonText } from '@ionic/react';
import { calendarOutline, checkmarkCircleOutline, pencilOutline } from 'ionicons/icons';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomToggle from '../../components/GCustomToggle';
import GCustomInput from '../../components/GCustomInput';
import GDatePicker from '../../components/GDatePicker';

function ExamScheduleSA() {
  const [currentSelected, setCurrentSelected] = useState(null);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  const [formValue, setFormValue] = useState<any>({
    examName: '',
    startDate: '',
    subjectsList: [

    ]
  })
  const [isAddExamModal, setIsAddExamModal] = useState(false);
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Exam Schedules', path: '/exam-schedules' }];
  const examScheduleJson = examSchedulesData;
  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));
  let todayDate = new Date()
  todayDate.setHours(12,0,0);

  const subjectsSampleData = [{
    subjectId: 'GH-Sub-10/1',
    subjectName: 'Telugu',
    date: '2024-06-19T19:03:51.500Z',
    slot: "PM",
  },
  {
    subjectId: 'GH-Sub-10/2',
    subjectName: 'English',
    date: '2024-06-20T19:03:51.500Z',
    slot: "PM",
  },
  {
    subjectId: 'GH-Sub-10/3',
    subjectName: 'Hind',
    date: '2024-06-21T19:03:51.500Z',
    slot: "PM",
  },
  {
    subjectId: 'GH-Sub-10/4',
    subjectName: 'Mathematics',
    date: '2024-06-22T19:03:51.500Z',
    slot: "PM",
  },
  {
    subjectId: 'GH-Sub-10/5',
    subjectName: 'Science',
    date: '2024-06-23T19:03:51.500Z',
    slot: "PM",
  },
  {
    subjectId: 'GH-Sub-10/6',
    subjectName: 'Social',
    date: '2024-06-24T19:03:51.500Z',
    slot: "PM",
  }]

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleAdd = () => {
    setFormValue((prev: any) => ({ ...prev, examName:'', subjectsList: subjectsSampleData.map(s => ({ subjectId: s.subjectId, subjectName: s.subjectName, slot: 'AM', date: '' })) }));
    setIsAddExamModal(true);
  }

  const handleViewMoreExam = (id: any) => {
    setCurrentSelected(currentSelected === id ? null : id)
  }

  const handleModelClose = () => {
    setIsAddExamModal(false);
  }

  const handleSubmit = () => {

  }

  const handleInput = (e: any) => {
    setFormValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSlotToggleChange = (e: any) => {
    const subjectsDummy = [...formValue.subjectsList];
    const updatedSubjectDummy = subjectsDummy.map(subjectD => {
      if (subjectD.subjectId === e.target.name) {
        return { ...subjectD, slot: e.target.checked ? 'AM' : 'PM' }
      } else {
        return subjectD
      }
    });
    setFormValue((prev: any) => ({ ...prev, subjectsList: updatedSubjectDummy }))
  }

  useEffect(()=>{
  const filterDropdownValue=fiterDropdownValues.find(item=>item.moduleName=="ExamSchedules");
    if(filterDropdownValue){
      setFilterValue(filterDropdownValue)
  }
  },[])
  
  const handleEditExam = (item:any) => {
    setFormValue((prev: any) => ({ ...prev,
      examName: item.examName,
      startDate: '',
      subjectsList: subjectsSampleData.map(s => ({ subjectId: s.subjectId, subjectName: s.subjectName, slot: 'AM', date: '' })) }));
    setIsAddExamModal(true);
  }

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className="g_flex g-space-between select-container p-h-16 m-top-16">
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
                  <a onClick={()=>handleEditExam(item)}>Edit</a>
                </div>
              </div>
              <div className="g_flex g-space-between g_full_width m-top-12 g-align-center">
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
                  <a onClick={() => handleViewMoreExam(item.id)}>{currentSelected === item.id ? 'View Less' : 'View More'}</a>
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
                    item.subjects.map((subjectItem: any, indexVal: number) => (
                      <div className='row row_body g_flex' key={`sub-row-${indexVal}`}>
                        {[{ name: 'subjectName', id: 'Subject' }, { name: 'date', id: 'Date' }, { name: 'slot', id: 'Slot' },].map((row_item, indx) => (<div className={`cell ${indx == 1 ? 'bordered_cell' : ''}`} style={{ width: `${100 / 3}%` }} key={`row ${indx}-${indexVal}`}>
                          {row_item.id === "Date" ? <>
                            {formatDate(subjectItem[row_item.name])}
                          </> : <>{subjectItem[row_item.name]}</>}
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
          <GCustomInput name={'examName'} value={formValue.examName} onInput={handleInput} label={'Exam Name'} placeholder={'Exam Name'} />
          <GDatePicker
            onDateChange={(date) => console.log('Selected Date:', date)}
            label="Pick a Date"
            placeholder="Date"
            classNames="m-bottom-10"
            initialDate={todayDate.toISOString()}
            value={formValue.startDate}
          />
          {
            formValue.subjectsList?.map((subject: any) => (<div key={subject.subjectId} className='g_flex g-align-center m-bottom-10'>
              <GCustomSelectDrop options={[{id:subject.subjectId, label:subject.subjectName}]} name='classId'
                value={subject.subjectId} label="Select Class"
                handleOnChange={handleChange} classNames='custom-select m-r-10 width-50' />
              <GDatePicker
            onDateChange={(date) => console.log('Selected Date:', date)}
            label="Pick a Date"
            placeholder="Date"
            classNames="m-bottom-10"
            initialDate={todayDate.toISOString()}
          />
              <GCustomToggle name={subject.subjectId} onTxt='AM' offTxt='PM' checked={subject.slot === 'AM'} onHandleChange={handleSlotToggleChange} />
            </div>))
          }
        </div>
      </CustomizedModal>
    </div>
  )
}

export default ExamScheduleSA