import {
    IonButton,
    IonCard,
    IonCardContent,
    IonInput,
    IonSearchbar,
    IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import { classListDummy, genderListDummy, sectionListDummy, studentDummyData } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import GCustomToggle from '../../components/GCustomToggle';

interface IStudentForm {
    studentFirstName: string,
    studentLastName: string,
    classOfStudy: string,
    section: string,
    mobileNumber: string,
    emailAddress: string,
    gender: string,
    parentName: string,
    defaultPassword?: string,
    regNumber: string,
}


const StudentListSA: React.FC = () => {
    const [isFilterEnabled, setIsFilterEnabled] = useState(true);
    const [search, setSearch] = useState('');
    const [currentSelected, setCurrentSelected] = useState<string>('');
    const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
    const [editDataInfo, setEditDataInfo] = useState<IStudentForm | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const formInitialVal: IStudentForm = {
        studentFirstName: '',
        studentLastName: '',
        classOfStudy: '',
        section: '',
        mobileNumber: '',
        emailAddress: '',
        gender: '',
        parentName: '',
        regNumber: '',
        defaultPassword: '',
    }
    const [formValue, setFormValue] = useState<IStudentForm>(formInitialVal);
    const [filterValues, setFilterValue] = useState({
        classId: '',
        sectionId: '',
    });
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

    const handleSearchInput = (ev: any) => {
        setSearch(ev.target.value);
        console.log(ev?.target.value);
        //  debounce function can be executed!!! here
    };

    const handleInput = (e: any) => {
        setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

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

    const handleViewMore = (id: string, isClose:boolean=false) => {
        setCurrentSelected(isClose ? '' : id);
    }

    const handleEditStudentInfo = (item: any) => {
        setFormValue({
            studentFirstName: item.firstName,
            studentLastName: item.lastName,
            classOfStudy: item.classId,
            section: item.sectionId,
            mobileNumber: item.mobile,
            emailAddress: item.email,
            gender: item.gender,
            parentName: item.parentName,
            regNumber: item.id,
        });
        setIsEdit(true);
        setIsStudentModalOpen(true);
    }

    const handleAdd = () => {
        setIsStudentModalOpen(true);
    }

    const handleModelClose = () => {
        setIsStudentModalOpen(false);
        if (isEdit) {
            setIsEdit(false);
        }
    }

    const handleSubmit = () => {
        // submit actions
        console.log(formValue)
    }


    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));
    const genderDummyData = genderListDummy;

    const handleChange = (e: any) => {
        setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }


    return (
        <div className='g_full_height'>
            <div className="g_flex g-space-between g-align-center bread_toggle_container">
                <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
                <div>
                    <GCustomToggle checked={isFilterEnabled} onHandleChange={handleToggleChange}/>
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
                                onIonInput={handleSearchInput}
                            ></IonSearchbar>
                            <div className="g_flex g-space-between select-container">
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
                        </IonCardContent>
                    </IonCard>
                )}
            </div>
            <div className={`students_cards_container p-h-10 ${!isFilterEnabled ? 'with_filter_off' : ''}`}>
                {studentsDataList.map((item) => (
                    <IonCard key={item.id} className={`student_card animation-none custom-class-card ${currentSelected === item.id ? 'custom-class-card-selected' : ''}`}>
                        <IonCardContent className="card_content">
                            <div className="g_flex g-space-between g-align-center">
                                <div className="g_flex first_container width-65 g-align-center">
                                    <div className="profile_item">
                                        <img
                                            onClick={() => navigateToUser(item.id)}
                                            className="profile-image"
                                            src={item.profileImage}
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="title_designation">
                                        <h2 onClick={() => navigateToUser(item.id)} className="title_name g_text_ellipses">{item.firstName} {item.lastName}</h2>
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
                                        <a onClick={() => handleViewMore(item.id, currentSelected === item.id)}>{currentSelected === item.id ? 'View Less' : 'View More'}</a> <a className='edit-a-student' onClick={() => handleEditStudentInfo(item)}>Edit</a>
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
            <CustomizedModal
                title={`Add Student`}
                isOpen={isStudentModalOpen}
                onClose={handleModelClose}
                onSave={handleSubmit}
            >
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.studentFirstName} onIonChange={handleInput} name='studentFirstName' label="Student First Name" labelPlacement="floating" fill="outline" placeholder="First Name"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.studentLastName} onIonChange={handleInput} name='studentLastName' label="Student Last Name" labelPlacement="floating" fill="outline" placeholder="Last Name"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <GCustomSelectDrop options={classDummyData} name='classOfStudy'
                        value={formValue.classOfStudy} label="Class"
                        handleOnChange={handleInput} classNames='custom-select' />
                </div>
                <div className='field m-bottom-10'>
                    <GCustomSelectDrop options={classDummyData} name='section'
                        value={formValue.section} label="Section"
                        handleOnChange={handleInput} classNames='custom-select' />
                </div>
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.mobileNumber} onIonChange={handleInput} name='mobileNumber' label="Mobile Number" labelPlacement="floating" fill="outline" placeholder="Ex. +91 9876543210"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.emailAddress} onIonChange={handleInput} name='emailAddress' label="Email Address" labelPlacement="floating" fill="outline" placeholder="test@gmail.com"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <GCustomSelectDrop options={genderDummyData} name='gender'
                        value={formValue.gender} label="Gender"
                        handleOnChange={handleInput} classNames='custom-select' />
                </div>
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.parentName} onIonChange={handleInput} name='parentName' label="Parent / Guardian Name" labelPlacement="floating" fill="outline" placeholder="Parent Name"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.regNumber} onIonChange={handleInput} name='regNumber' label="Generated Registration ID" labelPlacement="floating" fill="outline" placeholder="Ex. Y2024C0001"></IonInput>
                </div>
                {!isEdit && (
                    <div className='field m-bottom-10'>
                        <IonInput value={formValue.defaultPassword} onIonChange={handleInput} name='defaultPassword' label="Default Password" labelPlacement="floating" fill="outline" placeholder="Default User Password"></IonInput>
                    </div>
                )}
            </CustomizedModal>
        </div>
    );
};

export default StudentListSA;
