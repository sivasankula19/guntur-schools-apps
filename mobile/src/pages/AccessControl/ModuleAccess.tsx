import React, { useEffect, useRef, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { arrowBackOutline, calendarOutline, caretDownOutline, caretUpOutline, chatboxOutline, checkmarkCircleOutline, chevronBackOutline, chevronForwardOutline, closeCircleOutline, cubeOutline, gridOutline, newspaperOutline, peopleOutline, saveOutline, walletOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';
import GCustomItemSelect from '../../components/GCustomItemSelect';
import { accessModulesDummyData, searchStaffData, searchStudentsData } from '../../common/utility';
import { useDispatch } from 'react-redux';
import { setFailureToast, setWarnToast } from '../../redux/reducers/toastMessageSlice';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomToggle from '../../components/GCustomToggle';

function ModuleAccess() {

  const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [staffListApi, setStaffListApi] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStaffModules, setSelectedStaffModules] = useState<any>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>({
    "itemName": "Narra Dev Qumar",
    "itemId": "GHMSTAFF9",
    "itemDescription": ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parentContainerRef = useRef<any>();
  const studentsDisplayRef = useRef<any>();

  const breadCrumbsValue = [
    { bName: 'Home', path: '/dashboard' },
    { bName: 'Access Control', path: '/access-control' },
    { bName: 'Modules Access', path: '/module-access' }
  ];

  const listAccessModules = [
    { id: 1, moduleName: 'Staff', icon: peopleOutline, redirectTo: '/staff-list' },
    { id: 2, moduleName: 'Students', icon: peopleOutline, redirectTo: '/students-list' },
    { id: 3, moduleName: 'Sections', icon: cubeOutline, redirectTo: '/school-sections' },
    { id: 4, moduleName: 'Classes', icon: gridOutline, redirectTo: '/school-classes' },
    { id: 10, moduleName: 'Messages', icon: chatboxOutline, redirectTo: '/messages' },
    { id: 12, moduleName: 'Calendar', icon: calendarOutline, redirectTo: '/calendar' },
    { id: 13, moduleName: 'Vibe', icon: newspaperOutline, redirectTo: '/school-vibe' },
    { id: 15, moduleName: 'Fees Dues', icon: walletOutline, redirectTo: '/fee-structure' },
  ]

  useEffect(() => {
    setSearchResult(searchStaffData);
    setStaffListApi(accessModulesDummyData);
    dispatch(setFailureToast('You are about to RESTRICTING the access of the Modules.'));
  }, []);

  useEffect(() => {
    if (staffListApi && selectedStudent && isOpen) {
      setSelectedStaffModules(staffListApi.find(s => s.staffId === selectedStudent.itemId)?.data || []);
    }
  }, [selectedStudent, isOpen]);
  const handleSave = () => {
    // save api
  }

  const handleBack = () => {
    navigate('/access-control');
  }

  const handleEditModal = () => {
    setIsOpen(true);
  }

  const handleModalSave = () => { }

  const handleToggleChange = (event: any, moduleItem: any) => {
    const updatedSelected = [...selectedStaffModules].map((item: any) =>
      item.id === moduleItem.id ? { ...item, isAccess: event.detail.checked } : item
  );;
  setSelectedStaffModules(updatedSelected);
  };


  return (
    <div className='module-access g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue} />
      <div className='back-save-icons m-top-10 p-h-16'>
        <div className='g_flex g-align-center'>
          <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
          <IonText onClick={handleBack}><p>Back</p></IonText>
        </div>
        <div className='g_flex g-align-center'>
          <IonText>
            <a onClick={handleEditModal} className='edit-text'>Edit</a>
          </IonText>
          <IonIcon onClick={handleSave} icon={saveOutline}></IonIcon>
        </div>
      </div>
      <div className='p-h-16 list-modules-scroll'>
        <div className="g_flex">
          <div
            ref={parentContainerRef}
            style={{
              width: `25%`,
              borderRight: '1px solid',
            }}
          >
            <div
              style={{ minHeight: '40px' }}
              className="g_txt_center g_flex g-align-center g-justify-center marks_column_header"
            >
              {'Staff Name'}
            </div>
            {staffListApi.map((staffItem: any) => (
              <div
                key={staffItem.staffId}
                style={{ minHeight: '40px', lineHeight: '2rem' }}
                className="g_txt_center g_flex g-align-center g-justify-center p-h-4"
              >
                <div className='g_text_ellipses g_full_width' style={{ lineHeight: '2rem' }}>
                  {staffItem.staffName}
                </div>
              </div>
            ))}
          </div>
          <div className="horizontal_marks_container g_flex g-flex-direction-clm">
            <div className="g_flex">
              {listAccessModules.map((listAcc: any, index: number) => (
                <div
                  key={listAcc.id}
                  style={{
                    minWidth: `${(parentContainerRef?.current?.offsetWidth) - 20}px`,
                    width: `${(parentContainerRef?.current?.offsetWidth) - 20}px`,
                    borderRight:
                      index !== listAccessModules.length - 1 ? '1px solid' : 'none',
                    height: '40px',
                  }}
                  className="g_txt_center g_flex g-align-center g-justify-center marks_column_header p-h-4"
                >
                  <div style={{ lineHeight: '2rem' }} className='g_text_ellipses g_full_width'>{listAcc.moduleName}</div>
                </div>
              ))}
            </div>
            <div className="g_flex">
              {listAccessModules.map((listAccM: any, index: number) => (
                <div
                  key={listAccM.id}
                  style={{
                    minWidth: `${(parentContainerRef?.current?.offsetWidth) - 20}px`,
                    width: `${(parentContainerRef?.current?.offsetWidth) - 20}px`,
                    borderRight:
                      index !== listAccessModules.length - 1 ? '1px solid' : 'none',
                  }}
                >
                  {staffListApi.map((staffItem: any) => (
                    <div
                      key={`${Math.random().toString() + staffItem.subjectId}`}
                      style={{
                        minHeight: '40px', color: staffItem['data']?.find(
                          (i: any) => i.moduleName === listAccM.moduleName
                        )?.isAccess ? '#00AF00' : '#C5000F'
                      }}
                      className="g_txt_center g_flex g-align-center g-justify-center"
                    >
                      <IonIcon className='font-26' icon={staffItem['data']?.find(
                        (i: any) => i.moduleName === listAccM.moduleName
                      )?.isAccess ? checkmarkCircleOutline : closeCircleOutline}></IonIcon>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CustomizedModal
        title={`Module Access`}
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); }}
        onSave={handleModalSave}
        styles={{ maxHeight: '80vh' }}
      >
        <div className='g_full_height o-f-hidden'>
          <IonCard className='custom-att-card'>
            <IonCardContent className='padding-0'>
              <div className='back-save-icons g-align-center'>
                <IonIcon icon={chevronBackOutline}></IonIcon>
                <div className='g_flex p-h-10 username-holder m-width-60' ref={studentsDisplayRef}>
                  <IonLabel class='g_text_ellipses'>
                    {selectedStudent.itemName}
                  </IonLabel>
                  <IonLabel>
                    ({selectedStudent.itemId})
                  </IonLabel>
                  <IonIcon icon={isOpenStudentCard ? caretUpOutline : caretDownOutline}></IonIcon>
                </div>
                <IonIcon icon={chevronForwardOutline}></IonIcon>
              </div>
            </IonCardContent>
          </IonCard>
          <GCustomItemSelect itemData={searchResult.map((i: any) => ({ itemName: i.staffName, itemId: i.staffId, itemDescription: i.designation }))}
            isOpen={isOpenStudentCard}
            setIsOpen={setIsOpenStudentCard}
            selectedItem={selectedStudent}
            setSelectedItem={setSelectedStudent}
            parentItemDetailsRef={studentsDisplayRef}
            classNames='m-top-0 modal-up-card'
          />
          <div className='modules-view'>
            <div className='g_flex g-space-between p-h-16 m-8'>
              <IonText><p>Module Name</p></IonText>
              <IonText><p>Edit</p></IonText>
            </div>
            <IonList>
              {selectedStaffModules.map((listAcc: any) => {
                const currentModule: any = listAccessModules.find(liAcc => liAcc.moduleName === listAcc.moduleName)
                return (<IonItem key={listAcc.id}>
                  <div className='g_flex g-space-between g_full_width'>
                    <div className='g_flex g-align-center'>
                      <IonIcon icon={currentModule.icon}></IonIcon>
                      <IonText><p>{listAcc.moduleName}</p></IonText>
                    </div>
                    <div>

                      <GCustomToggle checked={listAcc.isAccess} onHandleChange={(e: any) => handleToggleChange(e, listAcc)} />                  </div>
                  </div>
                </IonItem>)
              })}
            </IonList>
          </div>
        </div>
      </CustomizedModal>
    </div>
  )
}

export default ModuleAccess