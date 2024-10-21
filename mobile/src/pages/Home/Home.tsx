import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonText,
} from '@ionic/react';
import { arrowBackOutline, callOutline, expandOutline, imageOutline, informationCircleOutline, newspaperOutline, schoolOutline, trophyOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router';
import { setPreLoginPublicView } from '../../redux/reducers/schoolSlice';
import { setAccessModulesList, setRootAccessValue } from '../../redux/reducers/accessControlSlice';
import { setSuccessToast, setWarnToast } from '../../redux/reducers/toastMessageSlice';

const Home: React.FC = () => {
  const [userName, setUserName] = useState('superAdmin');
  const [password, setPassword] = useState('SuperAdmin@123');
  const userNameRef = useRef<HTMLIonInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('e submitted', userName, password);
    // perform login API call fetch the user auth token
    const responseData = {
      token: 'someTokenValue',
      // role: 'SuperAdmin', // SuperAdmin , Teacher, Student , Parent
      role: userName === 'superAdmin' ? 'SuperAdmin' : userName === 'teacher' ? 'Teacher' : 'Student',
      user: {
        fullName: 'Siva Sankula',
        classOfStudy: '8th Class',
        section: 'A Section',
        mobileNumber: '7995954105',
        emailAddress: 'sivauser@gvtschool.com',
        regNumber: 'Y248A039',
        dob: '01/01/2000',
        gender: 'male'
      }
    }
    dispatch(authenticateUser(responseData));
    if (responseData.role === 'SuperAdmin') {
      // logged in role as SuperAdmin then set access modules list as * by calling root access dispatch to true; 
      dispatch(setRootAccessValue(true));
    } else if (responseData.role === 'Teacher') {
      // logged in roles as Teacher / staff then call or get the access modules from api!... and use in dispatch
      const rolesData = [
        { id: 1, moduleName: 'Attendance', moduleId: 'attendance', moduleRootAccess: false, accessibleClasses: [{ classId: '10_cls', sectionId: 'a_section' }, { classId: '9_cls', sectionId: 'b_section' }, { classId: '9_cls', sectionId: 'a_section' }, { classId: '9_cls', sectionId: 'c_section' },] },
        { id: 2, moduleName: 'Progress Card', moduleId: 'progressCard', moduleRootAccess: false, accessibleClasses: [{ classId: '10_cls', sectionId: 'a_section' }, { classId: '9_cls', sectionId: 'b_section' }, { classId: '9_cls', sectionId: 'a_section' }, { classId: '9_cls', sectionId: 'c_section' },] },
        { id: 3, moduleName: 'Students List', moduleId: 'studentsList', moduleRootAccess: true, accessibleClasses: ["*"] },
        { id: 4, moduleName: 'Staff List', moduleId: 'staffList', moduleRootAccess: false, accessibleClasses: [] },
        { id: 5, moduleName: 'Create Class - Section', moduleId: 'create-cls-sec', moduleRootAccess: true, accessibleClasses: ["*"] },
        { id: 6, moduleName: 'Fees Dues', moduleId: 'feesDues', moduleRootAccess: true, accessibleClasses: ["*"] },
        { id: 7, moduleName: 'Documents', moduleId: 'documents', moduleRootAccess: true, accessibleClasses: ["*"] },
        { id: 8, moduleName: 'Time Table', moduleId: 'timeTable', moduleRootAccess: false, accessibleClasses: [{ classId: '10_cls', sectionId: 'a_section' }, { classId: '9_cls', sectionId: 'b_section' }, { classId: '9_cls', sectionId: 'a_section' }, { classId: '9_cls', sectionId: 'c_section' },] },
        { id: 9, moduleName: 'School Public Info', moduleId: 'schoolPublicInfo', moduleRootAccess: false, accessibleClasses: ["*"] },
        { id: 10, moduleName: 'Assets', moduleId: 'assets', moduleRootAccess: false, accessibleClasses: [] },
      ];
      dispatch(setAccessModulesList(rolesData));
    } else if (responseData.role === 'Student') {
      // logged in role as - student then no need of access modules list 

    }

    dispatch(setSuccessToast('Successfully Signed in!...'));
    navigate('/dashboard');
  };

  const handleUserName = (e: any) => {
    setUserName(e.detail.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.detail.value);
  };

  const handleNavigate = (path: string, moduleName: string) => {
    dispatch(setPreLoginPublicView(moduleName))
    navigate(path)
  }

  const preLoginModules = [{ id: 1, moduleName: 'About', icon: informationCircleOutline, redirectTo: '/about' },
  { id: 2, moduleName: 'Courses', icon: schoolOutline, redirectTo: '/courses' },
  { id: 3, moduleName: 'Contact-Us', icon: callOutline, redirectTo: '/contact-us' },
  { id: 4, moduleName: 'Achievements', icon: trophyOutline, redirectTo: '/achievements' },
  { id: 5, moduleName: 'Gallery', icon: imageOutline, redirectTo: '/gallery' },
  { id: 6, moduleName: 'Ex-Circular', icon: newspaperOutline, redirectTo: '/ex-circular' },]

  useEffect(() => {
    setTimeout(() => {
      if (userNameRef && userNameRef.current) {
        userNameRef.current.setFocus();
      }
    }, 0)
  }, [userNameRef]);

  const handleBack = () => {
    navigate('/select-school');
  }

  return (
    <div className='home'>
      <div className='home-container'>
        <div className='back-save-icons p-h-16'>
          <div className='g_flex g-align-center'>
            <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
            <IonText onClick={handleBack}><p>Back</p></IonText>
          </div>
        </div>
        <IonCard>
          <IonCardContent>
            <div className='logo'>logo</div>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonInput
                  value={userName}
                  ref={userNameRef}
                  onIonInput={handleUserName}
                  className="custom-ion-input_home"
                  label={'User ID'}
                  labelPlacement="floating"
                  fill="outline"
                  placeholder={`Enter User ID`}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  value={password}
                  type="password"
                  onIonInput={handlePassword}
                  className="custom-ion-input_home"
                  label={'Password'}
                  labelPlacement="floating"
                  fill="outline"
                  placeholder={`Enter Password`}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonButton type="submit">Log in</IonButton>
              </IonItem>
              <IonText>
                <a className='font-14'>Forgot password</a>
              </IonText>
            </form>
          </IonCardContent>
        </IonCard>
        <div className='pre-login-btn'>
          {preLoginModules.map((chip, index) => (
            <div key={chip.id} className='chip_btn'>
              <IonButton onClick={() => handleNavigate(chip.redirectTo, chip.moduleName)}>
                <div><IonIcon icon={chip.icon}></IonIcon>
                  <div ><IonText><p className='g_text_ellipses'>{chip.moduleName}</p></IonText></div>
                </div>
              </IonButton>
            </div>
          ))}
        </div>
        <div className='g-maps'>
          <IonText>
            <p>Google Maps!</p>
          </IonText>
        </div>
      </div>
    </div>
  );
};

export default Home;
