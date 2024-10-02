import React, { useEffect, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonList,
  IonRange,
  IonText,
} from '@ionic/react';
import { classListDummy, classSubjects, sectionListDummy,fiterDropdownValues} from '../../common/utility';
import ProgressBar from '../../components/ProgressBar';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import GCustomInput from '../../components/GCustomInput';

function SubjectsSA() {
  const [data, setData] = useState(classSubjects);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSec, setSelectedSec] = useState<string>('');
  const [editableItem, setEditableItem] = useState<any>(null);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  const formInitialVal = {
    subjectName: '',
    subjectStaffName: '',
    percentCovered: 24,
    subjectDefaultMarks: '100'
  }
  const [formValue, setFormValue] = useState(formInitialVal)
  const breadCrumbsValue = [
    { bName: 'Home', path: '/dashboard' },
    { bName: 'Subjects', path: '/subjects' },
  ];

  const handleAddSubject = () => {
    setIsModelOpen(true);
  }

  const handleFormEdit = (item: any) => {
    setEditableItem(item)
    setFormValue({
      subjectName: item.subjectName,
      subjectDefaultMarks: item.marks || 100,
      subjectStaffName: item.staffName,
      percentCovered: item.percentCovered
    })
    setIsModelOpen(true)
  }

  const handleSubmit = () => {
    if (editableItem) {
      // edit api for editableItem
    } else {
      // add for New
    }
    console.log('form', formValue);

    // success call
    if (editableItem) {
      setEditableItem(null);
    }
    setFormValue(formInitialVal);
  }

  const handleModelClose = () => {
    setIsModelOpen(false);
    if (editableItem) {
      setEditableItem(null);
    }
    setFormValue(formInitialVal);
  }

  const handleInput = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(()=>{
  const filterDropdownValue=fiterDropdownValues.find(item=>item.moduleName=="Subjects");
    if(filterDropdownValue){
      setFilterValue(filterDropdownValue)
    }
  },[])
  
  return (
    <div className="subjects">
      <div className="g_flex g-space-between g-align-center bread_toggle_container">
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      </div>
      <div className="p-h-10 g_flex g-space-between select-container">
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
      <div className='m-10'>
        <IonButton className='font-16 br-ion-12 g_txt_cap' fill="outline" expand="block" onClick={handleAddSubject}>Add Subject</IonButton>
      </div>
      <div className="subjects_cls_container-edit">
        <IonList>
          {data.map((item) => (
            <IonCard key={item.subjectCode}>
              <IonCardContent className="subject_item_card_content">
                <IonItem>
                  <div className="g_flex g-space-between g_full_width">
                    <IonText className="subject_text_name">
                      <h3>{item.subjectName}</h3>
                    </IonText>
                    <div className="progress_container g_flex g-align-center">
                      <ProgressBar filled={item.percentCovered}></ProgressBar>
                    </div>
                    <IonText onClick={() => handleFormEdit(item)}>Edit</IonText>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="g_flex g-space-between g_full_width">
                    <IonText>
                      <a>{item.subjectTeacher}</a>
                    </IonText>
                    <IonText>
                      <a>Time Table</a>
                    </IonText>
                    <IonText>
                      <a>Marks</a>
                    </IonText>
                    <IonText>
                      <p>
                        {item.class} - {item.section}
                      </p>
                    </IonText>
                  </div>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </div>
      <CustomizedModal
        title={`Add Subject For ${selectedClass} - ${selectedSec}`}
        isOpen={isModelOpen}
        onClose={handleModelClose}
        onSave={handleSubmit}
      >
        <div>
          <GCustomInput name={'subjectName'} value={formValue.subjectName} onChange={handleInput} label={'Subject Name'} placeholder={'Subject Name'} />
          <GCustomInput name={'subjectStaffName'} value={formValue.subjectStaffName} onChange={handleInput} label={'Subject Staff Name'} placeholder={'Subject Staff Name'} />
          <div className='field m-bottom-10 m-r-18'>
            <IonRange value={formValue.percentCovered} pin={true} onIonChange={handleInput} name='percentCovered'>
              <div slot='label'>
                Percentage Covered:
              </div>
            </IonRange>
          </div>
          <GCustomInput name={'subjectDefaultMarks'} value={formValue.subjectDefaultMarks} onChange={handleInput} label={'Subject Marks Default'} placeholder={'Ex. 100'} />
        </div>
      </CustomizedModal>
    </div>
  );
}

export default SubjectsSA;
