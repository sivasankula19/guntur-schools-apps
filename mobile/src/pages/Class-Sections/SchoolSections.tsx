import React, { useEffect, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import GCustomisedModal from '../../components/GCustomisedModal';
import { addCircleOutline } from 'ionicons/icons';

function SchoolSections() {
    const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
    const formInitialVal = {
        className: '',
        classStaffName: '',
        linkedSections: [{ sectionId: 'mdgl-sec-a', staffId: 'mdgl-staff-00019' }, { sectionId: 'mdgl-sec-b', staffId: 'mdgl-staff-00044' }],
        classIconValue: ''
    }
    const [formValue, setFormValue] = useState(formInitialVal);

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Sections', path: '/school-sections' }];

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

    const sectionsListDataApi = [
        { id: 999, sectionName: 'Default', sectionId: 'default-9999', SectionIcon: '--', },
        { id: 1, sectionName: 'A Section', sectionId: 'mdgl-sec-a', SectionIcon: 'A', },
        { id: 2, sectionName: 'B Section', sectionId: 'mdgl-sec-b', SectionIcon: 'B', },
        { id: 3, sectionName: 'C Section', sectionId: 'mdgl-sec-c', SectionIcon: 'C', },
    ]

    const handleEditClass = (classInfo: any) => {
        if (classInfo.sectionId !== 'default-9999') {
            const updatedFormValue = {
                className: classInfo.className,
                classStaffName: '',
                linkedSections: [],
                classIconValue: classInfo.classIcon,
            }
            setFormValue(updatedFormValue);
            setIsAddClassModal(true);
        }
    }

    return (
        <div className='school-classes'>
            <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
            <div className='p-h-16 cls-container-view'>
                <IonButton className='br-ion-12 m-top-12 g_txt_cap' onClick={handleAdd} fill="outline" expand="block">Add Section</IonButton>
                <div className='school-class-list'>
                    {sectionsListDataApi.map((item) => (
                        <IonCard key={item.id} className="student_card animation-none custom-class-card">
                            <IonCardContent className="card_content">
                                <div className="g_flex g_space_btwn g_align_cntr">
                                    <div className="g_flex width-70 g_align_cntr">
                                        <div className="profile_item g_flex g_align_cntr g_jstfy_content_cntr font-600 font-24">
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
                                            <a className={`${item.sectionId === 'default-9999' ? 'disabled-edit' : ''}`} onClick={() => handleEditClass(item)}>Edit</a>
                                        </div>
                                    </div>
                                </div>
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
                    <div className='m-bottom-10 m-left-10 g_flex g_space_btwn'>
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

export default SchoolSections