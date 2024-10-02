import {
    IonButton,
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonText,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { classListDummy, genderListDummy, sectionListDummy, staffDummyArr } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import GCustomToggle from '../../components/GCustomToggle';
import GCustomInput from '../../components/GCustomInput';
import { setWarnToast } from '../../redux/reducers/toastMessageSlice';

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
    const [unableProceed, setUnableProceed] = useState(false);
    const currentRole = useSelector((state: any) => state.auth.role);
    const rootAccess = useSelector((state: any) => state.accessControl.rootAccess);
    const accessModules = useSelector((state: any) => state.accessControl.accessModules) || [];

    const [staffData,setStaffData]=useState(staffDummyArr);
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
        navigate(`/user/${id}`, { state: { parentRout: '/staff-list', parentName: 'Staff List' } });
    }

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Staff List', path: '/staff-list' }];

    const navigateEle = [
        { id: 1, elementName: 'Time Table', redirectTo: '/time-table' },
        { id: 2, elementName: 'Subjects', redirectTo: '/subjects' },
        { id: 3, elementName: 'Messages', redirectTo: '/messages' },
        { id: 4, elementName: 'Classes', redirectTo: '/school-classes' },
    ]

    const handleNavigate = (item: any) => {
        // send the params according to...!
        navigate(item.redirectTo);
    }

    const handleViewMore = (id: string, isClose: boolean = false) => {
        setCurrentSelected(isClose ? '' : id);
    }

    const handleEditClass = (item: any) => {
        if (!unableProceed) {
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
        if(formValue){
            var staffItem=
            {
                empName:formValue.staffFirstName+' '+formValue.staffLastName,
                empImage:'https://avatars.githubusercontent.com/u/93701195?s=60&v=4',
                id:'gvt-tcr-'+staffData.length,
                subject:'Telugu',
                designation:formValue.designation,
                classList: ["6 A", "7 A", "7 B" ,"8 C", "10 C"],
                firstName:formValue.staffFirstName,
                lastName:formValue.staffLastName,
                position:formValue.position,
                mobile:Number(formValue.mobileNumber),
                email:formValue.emailAddress,
                gender:formValue.gender,
                designationId:'btech'
            };
        console.log(staffItem)

            if(staffItem){
                setStaffData([...staffData,staffItem]);
                handleModelClose();
            }
        }

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

    const handleRaiseRequest = () => {
        // pass the exact state here!...
        navigate('/raise-request',{state:{}})
    }

    useEffect(() => {
        if (currentRole === 'Teacher') {
            if (!rootAccess) {
                console.log(accessModules);
                const attendanceModuleItem = accessModules.find((att: any) => att?.moduleId === 'staffList');
                if (attendanceModuleItem?.moduleRootAccess) {
                    setUnableProceed(false);
                } else {
                    setUnableProceed(true);
                    dispatch(setWarnToast('Unable to proceed!, Please get permission from Admin'));
                }
            }
        }
    }, []);

    return (
        <div className='g_full_height'>
            <div className="g_flex g-space-between g-align-center bread_toggle_container">
                <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
                <div>
                    <GCustomToggle checked={isFilterEnabled} onHandleChange={handleToggleChange} />
                </div>
            </div>
            <div>
                <IonButton disabled={unableProceed} className='br-ion-12 m-top-12 g_txt_cap add-employee-student' onClick={handleAdd} fill="outline" expand="block">Add Employee</IonButton>
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
                                        <a onClick={() => handleViewMore(item.id, currentSelected === item.id)}>{currentSelected === item.id ? 'View Less' : 'View More'}</a> <a className={`edit-a-student ${unableProceed ? 'disabled-edit' : ''}`} onClick={() => handleEditClass(item)}>Edit</a>
                                    </div>
                                </div>
                            </div>
                            {currentSelected === item.id && (<>
                                <div className='sec-add-show'>
                                    <div className='nav-ele-show-con'>
                                        {navigateEle.map((ele) => (<div onClick={() => handleNavigate(ele)} className='section-show-ele selected-bg-w-b' key={ele.id}><IonText><p>{ele.elementName}</p></IonText></div>))}
                                    </div>
                                </div>
                                <div className='m-top-8'>Class List - {"10 - A, 9 -  B"}</div>
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
                <GCustomInput name={'staffFirstName'} value={formValue['staffFirstName']} onInput={handleInput} label={'Staff First Name'} placeholder={'First Name'} />
                <GCustomInput name={'staffLastName'} value={formValue['staffLastName']} onInput={handleInput} label={'Staff Last Name'} placeholder={'Last Name'} />
                <GCustomSelectDrop options={positionDummyData} name='position' value={formValue.position} label="Position" handleOnChange={handleInput} classNames='custom-select m-bottom-10' />
                <GCustomSelectDrop options={designationDummyData} name='designation' value={formValue.designation} label="Designation" handleOnChange={handleInput} classNames='custom-select m-bottom-10' />
                <GCustomInput name={'mobileNumber'} value={formValue['mobileNumber']} onInput={handleInput} label={'Mobile Number'} placeholder={'Ex. 999999999'} />
                <GCustomInput name={'emailAddress'} value={formValue['emailAddress']} onInput={handleInput} label={'Email Address'} placeholder={'Ex. test@gmail.com'} />
                <GCustomSelectDrop options={genderDummyData} name='gender' value={formValue.gender} label="Gender" handleOnChange={handleInput} classNames='custom-select m-bottom-10' />
                <GCustomInput name={'staffId'} value={formValue['staffId']} onInput={handleInput} label={'Staff Id'} placeholder={'Staff Id'} />
                {!isEdit && (
                    <GCustomInput name={'defaultPassword'} value={formValue['defaultPassword'] || ''} onInput={handleInput} label={'Default Password'} placeholder={'Default User Password'} />
                )}
            </CustomizedModal>
            {unableProceed && (<div className='g_txt_center add-request-btn'>
                <IonButton className='br-ion-8' onClick={handleRaiseRequest} fill="outline" > Raise Request! </IonButton>
            </div>)}
        </div>
    );
};

export default StaffListSA;
