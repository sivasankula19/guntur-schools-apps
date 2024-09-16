import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonText,
} from '@ionic/react';
import { callOutline, expandOutline, imageOutline, informationCircleOutline, newspaperOutline, schoolOutline, trophyOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router';
import { setPreLoginPublicView } from '../../redux/reducers/schoolSlice';

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
    const payload = {
      token: 'someTokenValue',
      // role: 'SuperAdmin', // SuperAdmin , Teacher, Student
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
    dispatch(authenticateUser(payload))
    navigate('/dashboard')
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
  }, [userNameRef])

  return (
    <div className='home'>
      <div className='home-container'>
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
      </div>
      <div className='location-control'>
        <div className='location'>
          <div><IonText>Google Map</IonText></div>
        </div>
        <IonIcon icon={expandOutline}></IonIcon>
      </div>
    </div>
  );
};

export default Home;
