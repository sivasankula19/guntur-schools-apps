import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonIcon, IonLabel, IonText } from '@ionic/react';
import CustomizedModal from '../../components/GCustomizedModal';
import { addCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';
import GCustomInput from '../../components/GCustomInput';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { sectionListDummy, staffListDummy } from '../../common/utility';

function SchoolClasses() {
  const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<number>(999);
  const [currentSelectedSec, setCurrentSelectedSec] = useState<string>('');
  const formInitialVal = {
    className: '',
    classStaffName: '',
    linkedSections: [{ sectionId: 'a-section', staffId: 'mdgl-staff-00019' }, { sectionId: 'a-section', staffId: 'mdgl-staff-00009' }],
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
    if(formValue){
      var classItem={ id:classListData.length, className:formValue.className, classId: 'mdgl-scl-cls-'+formValue.classIconValue, linkedStaffName: formValue.classStaffName, classIcon: formValue.classIconValue, linkedSections: formValue.linkedSections}
      if(classItem){
        setClassListData([...classListData,classItem]);
        handleModelClose();
      }
      
    }
  }

  const handleInput = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubSections = (e: any, item: any) => {

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
  const [classListData,setClassListData]=useState(classListDataApi);

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

  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));
  const staffDummyData = staffListDummy.map(i => ({ id: i.staffId, label: i.staffName }));

  useEffect(() => {
    setCurrentSelectedSec(sectionsDataApi[0].sectionId)
  }, [currentSelected])

  return (
    <div className='school-classes'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className='p-h-16 cls-container-view'>
        <IonButton className='br-ion-12 m-top-12 g_txt_cap' onClick={handleAdd} fill="outline" expand="block">Add Class</IonButton>
        <div className='school-class-list'>
          {classListData.map((item) => (
            <IonCard key={item.id} className={`student_card animation-none custom-class-card ${currentSelected === item.id ? 'custom-class-card-selected' : ''}`}>
              <IonCardContent className="card_content">
                <div className="g_flex g-space-between g-align-center">
                  <div className="g_flex width-70 g-align-center">
                    <div className="profile_item g_flex g-align-center g-justify-center font-600 font-24">
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

      <CustomizedModal
        title={`Add Class`}
        isOpen={isAddClassModal}
        onClose={handleModelClose}
        onSave={handleSubmit}
      >
        <div>
          <GCustomInput name={'className'} value={formValue['className']} onInput={handleInput} label={'Class Name'} placeholder={'Subject Name'} />
          {formValue.linkedSections.map((secItem, indexSec) => (<div key={indexSec} className='m-bottom-10 g_flex'>
            <GCustomSelectDrop options={sectionDummyData} name='sectionId' value={secItem.sectionId} label="Section Name" handleOnChange={(e) => handleSubSections(e, secItem)} classNames='custom-select m-bottom-10 two-select-field' />
            <GCustomSelectDrop options={staffDummyData} name='staffId' value={secItem.staffId} label="Class Staff Name" handleOnChange={(e) => handleSubSections(e, secItem)} classNames='custom-select m-bottom-10 two-select-field' />
            <div className='close-section-icon'>
              <IonIcon icon={closeCircleOutline}></IonIcon>
            </div>
          </div>))}
          <div className='m-bottom-10 g_flex g-space-between'>
            <IonLabel>{"Add More Sections"}</IonLabel>
            <IonIcon className='add-sec-circle' icon={addCircleOutline}></IonIcon>
          </div>
          <GCustomInput name={'classIconValue'} value={formValue['classIconValue']} onInput={handleInput} label="Class Icon Value" placeholder={'Ex. 10'} />
        </div>
      </CustomizedModal>
    </div>
  )
}

export default SchoolClasses