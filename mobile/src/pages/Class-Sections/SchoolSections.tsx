import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonLabel, IonText } from '@ionic/react';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomInput from '../../components/GCustomInput';
import { setWarnToast } from '../../redux/reducers/toastMessageSlice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { arrowBackOutline } from 'ionicons/icons';

function SchoolSections() {
    const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
    const formInitialVal = {
        sectionName: '',
        sectionIconValue: ''
    }
    const [formValue, setFormValue] = useState(formInitialVal);
    const [unableProceed, setUnableProceed] = useState(false);
    const currentRole = useSelector((state: any) => state.auth.role);
    const rootAccess = useSelector((state: any) => state.accessControl.rootAccess);
    const accessModules = useSelector((state: any) => state.accessControl.accessModules) || [];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Sections', path: '/school-sections' }];

    const handleAdd = () => {
        if (!unableProceed) {
            setIsAddClassModal(true);
        }
    }

    const handleModelClose = () => {
        setIsAddClassModal(false);
        setFormValue(formInitialVal);
    }

    const handleSubmit = () => {
        if (formValue.sectionName && formValue.sectionIconValue) {
            var addSectionItem = { id: sectionsListData.length + 1, sectionName: formValue.sectionName, sectionId: 'mdgl-sec-' + formValue.sectionIconValue, SectionIcon: formValue.sectionIconValue };
            if (addSectionItem) {
                setSectionsListData([...sectionsListData, addSectionItem])
                handleModelClose();
            }
        }
    }

    const handleInput = (e: any) => {
        setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const sectionsListDataApi = [
        { id: 999, sectionName: 'Default', sectionId: 'default-9999', SectionIcon: '--', },
        { id: 1, sectionName: 'A Section', sectionId: 'mdgl-sec-a', SectionIcon: 'A', },
        { id: 2, sectionName: 'B Section', sectionId: 'mdgl-sec-b', SectionIcon: 'B', },
        { id: 3, sectionName: 'C Section', sectionId: 'mdgl-sec-c', SectionIcon: 'C', },
    ]

    const [sectionsListData, setSectionsListData] = useState(sectionsListDataApi);

    const handleEditClass = (classInfo: any) => {
        if (classInfo.sectionId !== 'default-9999') {
            const updatedFormValue = {
                sectionName: classInfo.className,
                classStaffName: '',
                linkedSections: [],
                sectionIconValue: classInfo.classIcon,
            }
            setFormValue(updatedFormValue);
            setIsAddClassModal(true);
        }
    }

    useEffect(() => {
        if (currentRole === 'Teacher') {
            if (!rootAccess) {
                const attendanceModuleItem = accessModules.find((att: any) => att?.moduleId === 'create-cls-sec');
                if (attendanceModuleItem?.moduleRootAccess) {
                    setUnableProceed(false);
                } else {
                    setUnableProceed(true);
                    dispatch(setWarnToast('Unable to proceed!, Please get permission from Admin'));
                }
            }
        }
    }, []);

    const handleBack = () => {
        navigate('/school-classes');
    }

    return (
        <div className='school-classes'>
            <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
            <div className='g_flex g-align-center back-icon-scl p-h-16'>
                <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                <IonText onClick={handleBack}><p>Back</p></IonText>
            </div>
            <div className='p-h-16 cls-container-view'>
                <IonButton disabled={unableProceed} className='br-ion-12 m-top-12 g_txt_cap' onClick={handleAdd} fill="outline" expand="block">Add Section</IonButton>
                <div className='school-class-list'>
                    {sectionsListData.map((item) => (
                        <IonCard key={item.id} className="student_card animation-none custom-class-card">
                            <IonCardContent className="card_content">
                                <div className="g_flex g-space-between g-align-center">
                                    <div className="g_flex width-70 g-align-center">
                                        <div className="profile_item g_flex g-align-center g-justify-center font-600 font-24">
                                            {item.SectionIcon}
                                        </div>
                                        <div className="title_designation">
                                            <h2 className="title_name">{item.sectionName}</h2>
                                            <p>
                                                Info
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="user_id">
                                            <span className="user_id_data g_text_ellipses">{item.sectionId}</span>
                                        </div>
                                        <div className="g_flex">
                                            <a className={`${(item.sectionId === 'default-9999' || unableProceed) ? 'disabled-edit' : ''}`} onClick={() => handleEditClass(item)}>Edit</a>
                                        </div>
                                    </div>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </div>
            </div>

            <CustomizedModal
                title={`Add Section`}
                isOpen={isAddClassModal}
                onClose={handleModelClose}
                onSave={handleSubmit}
                styles={{maxHeight:'fit-content'}}
            >
                <div>
                    <GCustomInput name={'sectionName'} value={formValue.sectionName} onInput={handleInput} label={'Section Name'} placeholder={'Section Name'} />

                    <GCustomInput name={'sectionIconValue'} value={formValue.sectionIconValue} onInput={handleInput} label={'Section Icon Value'} placeholder={'Ex. 10'} />
                </div>
            </CustomizedModal>
        </div>
    )
}

export default SchoolSections