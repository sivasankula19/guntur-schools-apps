import React, { useEffect, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { classSubjects } from '../../common/utility';
import ProgressBar from '../../components/ProgressBar';
import GCustomisedModal from '../../components/GCustomisedModal';

function SubjectsSA() {
  const [data, setData] = useState(classSubjects);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSec, setSelectedSec] = useState<string>('');
  const [editableItem, setEditableItem] = useState<any>(null);
  const formInitialVal = {
    subjectName:'',
    subjectStaffName:'',
    percentCovered: 24,
    subjectDefaultMarks:'100'
  }
  const [formValue, setFormValue] = useState(formInitialVal)
  const breadCrumbsValue = [
    { bName: 'Home', path: '/dashboard' },
    { bName: 'Subjects', path: '/subjects' },
  ];

  const handleAddSubject = () => {
    setIsModelOpen(true);
  }

  const handleFormEdit = (item:any) => {
    setEditableItem(item)
    setFormValue({
      subjectName:item.subjectName,
      subjectDefaultMarks:item.marks || 100,
      subjectStaffName: item.staffName,
      percentCovered: item.percentCovered
    })
    setIsModelOpen(true)
  }

  const handleSubmit = () => {
    if(editableItem){
      // edit api for editableItem
    } else {
      // add for New
    }
    console.log('form', formValue);

    // success call
    if(editableItem){
      setEditableItem(null);
    }
    setFormValue(formInitialVal);
  }

  const handleModelClose = () => {
    setIsModelOpen(false);
    if(editableItem){
      setEditableItem(null);
    }
    setFormValue(formInitialVal);
  }

  const handleInput = (e:any) => {
    setFormValue((prev)=>({...prev, [e.target.name]:e.target.value}))
  }

  return (
    <div className="subjects">
      <div className="g_flex g_space_btwn g_align_cntr bread_toggle_container">
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      </div>
      <div className="p-h-10 g_flex g_space_btwn select_conatainer">
        <div style={{ width: '47%' }}>
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
        <div style={{ width: '47%' }}>
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
      <div className='p-10'>
        <IonButton className='g_txt_cap font-16' fill="outline" expand="block" onClick={handleAddSubject}>Add Subject</IonButton>
      </div>
      <div className="subjects_cls_container-edit">
        <IonList>
          {data.map((item) => (
            <IonCard key={item.subjectCode}>
              <IonCardContent className="subject_item_card_content">
                <IonItem>
                  <div className="g_flex g_space_btwn g_full_width">
                    <IonText className="subject_text_name">
                      <h3>{item.subjectName}</h3>
                    </IonText>
                    <div className="progress_container g_flex g_align_cntr">
                      <ProgressBar filled={item.percentCovered}></ProgressBar>
                    </div>
                    <IonText onClick={()=>handleFormEdit(item)}>Edit</IonText>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="g_flex g_space_btwn g_full_width">
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
      <GCustomisedModal
        title={`Add Subject For ${selectedClass} - ${selectedSec}`}
        isOpen={isModelOpen}
        onClose={handleModelClose}
        onSave={handleSubmit}
      >
        <div>
          <div className='field m-bottom-10'>
            <IonInput value={formValue.subjectName} onIonChange={handleInput} name='subjectName' label="Subject Name" labelPlacement="floating" fill="outline" placeholder="Subject Name"></IonInput>
          </div>
          <div className='field m-bottom-10'>
            <IonInput value={formValue.subjectStaffName} onIonChange={handleInput} name='subjectStaffName' label="Subject Staff Name" labelPlacement="floating" fill="outline" placeholder="Subject Staff Name"></IonInput>
          </div>
          <div className='field m-bottom-10 m-r-18'>
          <IonRange value={formValue.percentCovered} pin={true} onIonChange={handleInput} name='percentCovered'>
            <div slot='label'>
              Percentage Covered:
            </div>
          </IonRange>
          </div>
          <div className='field m-bottom-10'>
            <IonInput value={formValue.subjectDefaultMarks} onIonChange={handleInput} name='subjectDefaultMarks' label="Subject Marks Default" labelPlacement="floating" fill="outline" placeholder="Ex. 100"></IonInput>
          </div>
        </div>
      </GCustomisedModal>
    </div>
  );
}

export default SubjectsSA;
