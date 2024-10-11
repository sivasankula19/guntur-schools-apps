import React, { useEffect, useRef, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonIcon, IonSearchbar, IonText } from '@ionic/react';
import { classListDummy, classSubjects, formatDate, homeWorkDataBe, sectionListDummy,fiterDropdownValues } from '../../common/utility';
import { attachOutline, banOutline, expandOutline } from 'ionicons/icons';
import SwapableImages from './SwapableImges';
import { useSelector } from 'react-redux';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import GCustomInput from '../../components/GCustomInput';
import GImagUpload from '../../components/GImagUpload';
import GDatePicker from '../../components/GDatePicker';
const HomeWork: React.FC = () => {

  const [homeWorkData, setHomeWorkData] = useState<any>([])
  const isStudent = useSelector((state: any) => state.auth.role) === 'Student'
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [homework, setHomework] = useState<any>({ title: '', desc: '', subject: '', image: '', due_date: '' });
  const formInitialVal = {
    homeWorkName: '',
    description: '',
    subjectName: '',
    images: '',
    dueDate: '',
  }
  const [formValue, setFormValue] = useState(formInitialVal);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Home Work', path: '/home-work' }]

  useEffect(() => {
    setHomeWorkData(homeWorkDataBe.map((i) => ({ ...i, isFullView: false })))

  const filterDropdownValue=fiterDropdownValues.find(item=>item.moduleName=="HomeWork");
  if(filterDropdownValue){
    setFilterValue(filterDropdownValue)
  }
  }, [])


  const handleFullView = (id: string) => {
    setHomeWorkData((prev: any) => (prev.map((prvItem: any) => {
      if (prvItem.id === id)
        return { ...prvItem, isFullView: !prvItem.isFullView }
      return ({ ...prvItem, isFullView: false })
    })))
  }

  const openPopover = (e: any) => {
    setPopoverOpen(true);
  };

  const onSave = () => {
    console.log("clicked on save", homework)
  }


  const handleInput = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const subjectsDummyData = classSubjects.map(i => ({ id: i.subjectCode, label: i.subjectName }))
  const handleChangeSelect = () => { }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleDateChange = (date:string) => {
    setFormValue(prev=>({...prev, dueDate:date}));
  }

  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate()+1);
  tomorrowDate.setHours(12,0,0)

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue} />
      {!isStudent && (
        <div className='g_flex g-space-between p-16'>
          <div className='m-right-6 width-50'>
            <GCustomSelectDrop options={classDummyData} name='classId'
              value={filterValues.classId} label="Select Class"
              handleOnChange={handleChange} classNames='custom-select' />
          </div>
          <div className='m-left-6 width-50'>
            <GCustomSelectDrop options={sectionDummyData} name='sectionId'
              value={filterValues.sectionId} label="Select Section"
              handleOnChange={handleChange} classNames='custom-select' />
          </div>
        </div>
      )}
      {!isStudent &&
        <div className='g_flex g-align-center g-justify-center '>
          <IonButton onClick={openPopover} className="add_homework br-ion-12 g_txt_cap">Add Home Work</IonButton>
        </div>}
      <div className='home_work p-h-16'>
        <IonSearchbar placeholder='Search subject or Task name'></IonSearchbar>
        <div className="g_flex g-space-between select-container">
          <div style={{ width: '47%' }}>
            <GCustomSelectDrop options={subjectsDummyData} name='classId'
              value={''} label="Select Subject"
              handleOnChange={handleChangeSelect} classNames='custom-select' />
          </div>
          <div style={{ width: '47%' }}>
            <input className='custom_homework_date' type='date' />
          </div>
        </div>
        <div className='home_work_container'>
          {homeWorkData.map((item: any) => (<IonCard key={item.id}>
            <IonCardContent>
              <div className='g_flex time_title'>
                <div className='home_task_title'>
                  <IonText>
                    <h2 className={`${!item.isFullView && 'two_lines_ellipsis'}`}>{item.taskName}</h2>
                  </IonText>
                </div>
                <div className='home_task_time'>
                  <IonText>
                    <span>{formatDate(new Date(item.taskTime), true)}</span>
                  </IonText>
                </div>
              </div>
              <div className='home_task_desc'>
                <IonText>
                  <p className={`${!item.isFullView && 'three_line_ellipse'}`}>{item.taskDesc}</p>
                </IonText>
              </div>
              {item.isFullView && (
                <div className='home_attachments'>
                  <div className='g_flex g-align-center g-space-between attach_icon_home'>
                    <div className='g_flex g-align-center'>
                      <IonIcon icon={attachOutline}></IonIcon>
                      <IonText>
                        <h4>Attachments</h4>
                      </IonText>
                    </div>
                    <IonIcon icon={expandOutline}></IonIcon>
                  </div>
                  {
                    item?.attachments?.length ? <>
                      <div>
                        <SwapableImages images={item.attachments}></SwapableImages>
                      </div>
                    </> : <>
                      <div className='no_attachments'>
                        <IonIcon icon={banOutline}></IonIcon>
                        <IonText>
                          <p> No Attachments !</p>
                        </IonText>
                      </div>
                    </>
                  }
                </div>
              )}
              <div className='g_flex g-space-between text_show_more'>
                <div>
                  <IonText>
                    <p>Subject Name</p>
                  </IonText>
                </div>
                <div>
                  <IonText>
                    <a onClick={() => handleFullView(item.id)}>{item.isFullView ? 'View Less' : 'View More'}</a>
                  </IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>))}
        </div>
      </div>
      <CustomizedModal
        title="Add Homework"
        isOpen={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        onSave={onSave}
        styles={{ height: 'auto', maxHeight: '50vh' }}
      >
        <div>
          <GCustomInput name={'homeWorkName'} value={formValue.homeWorkName} onInput={handleInput} label={'Home Work Title'} placeholder={'Ex. Algorithms'} />
          <GCustomInput name={'description'} value={formValue.description} onInput={handleInput} label={'Description'} placeholder={'Description'} />
          <GCustomInput name={'subjectName'} value={formValue.subjectName} onInput={handleInput} label={'Subject Name'} placeholder={'Subject Name'} />
          <GDatePicker
            onDateChange={handleDateChange}
            label="Pick a Date"
            placeholder="Date Of Birth"
            classNames="m-bottom-10"
            value={formValue.dueDate}
            initialDate={tomorrowDate.toISOString()}
          />
          {/* <GCustomInput name={'dueDate'} value={formValue.dueDate} onInput={handleInput} label={'Due Date'} placeholder={'01/01/2024'} /> */}
          <GImagUpload onFileChange={handleFileChange} multiple={true} label='Upload Image' classNames='m-bottom-10' />
        </div>
      </CustomizedModal>
    </div>
  );
};

export default HomeWork;
