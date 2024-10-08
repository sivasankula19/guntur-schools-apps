import {
  IonCard,
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonText,
} from '@ionic/react';
import {
  pencil,
  expandOutline,
  calendarOutline,
  arrowBackOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import CustomizedModal from '../components/GCustomizedModal';
import { useNavigate } from 'react-router';
import GImageDocPreview from '../components/GImageDocPreview';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { useSelector } from 'react-redux';
import GCustomInput from '../components/GCustomInput';
import GImagUpload from '../components/GImagUpload';
import GDatePicker from '../components/GDatePicker';

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
  const [parentRout, setParentRoute] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
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
  ])

  useEffect(() => {
    setBreadCrumbsState(prev => [prev[0], { bName: authInfo.user.regNumber === id ? 'My Profile' : `USER - ${id}`, path: '/' }])
  }, [id]);

  useEffect(() => {
    const breadCrumbsPrev = [{ bName: 'Home', path: '/dashboard' }];
    if (location.state && location.state.parentRout) {
      setParentRoute(location.state.parentRout);
      breadCrumbsPrev.push({ bName: location.state.parentName, path: location.state.parentRout });
    }
    if (id) {
      breadCrumbsPrev.push({ bName: authInfo.user.regNumber === id ? 'My Profile' : `USER - ${id}`, path: '/' });
    }
    setBreadCrumbsState([...breadCrumbsPrev]);
  }, [location]);

  const handleInput = (e: any) => {
    setFormValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
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

  const formEditValues = [{ name: 'fullName', readOnly: false, label: 'Full Name', placeholder: 'Enter Full Name' },
  { name: 'mobileNumber', readOnly: false, label: 'Full Name', placeholder: 'Ex. 9876543210' },
  { name: 'emailAddress', readOnly: false, label: 'Full Name', placeholder: 'Ex. user@school.com' },
  { name: 'regNumber', readOnly: true, label: 'Registration Number', placeholder: 'Ex. Y25C000' },]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  const handleBack = () => {
    navigate(parentRout);
  }

  return (
    <>
      <div className='user_page'>
        <GBreadCrumbs data={breadCrumbsState}></GBreadCrumbs>
        {parentRout && (<div className='ph-20-pv-10'>
          <div className='g_flex g_align-center'>
            <IonIcon icon={arrowBackOutline} onClick={handleBack}></IonIcon>
            <IonText><p onClick={handleBack}>Back</p></IonText>
          </div>
        </div>)}

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
          {formEditValues.map((data: any) => (<GCustomInput key={data.name} name={data.name} value={formValue[data.name]} onInput={handleInput} label={data.label} placeholder={data.placeholder} />))}
          {/* date picker */}
          <GDatePicker
            onDateChange={(date) => console.log('Selected Date:', date)}
            label="Pick a Date"
            placeholder="Date Of Birth"
            classNames="m-bottom-10"
            value={'2000-04-13T00:00:00.000Z'}
          />
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
