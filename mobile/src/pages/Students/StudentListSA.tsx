import {
    IonButton,
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonText,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { classListDummy, genderListDummy, sectionListDummy, studentDummyData } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import GCustomToggle from '../../components/GCustomToggle';
import GCustomInput from '../../components/GCustomInput';
import { setWarnToast } from '../../redux/reducers/toastMessageSlice';

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
    const [unableProceed, setUnableProceed] = useState(false);
    const currentRole = useSelector((state: any) => state.auth.role);
    const rootAccess = useSelector((state: any) => state.accessControl.rootAccess);
    const accessModules = useSelector((state: any) => state.accessControl.accessModules) || [];
    const [studentsDataList,setStudentsDataList]=useState(studentDummyData);

    const stdData = [{
        studentName: 'Sankula Siva', profileImage:
            'https://avatars.githubusercontent.com/u/93701195?s=60&v=4', id: '8A001',
        class: '8th Class',
        section: 'A Section',
    }]
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location?.state?.filterValues) {
            setFilterValue(location.state.filterValues);
        }
        if (location?.state?.search) {
            setSearch(location.state.search);
        }
    }, [location.state]);

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
        navigate(`/user/${id}`, { state: { parentRout: '/students-list', parentName: 'Student List' } });
    }

    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Students List', path: '/students-list' }];

    const navigateEle = [
        { id: 1, elementName: 'Progress Card', redirectTo: '/progress-card' },
        { id: 2, elementName: 'Attendance', redirectTo: '/attendance-by-student' },
        { id: 3, elementName: 'Fees Dues', redirectTo: '/fee-structure' },
        { id: 4, elementName: 'Home Work', redirectTo: '/home-work' },
    ]

    const handleNavigate = (item: any, studentInfo: any) => {
        // send the params according to...!
        navigate(item.redirectTo, { state: { search, filterValues, redirectFrom: '/students-list', redirectFromName: 'Students List', classId: studentInfo.classId, sectionId: studentInfo.sectionId } });
    }

    const handleViewMore = (id: string, isClose: boolean = false) => {
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
        if(formValue){
            var studentItem={
                studentName: formValue.studentFirstName+' '+formValue.studentLastName,
                profileImage:
                  'https://avatars.githubusercontent.com/u/93701195?s=60&v=4',
                id: '8A00'+studentsDataList.length,
                class: formValue.classOfStudy,
                section: formValue.section,
                firstName: formValue.studentFirstName,
                lastName: formValue.studentLastName,
                mobile:Number(formValue.mobileNumber),
                email:formValue.emailAddress,
                parentName:formValue.parentName,
                gender:formValue.gender,
                isFriend: false,
                classId:'10-cls',
                sectionId:'a-section',
              }
              if(studentItem){
                setStudentsDataList([...studentsDataList,studentItem]);
                handleModelClose();
              }
        }
    }


    const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
    const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));
    const genderDummyData = genderListDummy;

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
                const attendanceModuleItem = accessModules.find((att: any) => att?.moduleId === 'studentsList');
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
                <IonButton disabled={unableProceed} className='br-ion-12 m-top-12 g_txt_cap add-employee-student' onClick={handleAdd} fill="outline" expand="block">Add Student</IonButton>
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
                                        <a onClick={() => handleViewMore(item.id, currentSelected === item.id)}>{currentSelected === item.id ? 'View Less' : 'View More'}</a> <a className={`edit-a-student ${unableProceed ? 'disabled-edit' : ''}`} onClick={() => handleEditStudentInfo(item)}>Edit</a>
                                    </div>
                                </div>
                            </div>
                            {currentSelected === item.id && (<>
                                <div className='sec-add-show'>
                                    <div className='nav-ele-show-con'>
                                        {navigateEle.map((ele) => (<div onClick={() => handleNavigate(ele, item)} className='section-show-ele selected-bg-w-b' key={ele.id}><IonText><p>{ele.elementName}</p></IonText></div>))}
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
                <GCustomInput name={'studentFirstName'} value={formValue['studentFirstName']} onInput={handleInput} label={'Student First Name'} placeholder={'First Name'} />
                <GCustomInput name={'studentLastName'} value={formValue['studentLastName']} onInput={handleInput} label={'Student First Name'} placeholder={'Last Name'} />
                <GCustomSelectDrop options={classDummyData} name='classOfStudy' value={formValue.classOfStudy} label="Class" handleOnChange={handleInput} classNames='custom-select m-bottom-10' />
                <GCustomSelectDrop options={classDummyData} name='section' value={formValue.section} label="Section" handleOnChange={handleInput} classNames='custom-select m-bottom-10' />
                <GCustomInput name={'mobileNumber'} value={formValue['mobileNumber']} onInput={handleInput} label={'Mobile Number'} placeholder={'Ex. 999887888'} />
                <GCustomInput name={'emailAddress'} value={formValue['emailAddress']} onInput={handleInput} label={'Email Address'} placeholder={'Ex. user@mail.com'} />
                <GCustomSelectDrop options={genderDummyData} name='gender' value={formValue.gender} label="Gender" handleOnChange={handleInput} classNames='custom-select' />
                <GCustomInput name={'parentName'} value={formValue['parentName']} onInput={handleInput} label={'Parent / Guardian Name'} placeholder={'Parent Name'} />
                <GCustomInput name={'regNumber'} value={formValue['regNumber']} onInput={handleInput} label={'Generated Registration ID'} placeholder={'Reg. Number'} />
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

export default StudentListSA;
