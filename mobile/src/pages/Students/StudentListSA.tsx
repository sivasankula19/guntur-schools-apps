import {
    IonButton,
    IonCard,
    IonCardContent,
    IonInput,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonText,
    IonToggle,
} from '@ionic/react';
import React, { useState } from 'react';
import { studentDummyData } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import GCustomisedModal from '../../components/GCustomisedModal';

const StudentListSA: React.FC = () => {
    const [isFilterEnabled, setIsFilterEnabled] = useState(true);
    const [search, setSearch] = useState('');
    const [currentSelected, setCurrentSelected] = useState<string>('');
    const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
    const formInitialVal = {
        className: '',
    }
    const [formValue, setFormValue] = useState<any>(formInitialVal);
    const studentsDataList = studentDummyData;
    const stdData = [{
        studentName: 'Sankula Siva', profileImage:
            'https://avatars.githubusercontent.com/u/93701195?s=60&v=4', id: '8A001',
        class: '8th Class',
        section: 'A Section',
    }]
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleToggleChange = (event: any) => {
        setIsFilterEnabled(event.detail.checked);
    };

    const handleInput = (ev: any) => {
        setSearch(ev.target.value);
        console.log(ev?.target.value);
        //  debounce function can be executed!!! here
    };

    const navigateToUser = (id: string) => {
        navigate(`/user/${id}`)
    }

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Students List', path: '/students-list' }];

    const navigateEle = [
        { id: 1, elementName: 'Progress Card', redirectTo: '/progress-card' },
        { id: 2, elementName: 'Attendance', redirectTo: '/attendance-by-student' },
        { id: 3, elementName: 'Fees Dues', redirectTo: '/fee-structure' },
        { id: 4, elementName: 'Home Work', redirectTo: '/home-work' },
    ]

    const handleNavigate = (item: any) => {
        // send the params according to...!
        navigate(item.redirectTo);
    }

    const handleViewMore = (id: string) => {
        setCurrentSelected(id)
    }

    const handleEditClass = (info: any) => {
        setIsAddClassModal(true);
    }

    const handleAdd = () => {
        setIsAddClassModal(true);
    }

    const handleModelClose = () => {
        setIsAddClassModal(false);
    }

    const handleSubmit = () => {
        // submit actions
    }

    return (
        <div className='g_full_height'>
            <div className="g_flex g_space_btwn g_align_cntr bread_toggle_container">
                <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
                <div>
                    <IonToggle
                        className="custom-toggle"
                        checked={isFilterEnabled}
                        onIonChange={handleToggleChange}
                    >
                        <span
                            className={`toggle-text ${isFilterEnabled ? 'enabled_filter' : 'disabled_filter'
                                }`}
                        >
                            {isFilterEnabled ? 'On' : 'Off'}
                        </span>
                    </IonToggle>
                </div>
            </div>
            <div>
                <IonButton className='br-ion-12 m-top-12 g_txt_cap add-employee-student' onClick={handleAdd} fill="outline" expand="block">Add Student</IonButton>
            </div>
            <div className={`${isFilterEnabled && 'filter_container'}`}>
                {isFilterEnabled && (
                    <IonCard className="filter-card">
                        <IonCardContent className="filter_card_content">
                            <IonSearchbar
                                showClearButton="focus"
                                value={search}
                                debounce={500}
                                onIonInput={handleInput}
                            ></IonSearchbar>
                            <div className="g_flex g_space_btwn select_conatainer">
                                <div style={{ width: '47%' }}>
                                    <IonSelect
                                        className="custome_select"
                                        multiple={true}
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
                                        multiple={true}
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
                        </IonCardContent>
                    </IonCard>
                )}
            </div>
            <div className={`students_cards_container p-h-16 ${!isFilterEnabled ? 'with_filter_off' : ''}`}>
                {studentsDataList.map((item) => (
                    <IonCard key={item.id} className={`student_card animation-none custom-class-card ${currentSelected === item.id ? 'custom-class-card-selected' : ''}`}>
                        <IonCardContent className="card_content">
                            <div className="g_flex g_space_btwn g_align_cntr">
                                <div className="g_flex first_container width-70 g_align_cntr">
                                    <div className="profile_item">
                                        <img
                                            onClick={() => navigateToUser(item.id)}
                                            className="prifile_image"
                                            src={item.profileImage}
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="title_designation">
                                        <h2 onClick={() => navigateToUser(item.id)} className="title_name g_text_ellipses">{item.studentName}</h2>
                                        <p>
                                            <span>{`${item.class} ${item.section}`}</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="user_id">
                                        <span className="user_id_data g_text_ellipses">ID : {item.id}</span>
                                    </div>
                                    <div className="g_flex">
                                        <a onClick={() => handleViewMore(item.id)}>View More</a> <a className='edit-a-student'>Edit</a>
                                    </div>
                                </div>
                            </div>
                            {currentSelected === item.id && (<>
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
                    <div className='field m-bottom-10'>
                        <IonInput value={formValue.classIconValue} onIonChange={handleInput} name='classIconValue' label="Class Icon Value" labelPlacement="floating" fill="outline" placeholder="Ex. 10"></IonInput>
                    </div>
                </div>
            </GCustomisedModal>
        </div>
    );
};

export default StudentListSA;
