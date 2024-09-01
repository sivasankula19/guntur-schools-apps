import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import GCustomisedModal from '../../components/GCustomisedModal';
import { addCircleOutline, closeCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';

function SchoolClasses() {
  const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<number>(999);
  const [currentSelectedSec, setCurrentSelectedSec] = useState<string>('')
  const formInitialVal = {
    className: '',
    classStaffName: '',
    linkedSections: [{ sectionId: 'mdgl-sec-a', staffId: 'mdgl-staff-00019' }, { sectionId: 'mdgl-sec-b', staffId: 'mdgl-staff-00044' }],
    classIconValue: ''
  }
  const [formValue, setFormValue] = useState(formInitialVal);
  const navigate = useNavigate();

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Classes', path: '/school-classes' }];

  const handleAdd = () => {
    setIsAddClassModal(true);
  }

  const handleModelClose = () => {
    setIsAddClassModal(false);
    setFormValue(formInitialVal);
  }

  const handleSubmit = () => {

  }

  const handleInput = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleViewMore = (id: number) => {
    setCurrentSelected(id)
  }

  const sectionsDataApi = [
    { id: 1, sectionName: 'A Section', linkedStaffName: 'Siva Sankula', sectionId: 'mdgl-sec-a', studentsCount: 60, },
    { id: 2, sectionName: 'B Section', linkedStaffName: 'Narra Deva Kumar', sectionId: 'mdgl-sec-b', studentsCount: 58, }
  ]

  const classListDataApi = [
    { id: 1, className: '10th Class', classId: 'mdgl-scl-cls-10', linkedStaffName: 'Siva Sankula', classIcon: '10', linkedSections: [{ sectionId: 'mdgl-sec-a', staffId: 'mdgl-staff-00021' }, { sectionId: 'mdgl-sec-b', staffId: 'mdgl-staff-00019' }] },
    { id: 2, className: '9th Class', classId: 'mdgl-scl-cls-9', linkedStaffName: 'Minoosh Reddy', classIcon: '9', linkedSections: [{ sectionId: 'mdgl-sec-a', staffId: 'mdgl-staff-00044' }, { sectionId: 'mdgl-sec-b', staffId: 'mdgl-staff-00027' }] },
    { id: 3, className: '8th Class', classId: 'mdgl-scl-cls-8', linkedStaffName: 'Sankula Krishna', classIcon: '8', linkedSections: [{ sectionId: 'default', staffId: 'mdgl-staff-0001' }] },
  ]

  const navigateEle = [
    { id: 1, elementName: 'Progress Card', redirectTo: '/progress-card' },
    { id: 2, elementName: 'Attendance', redirectTo: '/attendance-by-student' },
    { id: 3, elementName: 'Students', redirectTo: '/students-list' },
    { id: 4, elementName: 'Home Work', redirectTo: '/home-work' },

  ]

  const handleSectionChange = (secId: string) => {
    setCurrentSelectedSec(secId);
  }

  const handleNavigate = (item: any) => {
    // send the params according to...!
    navigate(item.redirectTo);
  }

  const handleEditClass = (classInfo: any) => {
    const updatedFormValue = {
      className: classInfo.className,
      classStaffName: '',
      linkedSections: [],
      classIconValue: classInfo.classIcon,
    }
    setFormValue(updatedFormValue);
    setIsAddClassModal(true);
  }

  useEffect(() => {
    setCurrentSelectedSec(sectionsDataApi[0].sectionId)
  }, [currentSelected])

  return (
    <div className='school-classes'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className='p-h-16 cls-container-view'>
        <IonButton className='br-ion-12 m-top-12 g_txt_cap' onClick={handleAdd} fill="outline" expand="block">Add Class</IonButton>
        <div className='school-class-list'>
          {classListDataApi.map((item) => (
            <IonCard key={item.id} className={`student_card animation-none custom-class-card ${currentSelected === item.id ? 'custom-class-card-selected' : ''}`}>
              <IonCardContent className="card_content">
                <div className="g_flex g_space_btwn g_align_cntr">
                  <div className="g_flex width-70 g_align_cntr">
                    <div className="profile_item g_flex g_align_cntr g_jstfy_content_cntr font-600 font-24">
                      {item.classIcon}
                    </div>
                    <div className="title_designation">
                      <h2 className="title_name">{item.className}</h2>
                      <p>
                        {currentSelected === item.id ? <>
                          <span>{currentSelectedSec ? `${sectionsDataApi.find(s => s.sectionId === currentSelectedSec)?.sectionName} - ${sectionsDataApi.find(s => s.sectionId === currentSelectedSec)?.studentsCount} Students` : "--"}</span>
                        </> : <>
                          <a onClick={() => { handleViewMore(item.id) }}>View More</a>
                        </>}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="user_id">
                      <span className="user_id_data g_text_ellipses">{item.classId}</span>
                    </div>
                    <div className="g_flex">
                      <a onClick={() => handleEditClass(item)}>Edit</a>
                    </div>
                  </div>
                </div>
                {currentSelected === item.id && (<>
                  <div className='sec-add-show'>
                    <div className='section-show-con'>
                      {sectionsDataApi.map((linkSec, linkIndex) => (<div onClick={() => handleSectionChange(linkSec.sectionId)} className={`section-show-ele ${linkSec.sectionId === currentSelectedSec ? 'selected-bg-w-b' : ''}`} key={linkIndex}><IonText><p>{linkSec.sectionName}</p></IonText></div>))}
                    </div>
                  </div>
                  <div className='sec-add-show'>
                    <div className='nav-ele-show-con'>
                      {navigateEle.map((ele) => (<div onClick={() => handleNavigate(ele)} className='section-show-ele selected-bg-w-b' key={ele.id}><IonText><p>{ele.elementName}</p></IonText></div>))}
                    </div>
                  </div>
                </>)}

              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </div>

      <GCustomisedModal
        title={`Add Class`}
        isOpen={isAddClassModal}
        onClose={handleModelClose}
        onSave={handleSubmit}
      >
        <div>
          <div className='field m-bottom-10'>
            <IonInput value={formValue.className} onIonChange={handleInput} name='className' label="Class Name" labelPlacement="floating" fill="outline" placeholder="Subject Name"></IonInput>
          </div>
          {formValue.linkedSections.map((secItem) => (<div className='m-bottom-10 g_flex'>
            <IonSelect
              className="custome_select two-select-field"
              label="Section Name"
              labelPlacement="floating"
              fill="outline"
              value={secItem.sectionId}
              interface="popover"
            >
              <IonSelectOption value="--">Default Section</IonSelectOption>
              <IonSelectOption value="mdgl-sec-a">A Section</IonSelectOption>
              <IonSelectOption value="mdgl-sec-b">B Section</IonSelectOption>
              <IonSelectOption value="mdgl-sec-c">C Section</IonSelectOption>
            </IonSelect>
            <IonSelect
              className="custome_select two-select-field"
              label="Class Staff Name"
              labelPlacement="floating"
              fill="outline"
              value={secItem.staffId}
              interface="popover"
            >
              <IonSelectOption value="--">Default Section</IonSelectOption>
              <IonSelectOption value="mdgl-staff-00019">Minoosh Reddyy K</IonSelectOption>
              <IonSelectOption value="mdgl-staff-00029">Narra Deva Qmar</IonSelectOption>
              <IonSelectOption value="mdgl-staff-00044">Siva Sankula</IonSelectOption>
            </IonSelect>
            <div className='close-section-icon'>
              <IonIcon icon={closeCircleOutline}></IonIcon>
            </div>
          </div>))}

          <div className='m-bottom-10 g_flex g_space_btwn'>
            <IonLabel>{"Add More Sections"}</IonLabel>
            <IonIcon className='add-sec-circle' icon={addCircleOutline}></IonIcon>
          </div>
          <div className='field m-bottom-10'>
            <IonInput value={formValue.classIconValue} onIonChange={handleInput} name='classIconValue' label="Class Icon Value" labelPlacement="floating" fill="outline" placeholder="Ex. 10"></IonInput>
          </div>
        </div>
      </GCustomisedModal>
    </div>
  )
}

export default SchoolClasses