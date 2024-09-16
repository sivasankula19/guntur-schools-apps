import {
  IonCard,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/react';
import {
  pencil,
  expandOutline,
  calendarOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CustomizedModal from '../components/GCustomizedModal';
import { useNavigate } from 'react-router';
import GImageDocPreview from '../components/GImageDocPreview';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { useSelector } from 'react-redux';
import GCustomInput from '../components/GCustomInput';
import GImagUpload from '../components/GImagUpload';

const userData: any = [
  { key: 'Full Name', value: 'Sivaiah Sankula' },
  { key: 'Mobile Number', value: '7995954105' },
  { key: 'Email Address', value: 'Sivaiah Sankula' },
  { key: 'Register Number', value: 'Y17EC124' },
  { key: 'Class of Study', value: 'class 8-A' },
  { key: 'Date of Birth', value: '06-04-1998' },
  { key: 'Gender', value: 'Male' },
];
const UserByID: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const authInfo = useSelector((state: any) => state.auth);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const formInitialVal = {
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    regNumber: '',
    dob: '',
    uploadProfileImage: '',
  }
  const [formValue, setFormValue] = useState<any>(formInitialVal);

  const [breadCrumbsState, setBreadCrumbsState] = useState([
    { bName: 'Home', path: '/dashboard' },
    { bName: '', path: '/students-list' },
  ])

  useEffect(() => {
    setBreadCrumbsState(prev => [prev[0], { bName: authInfo.user.regNumber === id ? 'My Profile' : `USER - ${id}`, path: '/' }])
  }, [id]);

  const handleInput = (e: any) => {
    setFormValue((prev:any) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleEditProfile = () => {
    setFormValue({
      fullName: 'Siva Sankula',
      mobileNumber: '7995954105',
      emailAddress: 'sivasankula143@gmail.com',
      regNumber: 'Y25GHM00349',
      dob: '13/04/2000',
      uploadProfileImage: '',
    })
    setIsEditOpen(true);
  }

  const formEditValues = [{name:'fullName', readOnly:false,label:'Full Name',placeholder:'Enter Full Name'},
    {name:'mobileNumber', readOnly:false,label:'Full Name',placeholder:'Ex. 9876543210'},
    {name:'emailAddress', readOnly:false,label:'Full Name',placeholder:'Ex. user@school.com'},
    {name:'regNumber', readOnly:true,label:'Registration Number',placeholder:'Ex. Y25C000'},]
    
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  return (
    <>
      <div className='user_page'>
        <GBreadCrumbs data={breadCrumbsState}></GBreadCrumbs>
        <div className="d-flex-jc-center">
          <IonCard className="profile-card">
            <img
              src={
                'https://avatars.githubusercontent.com/u/93701195?s=60&v=4'
              }
              height="80%"
              width="80%"
            ></img>
            <div className="icon_full_expand icon_pencil_user">
              {authInfo.user.regNumber === id && (
                <IonIcon icon={pencil}></IonIcon>
              )}
            </div>
            <div className="icon_full_expand">
              <IonIcon
                onClick={() => setIsOpen(true)}
                icon={expandOutline}
              ></IonIcon>
            </div>
          </IonCard>
        </div>
        <div className="display-data">
          {userData.map((user: any, index: number) => {
            return (
              <div className="display-data-main" key={index}>
                <div className="display-data-key">{user.key}</div>
                <div className="display-data-value">{user.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      {authInfo.user.regNumber === id && (
        <div className="bottom-button">
          <IonButton
            onClick={handleEditProfile}
            size="small"
            className="button-text"
          >
            <IonIcon
              slot="start"
              icon={pencil}
            ></IonIcon>
            Edit Profile
          </IonButton>
        </div>
      )}
      <CustomizedModal
        title="Update Profile"
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
        }}
        onSave={() => { }}
      >
        <div>
          {formEditValues.map((data:any)=>(<GCustomInput name={data.name} value={formValue[data.name]} onChange={handleInput} label={data.label}  placeholder={data.placeholder}/>))}
          {/* date picker */}
          <div className='field m-bottom-10'>
            <IonInput value={formValue.dob} onIonChange={handleInput} name='dob' label="Dob" labelPlacement="floating" fill="outline" placeholder="Date of Birth"></IonInput>
            <IonIcon icon={calendarOutline}></IonIcon>
          </div>
          <GImagUpload onFileChange={handleFileChange} label='Upload Image' classNames='m-bottom-10' />
        </div>
      </CustomizedModal>
      <GImageDocPreview
        src={
          'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106'
        }
        title={authInfo.user.fullName || 'Student Name'}
        onClose={() => {
          setIsOpen(false);
        }}
        onDownload={() => { }}
        isOpen={isOpen}
      ></GImageDocPreview>
    </>);
};

export default UserByID;
