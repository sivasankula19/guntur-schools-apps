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
import { classListDummy, genderListDummy, sectionListDummy, staffDummyArr } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';

interface IStaffForm {
    staffFirstName: string,
    staffLastName: string,
    position: string,
    designation: string,
    mobileNumber: string,
    emailAddress: string,
    gender: string,
    staffId: string,
    defaultPassword?: string,
}

const StaffListSA: React.FC = () => {
    const [isFilterEnabled, setIsFilterEnabled] = useState(true);
    const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [currentSelected, setCurrentSelected] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const formInitialVal: IStaffForm = {
        staffFirstName: '',
        staffLastName: '',
        position: '',
        designation: '',
        mobileNumber: '',
        emailAddress: '',
        gender: '',
        staffId: '',
        defaultPassword: '',
    }
    const [formValue, setFormValue] = useState<IStaffForm>(formInitialVal);
    const [filterValues, setFilterValue] = useState({
        classId: '',
        sectionId: '',
    });
    const staffData = staffDummyArr;
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

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Employee List', path: '/staff-list' }];

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

    const handleViewMore = (id: string, isClose: boolean = false) => {
        setCurrentSelected(isClose ? '': id);
    }

    const handleEditClass = (item: any) => {
        setFormValue({
            staffFirstName: item.firstName,
            staffLastName: item.lastName,
            position: item.position,
            designation: item.designationId,
            mobileNumber: item.mobile,
            emailAddress: item.email,
            gender: item.gender,
            staffId: item.id,
        });
        setIsEdit(true);
        setIsAddClassModal(true);
    }

    const handleAdd = () => {
        setIsAddClassModal(true);
    }

    const handleModelClose = () => {
        if (isEdit) {
            setIsEdit(false);
        }
        setIsAddClassModal(false);
    }

    const handleSubmit = () => {
        // submit actions
        console.log(formValue)
    }

    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));
    const genderDummyData = genderListDummy;
    const designationDummyData = [{ id: 'mba', label: 'MBA' },
    { id: 'btech', label: 'B.Tech' },
    { id: 'mca', label: 'MCA' },
    { id: 'phd-maths', label: 'Maths PHD' },
    ]

    const positionDummyData = [{ id: 'teaching', label: 'Teaching' },
    { id: 'non-teaching', label: 'Non Teaching' },
    { id: 'admin-staff', label: 'Admin Staff' },
    { id: 'technical', label: 'Technical' },
    ]

    const handleChange = (e: any) => {
        setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className='g_full_height'>
            <div className="g_flex g-space-between g-align-center bread_toggle_container">
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
                <IonButton className='br-ion-12 m-top-12 g_txt_cap add-employee-student' onClick={handleAdd} fill="outline" expand="block">Add Employee</IonButton>
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
                {staffData.map((item) => (
                    <IonCard key={item.id} className={`student_card animation-none custom-class-card ${currentSelected === item.id ? 'custom-class-card-selected' : ''}`}>
                        <IonCardContent className="card_content">
                            <div className="g_flex g-space-between g-align-center">
                                <div className="g_flex first_container width-65 g-align-center">
                                    <div className="profile_item">
                                        <img
                                            onClick={() => navigateToUser(item.id)}
                                            className="profile-image"
                                            src={item.empImage}
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="title_designation">
                                        <h2 onClick={() => navigateToUser(item.id)} className="title_name g_text_ellipses">{item.firstName} {item.lastName}</h2>
                                        <p>
                                            <span>{`${item.designation}`}</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="user_id">
                                        <span className="user_id_data g_text_ellipses">ID : {item.id}</span>
                                    </div>
                                    <div className="g_flex">
                                        <a onClick={() => handleViewMore(item.id, currentSelected === item.id)}>{currentSelected === item.id ? 'View Less' : 'View More'}</a> <a className='edit-a-student' onClick={() => handleEditClass(item)}>Edit</a>
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
                title={`Add Employee`}
                isOpen={isAddClassModal}
                onClose={handleModelClose}
                onSave={handleSubmit}
            >
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.staffFirstName} onIonChange={handleInput} name='staffFirstName' label="Staff First Name" labelPlacement="floating" fill="outline" placeholder="First Name"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.staffLastName} onIonChange={handleInput} name='staffLastName' label="Staff Last Name" labelPlacement="floating" fill="outline" placeholder="Last Name"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <GCustomSelectDrop options={positionDummyData} name='position'
                        value={formValue.position} label="Position"
                        handleOnChange={handleInput} classNames='custom-select' />
                </div>
                <div className='field m-bottom-10'>
                    <GCustomSelectDrop options={designationDummyData} name='designation'
                        value={formValue.designation} label="Designation"
                        handleOnChange={handleInput} classNames='custom-select' />
                </div>
                <div className='field m-bottom-10'>
                    <IonInput value={formValue.mobileNumber} onIonChange={handleInput} name='mobileNumber' label="Mobile Number" labelPlacement="floating" fill="outline" placeholder="+91 9876543210"></IonInput>
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
                    <IonInput value={formValue.staffId} onIonChange={handleInput} name='staffId' label="Generated Staff ID" labelPlacement="floating" fill="outline" placeholder="Staff Registration ID"></IonInput>
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

export default StaffListSA;
